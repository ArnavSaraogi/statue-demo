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

// Color mapping for callouts
const CALLOUT_COLORS = {
	info: 'info',
	warning: 'warning',
	error: 'error',
	success: 'success',
	note: 'note',
	tip: 'tip'
};

/**
 * Rehype plugin to transform remark-directive nodes into styled HTML elements
 */
export function rehypeTransformDirectives() {
	return (tree) => {
		visit(tree, (node) => {
			// Transform container directives (:::type)
			if (node.type === 'containerDirective') {
				transformContainerDirective(node);
			}

			// Transform leaf directives (::type)
			if (node.type === 'leafDirective') {
				transformLeafDirective(node);
			}

			// Transform text directives (:type[text])
			if (node.type === 'textDirective') {
				transformTextDirective(node);
			}
		});
	};
}

function transformContainerDirective(node) {
	const type = node.name;
	const attributes = node.attributes || {};

	// Handle callouts
	if (CALLOUT_COLORS[type]) {
		const classes = ['callout', `callout-${CALLOUT_COLORS[type]}`];
		if (attributes.class) {
			classes.push(...attributes.class.split(' '));
		}

		node.data = node.data || {};
		node.data.hName = 'div';
		node.data.hProperties = {
			className: classes,
			'data-callout': type
		};

		// Add icon if not disabled
		const showIcon = attributes.icon !== 'false' && attributes.icon !== false;
		const iconName = attributes.icon || CALLOUT_ICONS[type];

		const newChildren = [];

		if (showIcon) {
			newChildren.push({
				type: 'element',
				tagName: 'span',
				properties: { className: ['callout-icon'], 'data-icon': iconName },
				children: []
			});
		}

		// Create content wrapper
		const contentWrapper = {
			type: 'element',
			tagName: 'div',
			properties: { className: ['callout-content'] },
			children: []
		};

		// Add title if provided
		if (attributes.title) {
			contentWrapper.children.push({
				type: 'element',
				tagName: 'div',
				properties: { className: ['callout-title'] },
				children: [{ type: 'text', value: attributes.title }]
			});
		}

		// Add body
		const bodyDiv = {
			type: 'element',
			tagName: 'div',
			properties: { className: ['callout-body'] },
			children: node.children || []
		};
		contentWrapper.children.push(bodyDiv);

		newChildren.push(contentWrapper);
		node.children = newChildren;
	}

	// Handle colored sections
	if (type === 'colored-section') {
		const color = attributes.color || 'card';
		const border = attributes.border || 'none';
		const gradient = attributes.gradient === 'true' || attributes.gradient === true;

		const classes = [
			'colored-section',
			`colored-section-${color}`,
			border !== 'none' ? `border-${border}` : '',
			gradient ? 'gradient-bg' : ''
		].filter(Boolean);

		if (attributes.class) {
			classes.push(...attributes.class.split(' '));
		}

		node.data = node.data || {};
		node.data.hName = 'div';
		node.data.hProperties = {
			className: classes
		};
	}

	// Handle highlight boxes
	if (type === 'highlight-box') {
		const classes = ['highlight-box'];
		if (attributes.class) {
			classes.push(...attributes.class.split(' '));
		}

		node.data = node.data || {};
		node.data.hName = 'div';
		node.data.hProperties = {
			className: classes,
			'data-variant': attributes.variant || 'default'
		};
	}
}

function transformLeafDirective(node) {
	const type = node.name;
	const attributes = node.attributes || {};

	// Handle dividers
	if (type === 'divider') {
		const classes = ['divider'];
		if (attributes.color) {
			classes.push(`divider-${attributes.color}`);
		}

		node.data = node.data || {};
		node.data.hName = 'hr';
		node.data.hProperties = {
			className: classes
		};
	}

	// Handle spacers
	if (type === 'spacer') {
		node.data = node.data || {};
		node.data.hName = 'div';
		node.data.hProperties = {
			className: ['spacer'],
			style: attributes.height ? `height: ${attributes.height}` : ''
		};
	}
}

function transformTextDirective(node) {
	const type = node.name;
	const attributes = node.attributes || {};

	// Handle highlights
	if (type === 'highlight') {
		node.data = node.data || {};
		node.data.hName = 'mark';
		node.data.hProperties = {
			className: ['text-highlight']
		};
	}

	// Handle badges
	if (type === 'badge') {
		node.data = node.data || {};
		node.data.hName = 'span';
		node.data.hProperties = {
			className: ['badge']
		};
	}

	// Handle colored text
	if (type.startsWith('text-')) {
		const color = type.replace('text-', '');
		node.data = node.data || {};
		node.data.hName = 'span';
		node.data.hProperties = {
			className: [`text-${color}`]
		};
	}

	// Handle underlines
	if (type === 'underline' || type.startsWith('underline-')) {
		const color = type === 'underline' ? 'default' : type.replace('underline-', '');
		const classes = ['underline-text'];
		if (color !== 'default') {
			classes.push(`underline-${color}`);
		}

		node.data = node.data || {};
		node.data.hName = 'span';
		node.data.hProperties = {
			className: classes
		};
	}
}
