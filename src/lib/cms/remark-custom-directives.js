import { visit } from 'unist-util-visit';

// Icon mapping for callout types
const CALLOUT_ICONS = {
	info: 'info',
	warning: 'alert-triangle',
	error: 'circle-x',
	success: 'circle-check',
	note: 'file-text',
	tip: 'lightbulb'
};

/**
 * Extract code blocks and inline code from markdown to protect them during transformation
 * @param {string} markdown - The markdown content
 * @returns {Object} - { markdown: string with placeholders, codeBlocks: Map }
 */
function extractCodeBlocks(markdown) {
	const codeBlocks = new Map();
	let counter = 0;

	// Extract fenced code blocks (```...```)
	// This regex matches code blocks with optional language specifier
	markdown = markdown.replace(/```[\s\S]*?```/g, (match) => {
		const placeholder = `___CODE_FENCE_${counter}___`;
		codeBlocks.set(placeholder, match);
		counter++;
		return placeholder;
	});

	// Extract inline code (`...`)
	// Be careful not to match single backticks that aren't paired
	markdown = markdown.replace(/`([^`\n]+)`/g, (match) => {
		const placeholder = `___INLINE_CODE_${counter}___`;
		codeBlocks.set(placeholder, match);
		counter++;
		return placeholder;
	});

	return { markdown, codeBlocks };
}

/**
 * Restore code blocks from placeholders
 * @param {string} markdown - Markdown with placeholders
 * @param {Map} codeBlocks - Map of placeholders to original code
 * @returns {string} - Markdown with code blocks restored
 */
function restoreCodeBlocks(markdown, codeBlocks) {
	for (const [placeholder, code] of codeBlocks.entries()) {
		markdown = markdown.replace(placeholder, code);
	}
	return markdown;
}

/**
 * Custom remark plugin to transform directive-like syntax in markdown
 * This is a "pre-parser" plugin that transforms the raw markdown string
 * before it gets parsed into an AST.
 */
export function remarkCustomDirectives() {
	return function transformer(tree, file) {
		// Get the original markdown content
		let markdown = file.value || file.toString();

		// Only process if we have markdown content
		if (!markdown || typeof markdown !== 'string') {
			return;
		}

		// Transform container directives (:::type)
		markdown = transformContainerDirectives(markdown);

		// Transform text directives (:type[text])
		markdown = transformTextDirectives(markdown);

		// Transform leaf directives (::type)
		markdown = transformLeafDirectives(markdown);

		// Update the file content
		file.value = markdown;
	};
}

/**
 * Transform container directives like :::info content :::
 */
export function transformContainerDirectives(markdown) {
	// Extract code blocks to protect them
	const { markdown: markdownWithPlaceholders, codeBlocks } = extractCodeBlocks(markdown);

	// Match :::type{attributes} ... :::
	// Note: type can include hyphens (e.g., colored-section)
	const containerRegex = /^:::([\w-]+)(\{[^}]*\})?\s*\n([\s\S]*?)\n:::\s*$/gm;

	const transformed = markdownWithPlaceholders.replace(
		containerRegex,
		(match, type, attributes, content) => {
			const attrs = parseAttributes(attributes || '');

			// Handle callouts
			if (['info', 'warning', 'error', 'success', 'note', 'tip'].includes(type)) {
				return renderCallout(type, content, attrs);
			}

			// Handle colored sections
			if (type === 'colored-section') {
				return renderColoredSection(content, attrs);
			}

			// Handle highlight boxes
			if (type === 'highlight-box') {
				return renderHighlightBox(content, attrs);
			}

			// Unknown directive - return as-is
			return match;
		}
	);

	// Restore code blocks
	return restoreCodeBlocks(transformed, codeBlocks);
}

/**
 * Transform text directives like :highlight[text]
 */
export function transformTextDirectives(markdown) {
	// Extract code blocks to protect them
	const { markdown: markdownWithPlaceholders, codeBlocks } = extractCodeBlocks(markdown);

	// Match :type[text]
	const textRegex = /:(\w+(?:-\w+)*)\[([^\]]+)\]/g;

	const transformed = markdownWithPlaceholders.replace(textRegex, (match, type, text) => {
		// Handle highlights
		if (type === 'highlight') {
			return `<mark class="text-highlight">${text}</mark>`;
		}

		// Handle badges
		if (type === 'badge') {
			return `<span class="badge">${text}</span>`;
		}

		// Handle colored text
		if (type.startsWith('text-')) {
			const color = type.replace('text-', '');
			return `<span class="${type}">${text}</span>`;
		}

		// Handle underlines
		if (type === 'underline' || type.startsWith('underline-')) {
			const classes = ['underline-text'];
			if (type !== 'underline') {
				classes.push(type.replace('underline-', 'underline-'));
			}
			return `<span class="${classes.join(' ')}">${text}</span>`;
		}

		// Unknown directive - return as-is
		return match;
	});

	// Restore code blocks
	return restoreCodeBlocks(transformed, codeBlocks);
}

/**
 * Transform leaf directives like ::divider
 */
export function transformLeafDirectives(markdown) {
	// Extract code blocks to protect them
	const { markdown: markdownWithPlaceholders, codeBlocks } = extractCodeBlocks(markdown);

	// Match ::type{attributes}
	// Note: type can include hyphens
	const leafRegex = /^::([\w-]+)(\{[^}]*\})?\s*$/gm;

	const transformed = markdownWithPlaceholders.replace(leafRegex, (match, type, attributes) => {
		const attrs = parseAttributes(attributes || '');

		// Handle dividers
		if (type === 'divider') {
			const classes = ['divider'];
			if (attrs.color) {
				classes.push(`divider-${attrs.color}`);
			}
			return `<hr class="${classes.join(' ')}" />`;
		}

		// Handle spacers
		if (type === 'spacer') {
			const style = attrs.height ? `height: ${attrs.height}` : '';
			return `<div class="spacer" style="${style}"></div>`;
		}

		// Unknown directive - return as-is
		return match;
	});

	// Restore code blocks
	return restoreCodeBlocks(transformed, codeBlocks);
}

/**
 * Parse attributes from {key="value" key2} format
 */
function parseAttributes(attrString) {
	const attrs = {};

	if (!attrString) return attrs;

	// Remove curly braces
	attrString = attrString.slice(1, -1).trim();

	// Parse key="value" pairs
	const keyValueRegex = /(\w+)=["']([^"']*)["']/g;
	let match;
	while ((match = keyValueRegex.exec(attrString)) !== null) {
		attrs[match[1]] = match[2];
	}

	// Parse boolean flags like {icon=false}
	const boolRegex = /(\w+)=(true|false)/g;
	while ((match = boolRegex.exec(attrString)) !== null) {
		attrs[match[1]] = match[2] === 'true';
	}

	// Parse title attribute
	if (attrString.includes('title=')) {
		const titleMatch = attrString.match(/title=["']([^"']*)["']/);
		if (titleMatch) {
			attrs.title = titleMatch[1];
		}
	}

	// Parse class shortcuts like {.custom-class}
	const classMatch = attrString.match(/\.(\w+(?:-\w+)*)/);
	if (classMatch) {
		attrs.class = classMatch[1];
	}

	return attrs;
}

/**
 * Render a callout box
 */
function renderCallout(type, content, attrs) {
	const classes = ['callout', `callout-${type}`];
	if (attrs.class) {
		classes.push(attrs.class);
	}

	const showIcon = attrs.icon !== false && attrs.icon !== 'false';
	const iconName = attrs.icon || CALLOUT_ICONS[type];

	let html = `<div class="${classes.join(' ')}" data-callout="${type}">`;

	// Add icon
	if (showIcon) {
		html += `<span class="callout-icon" data-icon="${iconName}"></span>`;
	}

	// Add content wrapper
	html += '<div class="callout-content">';

	// Add title if provided
	if (attrs.title) {
		html += `<div class="callout-title">${attrs.title}</div>`;
	}

	// Add body
	html += `<div class="callout-body">\n\n${content.trim()}\n\n</div>`;
	html += '</div>';
	html += '</div>';

	return html;
}

/**
 * Render a colored section
 */
function renderColoredSection(content, attrs) {
	const color = attrs.color || 'card';
	const border = attrs.border || 'none';
	const gradient = attrs.gradient === 'true' || attrs.gradient === true;

	const classes = [
		'colored-section',
		`colored-section-${color}`,
		border !== 'none' ? `border-${border}` : '',
		gradient ? 'gradient-bg' : '',
		attrs.class || ''
	].filter(Boolean);

	return `<div class="${classes.join(' ')}">\n\n${content.trim()}\n\n</div>`;
}

/**
 * Render a highlight box
 */
function renderHighlightBox(content, attrs) {
	const classes = ['highlight-box', attrs.class || ''].filter(Boolean);
	const variant = attrs.variant || 'default';

	return `<div class="${classes.join(' ')}" data-variant="${variant}">\n\n${content.trim()}\n\n</div>`;
}
