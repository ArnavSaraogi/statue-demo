<script>
	export let content = '';
	import { onMount } from 'svelte';

	// Map of icon names to Lucide icon components
	const iconMap = {
		info: 'Info',
		'alert-triangle': 'AlertTriangle',
		'circle-x': 'CircleX',
		'circle-check': 'CircleCheck',
		'file-text': 'FileText',
		lightbulb: 'Lightbulb'
	};

	onMount(async () => {
		// Dynamically import lucide-svelte icons
		const icons = await import('lucide-svelte');

		// Find all icon placeholders and render icons
		document.querySelectorAll('.callout-icon[data-icon]').forEach(async (el) => {
			const iconName = el.getAttribute('data-icon');
			const IconComponent = icons[iconMap[iconName] || 'Info'];

			if (IconComponent) {
				new IconComponent({
					target: el,
					props: { size: 20, strokeWidth: 2 }
				});
			}
		});
	});
</script>

<article class="blog-post-content">
	<div class="prose">
		{@html content}
	</div>
</article>

<style>
	.blog-post-content {
		max-width: 860px;
		margin: 0 auto;
		font-family: var(--font-sans);
	}

	.prose {
		color: color-mix(in srgb, var(--color-foreground) 70%, var(--color-muted) 30%);
		font-size: 17px;
		line-height: 1.75;
	}

	:global {
		.prose {
			/* Paragraphs */
			p {
				margin-top: 20px;
				margin-bottom: 20px;
			}

			/* Headings */
			h1 {
				font-size: 28px;
				font-weight: 600;
				color: var(--color-foreground);
				margin-top: 48px;
				margin-bottom: 16px;
				letter-spacing: -0.01em;
			}

			h2 {
				font-size: 22px;
				font-weight: 600;
				color: var(--color-foreground);
				margin-top: 40px;
				margin-bottom: 12px;
			}

			h3 {
				font-size: 18px;
				font-weight: 600;
				color: var(--color-foreground);
				margin-top: 32px;
				margin-bottom: 8px;
			}

			/* First paragraph after heading */
			h1 + p,
			h2 + p,
			h3 + p {
				margin-top: 0;
			}

			/* Links */
			a {
				color: var(--color-foreground);
				text-decoration: underline;
				text-decoration-color: var(--color-border);
				text-underline-offset: 3px;
				transition: text-decoration-color 0.2s ease;
			}

			a:hover {
				text-decoration-color: var(--color-foreground);
			}

			/* Lists */
			ul {
				list-style-type: disc;
				padding-left: 24px;
				margin-top: 20px;
				margin-bottom: 20px;
			}

			ol {
				list-style-type: decimal;
				padding-left: 24px;
				margin-top: 20px;
				margin-bottom: 20px;
			}

			li {
				margin-top: 8px;
				margin-bottom: 8px;
				color: color-mix(in srgb, var(--color-foreground) 70%, var(--color-muted) 30%);
			}

			li::marker {
				color: var(--color-muted);
			}

			/* Strong & Emphasis */
			strong {
				color: var(--color-foreground);
				font-weight: 600;
			}

			em {
				font-style: italic;
			}

			/* Code */
			code {
				background-color: var(--color-card);
				padding: 2px 6px;
				border-radius: 4px;
				font-size: 15px;
				font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace;
			}

			pre {
				background-color: var(--color-card);
				padding: 20px 24px;
				border-radius: 8px;
				margin-top: 24px;
				margin-bottom: 24px;
				overflow-x: auto;
				border: 1px solid var(--color-border);
			}

			pre code {
				background: none;
				padding: 0;
				font-size: 14px;
				line-height: 1.6;
				color: var(--color-foreground);
			}

			table {
				th {
					text-align: left;
				}
				th,
				td {
					padding: 0.5rem;
				}
				thead {
					border-bottom: 1px solid var(--color-border);
				}
			}

			/* Blockquote */
			blockquote {
				border-left: 3px solid var(--color-border);
				padding-left: 20px;
				margin: 24px 0;
				font-style: italic;
				color: var(--color-muted);
			}

			/* Images */
			img {
				max-width: 100%;
				height: auto;
				border-radius: 8px;
				margin: 32px 0;
			}

			hr {
				border: none;
				height: 1px;
				background: var(--color-border);
			}
		}

		/* ============================================
		   CUSTOM STYLING SYSTEM - CALLOUTS
		   ============================================ */

		/* Callout Styles */
		.prose .callout {
			display: flex;
			gap: 0.75rem;
			padding: 1rem;
			margin: 1.5rem 0;
			border-radius: 0.5rem;
			border-left: 4px solid;
			background: var(--color-card);
		}

		.prose .callout-icon {
			flex-shrink: 0;
			display: flex;
			align-items: flex-start;
			padding-top: 0.125rem;
		}

		.prose .callout-content {
			flex: 1;
		}

		.prose .callout-title {
			font-weight: 600;
			margin-bottom: 0.5rem;
			color: var(--color-foreground);
		}

		.prose .callout-body {
			color: var(--color-foreground);
		}

		.prose .callout-body p:first-child {
			margin-top: 0;
		}

		.prose .callout-body p:last-child {
			margin-bottom: 0;
		}

		/* Info Callout */
		.prose .callout-info {
			border-left-color: #3b82f6;
			background: color-mix(in srgb, #3b82f6 10%, var(--color-card));
		}

		.prose .callout-info .callout-icon {
			color: #3b82f6;
		}

		/* Warning Callout */
		.prose .callout-warning {
			border-left-color: #f59e0b;
			background: color-mix(in srgb, #f59e0b 10%, var(--color-card));
		}

		.prose .callout-warning .callout-icon {
			color: #f59e0b;
		}

		/* Error Callout */
		.prose .callout-error {
			border-left-color: #ef4444;
			background: color-mix(in srgb, #ef4444 10%, var(--color-card));
		}

		.prose .callout-error .callout-icon {
			color: #ef4444;
		}

		/* Success Callout */
		.prose .callout-success {
			border-left-color: #10b981;
			background: color-mix(in srgb, #10b981 10%, var(--color-card));
		}

		.prose .callout-success .callout-icon {
			color: #10b981;
		}

		/* Note Callout */
		.prose .callout-note {
			border-left-color: var(--color-muted);
			background: color-mix(in srgb, var(--color-muted) 10%, var(--color-card));
		}

		.prose .callout-note .callout-icon {
			color: var(--color-muted);
		}

		/* Tip Callout */
		.prose .callout-tip {
			border-left-color: var(--color-primary);
			background: color-mix(in srgb, var(--color-primary) 10%, var(--color-card));
		}

		.prose .callout-tip .callout-icon {
			color: var(--color-primary);
		}

		/* ============================================
		   CUSTOM STYLING SYSTEM - COLORED SECTIONS
		   ============================================ */

		.prose .colored-section {
			padding: 1.5rem;
			margin: 2rem 0;
			border-radius: 0.5rem;
		}

		.prose .colored-section-primary {
			background: color-mix(in srgb, var(--color-primary) 15%, var(--color-card));
		}

		.prose .colored-section-secondary {
			background: color-mix(in srgb, var(--color-secondary) 15%, var(--color-card));
		}

		.prose .colored-section-accent {
			background: color-mix(in srgb, var(--color-accent) 15%, var(--color-card));
		}

		.prose .colored-section-card {
			background: var(--color-card);
			border: 1px solid var(--color-border);
		}

		.prose .colored-section-muted {
			background: color-mix(in srgb, var(--color-muted) 15%, var(--color-card));
		}

		.prose .colored-section.border-left {
			border-left: 4px solid var(--color-primary);
		}

		.prose .colored-section.border-right {
			border-right: 4px solid var(--color-primary);
		}

		.prose .colored-section.border-top {
			border-top: 4px solid var(--color-primary);
		}

		.prose .colored-section.border-bottom {
			border-bottom: 4px solid var(--color-primary);
		}

		.prose .colored-section.border-all {
			border: 2px solid var(--color-primary);
		}

		.prose .colored-section.gradient-bg {
			background: linear-gradient(
				135deg,
				var(--color-hero-from) 0%,
				var(--color-hero-via) 50%,
				var(--color-hero-to) 100%
			);
		}

		/* ============================================
		   CUSTOM STYLING SYSTEM - INLINE TEXT
		   ============================================ */

		.prose .text-highlight {
			background: color-mix(in srgb, var(--color-accent) 30%, transparent);
			padding: 0.125rem 0.375rem;
			border-radius: 0.25rem;
		}

		.prose .badge {
			display: inline-block;
			background: var(--color-primary);
			color: var(--color-background);
			padding: 0.125rem 0.5rem;
			border-radius: 9999px;
			font-size: 0.75rem;
			font-weight: 600;
			text-transform: uppercase;
			letter-spacing: 0.05em;
		}

		.prose .text-primary {
			color: var(--color-primary);
		}

		.prose .text-secondary {
			color: var(--color-secondary);
		}

		.prose .text-accent {
			color: var(--color-accent);
		}

		.prose .underline-text {
			text-decoration: underline;
			text-decoration-thickness: 2px;
			text-underline-offset: 3px;
		}

		.prose .underline-text.underline-primary {
			text-decoration-color: var(--color-primary);
		}

		.prose .underline-text.underline-secondary {
			text-decoration-color: var(--color-secondary);
		}

		.prose .underline-text.underline-accent {
			text-decoration-color: var(--color-accent);
		}

		/* ============================================
		   CUSTOM STYLING SYSTEM - SPECIAL ELEMENTS
		   ============================================ */

		.prose .divider {
			margin: 2rem 0;
			border: none;
			border-top: 2px solid var(--color-border);
		}

		.prose .divider-primary {
			border-top-color: var(--color-primary);
		}

		.prose .divider-secondary {
			border-top-color: var(--color-secondary);
		}

		.prose .divider-accent {
			border-top-color: var(--color-accent);
		}

		.prose .spacer {
			width: 100%;
		}

		.prose .highlight-box {
			padding: 1.5rem;
			margin: 2rem 0;
			border-radius: 0.5rem;
			background: color-mix(in srgb, var(--color-primary) 20%, var(--color-card));
			border: 1px solid var(--color-primary);
		}

		/* ============================================
		   RESPONSIVE ADJUSTMENTS
		   ============================================ */

		@media (max-width: 768px) {
			.prose {
				font-size: 16px;
			}

			.prose h1 {
				font-size: 24px;
			}

			.prose h2 {
				font-size: 20px;
			}

			.prose pre {
				padding: 16px;
			}

			.prose .callout {
				padding: 0.875rem;
				gap: 0.5rem;
			}

			.prose .colored-section {
				padding: 1rem;
			}
		}
	}
</style>
