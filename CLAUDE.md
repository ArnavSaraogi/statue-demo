# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Statue is a static site generator based on SvelteKit, Markdown, Tailwind CSS, and Pagefind search. It's designed as a **template-based system** where users create `.md` files in the `content/` directory, and the site is automatically generated with zero configuration.

**Key Architecture Principles:**
- **Markdown-First**: Content is written in `.md` files and processed server-side
- **Template-Based**: Core logic in `src/lib/`, templates in `templates/` and default in `src/routes/`
- **Static Generation**: All pages are pre-rendered at build time
- **Component Library**: Reusable Svelte components with theme support via CSS variables

## Common Commands

### Development
```bash
npm run dev                    # Start dev server at localhost:3000
npm run build                  # Build static site to build/ directory
npm run preview                # Preview production build
npm i && npm run build && npm run preview  # Full rebuild and preview
```

### Code Quality
```bash
npm run lint                   # Run ESLint and Prettier checks
npm run lint:check             # ESLint only
npm run format                 # Auto-format with Prettier
npm run format:check           # Check formatting without fixing
```

### Testing
```bash
npm test                       # Run all tests (Vitest)
npm run test:watch             # Watch mode for tests
npm run test:local             # Local integration test
npm run docker:test            # Run hermetic Docker tests
./test/test-release.sh         # Full release test (packs and tests installation)
```

### Template Management
**Warning**: `template:load` overwrites `src/routes/`, `content/`, and `site.config.json` in the root. Commit changes first!

```bash
npm run template:list          # List available templates
npm run template:load blog     # Load template into workspace
npm run template:save blog     # Save changes back to template folder
git checkout src/routes content site.config.json  # Restore default template
```

### Build Scripts (Internal)
```bash
npm run generate:exports       # Auto-generate src/lib/index.ts from components
npm run prebuild               # Runs generate:exports + orval
npm run postbuild              # Generate SEO, Pagefind index, RSS feed
```

### Publishing (Maintainers Only)
```bash
npm run release                # Build and publish to npm
npm publish                    # Publish (runs prepublishOnly hook)
```

## Architecture

### Core Structure

```
/
├── src/lib/                   # Core library (shipped in npm package)
│   ├── components/            # Reusable Svelte components
│   ├── cms/                   # Content processing system
│   ├── themes/                # CSS theme files
│   └── index.ts               # Auto-generated component exports
├── src/routes/                # Default template routes
│   ├── [...slug]/             # Catch-all route for markdown pages
│   ├── [directory]/           # Directory listing pages
│   └── +layout.svelte         # Root layout
├── content/                   # Default template content (markdown)
├── templates/                 # Additional templates (blog, portfolio, etc.)
├── scripts/                   # Build and CLI scripts
└── static/                    # Static assets
```

### Content Processing System

**File**: `src/lib/cms/content-processor.js`

The CMS scans the `content/` directory and:
1. Reads all `.md` and `.mdx` files recursively
2. Parses frontmatter (metadata) using `gray-matter`
3. Pre-processes custom styling directives (callouts, colored sections, inline styling)
4. Processes markdown to HTML using `mdsvex` (with GFM and slug support)
5. Replaces template variables like `{{site.name}}` from `site.config.json`
6. Transforms internal `.md` links to proper URLs
7. Caches content in production (refreshes in dev mode)

**Key Functions:**
- `scanContentDirectory()` - Recursively scans content folder
- `getAllContent()` - Returns all content with caching
- `getContentByUrl(url)` - Finds content by URL path
- `getContentByDirectory(dir)` - Gets all content in a directory
- `processTemplateVariables(content)` - Replaces {{variable}} syntax
- `getSidebarTree(dir)` - Builds navigation tree for docs

### Routing System

Statue uses SvelteKit's file-based routing with two main dynamic routes:

1. **`[...slug]/+page.svelte`** - Catch-all route for individual markdown pages
   - Calls `getContentByUrl()` to fetch content
   - Returns sidebar items for docs pages
   - Handles 404s by returning `notFound: true`

2. **`[directory]/+page.svelte`** - Lists all content in a directory
   - Shows content cards/listings
   - Includes subdirectory navigation

All routes use `export const prerender = true` for static generation.

### Component System

Components are in `src/lib/components/` and organized by function:

- **Content Display**: `BlogCard`, `ContentGrid`, `LatestContent`
- **Layouts**: `BlogLayout`, `DocsLayout`, `BlogPostLayout`
- **Navigation**: `NavigationBar`, `DocsSidebar`, `TableOfContents`
- **Interactive**: `Search`, `Playground`, `SwaggerUI`, `SQLite`
- **Animations**: `magicui/` subdirectory with animated components

**Component Exports**: The `src/lib/index.ts` file is **auto-generated** by `npm run generate:exports` - never edit it manually. Just add `.svelte` files to `src/lib/components/` and run the script.

**Styling**: Components use CSS variables from themes (e.g., `var(--color-primary)`) to support theming. Avoid hardcoded colors.

### Theme System

Themes are CSS files in `src/lib/themes/` using the `@theme {}` block pattern. Required CSS variables:

```css
@theme {
  --color-background: #000000;
  --color-foreground: #ffffff;
  --color-primary: #3b82f6;
  --color-secondary: #8b5cf6;
  --color-accent: #f59e0b;
  --color-card: #1a1a1a;
  --color-border: #333333;
  --color-muted: #666666;
  /* ...13 total variables */
}
```

Switch themes by editing `src/lib/index.css` imports.

### Custom Styling System

**Files**: `src/lib/cms/remark-custom-directives.js`, `src/lib/components/BlogPostContent.svelte`

Statue includes a custom styling system that transforms directive syntax into styled HTML:

**Container directives** (:::type ... :::):
- Callouts: `:::info`, `:::warning`, `:::error`, `:::success`, `:::note`, `:::tip`
- Colored sections: `:::colored-section{color="primary"}`
- Supports attributes: `{title="Custom Title" icon=false .custom-class}`

**Text directives** (:type[text]):
- Highlights: `:highlight[text]`
- Badges: `:badge[New]`
- Colored text: `:text-primary[text]`, `:text-secondary[text]`, `:text-accent[text]`
- Underlines: `:underline[text]`, `:underline-primary[text]`

**Leaf directives** (::type):
- Dividers: `::divider`, `::divider{color="primary"}`
- Spacers: `::spacer{height="3rem"}`

**Implementation:**
- Directives are preprocessed BEFORE mdsvex parses markdown
- `transformContainerDirectives()`, `transformTextDirectives()`, `transformLeafDirectives()` convert directive syntax to HTML
- CSS styling in `BlogPostContent.svelte` uses theme CSS variables
- Icons loaded dynamically from `lucide-svelte`
- All styling is theme-aware and responsive

**Documentation:** See `content/docs/custom-styling.md` for full syntax reference and examples.

### Template Variables

Users can use `{{variable.name}}` in markdown and frontmatter. Variables are defined in `site.config.json` and processed by `processTemplateVariables()`.

**Available variables:**
- `{{site.name}}`, `{{site.url}}`, etc.
- `{{contact.email}}`, `{{contact.phone}}`, etc.
- `{{social.github}}`, `{{social.twitter}}`, etc.
- `{{date.year}}`, `{{date.now}}` (dynamic dates)

To add new template variables:
1. Add to `site.config.json`
2. Register in `content-processor.js` variables object
3. Document in `content/docs/site-config.md`

### Build Process

1. **Pre-build** (`prebuild` script):
   - Runs `generate:exports` to create `src/lib/index.ts`
   - Runs `run-orval.js` for API generation (if configured)

2. **Build** (`vite build`):
   - SvelteKit static adapter generates HTML pages
   - Pre-renders all routes by crawling from `*` entries
   - Outputs to `build/` directory

3. **Post-build** (`postbuild` script):
   - `generate-seo-files.js` - Creates sitemap and robots.txt
   - `run-pagefind.js` - Builds search index
   - `generate-rss-feed.js` - Creates RSS feed

### CLI System

**Command**: `npx statue <command>`

Main commands:
- `statue init [--template <name>]` - Initialize Statue in a SvelteKit project
- Copies files from `templates/<name>/` or default template
- Runs template-specific post-setup scripts

Implementation: `scripts/statue-cli.js` (uses `commander` package)

## Development Workflow

### Working on Core Components

1. Add/edit components in `src/lib/components/`
2. Run `npm run dev` (auto-runs `generate:exports`)
3. Test component in `src/routes/` pages
4. Components are automatically exported in `src/lib/index.ts`

### Working on Templates

1. Commit current work (template:load overwrites files!)
2. `npm run template:load <template-name>`
3. Edit `src/routes/`, `content/`, `site.config.json`
4. Test with `npm run dev`
5. `npm run template:save <template-name>` to save changes
6. `git checkout src/routes content site.config.json` to restore default

### Working on Content Processing

The CMS is in `src/lib/cms/content-processor.js` and runs **server-side only**. It uses Node.js APIs and will fail if imported client-side.

When editing:
- Content is cached in production but refreshed in dev mode
- Check console logs in `[...slug]/+page.server.js` for debug info
- Test with various markdown syntax, nested directories, edge cases

### Testing Changes

**Before submitting PRs:**

1. Run linting: `npm run lint` and fix issues
2. Test dev mode: `npm run dev`
3. Test production build: `npm run build && npm run preview`
4. Run unit tests: `npm test`
5. Test package installation: `./test/test-release.sh`

## Important Constraints

### Component Development
- Use CSS variables (`var(--color-*)`) for colors, not hardcoded values
- Keep components simple and reusable
- Accept props for customization
- Components are automatically exported (don't edit `index.ts`)

### Content Processing
- Never import `content-processor.js` on client side
- Handle missing files gracefully (warn, don't error)
- Cache in production, refresh in dev
- All URLs must be normalized (no trailing slashes)

### Routing
- All routes must have `export const prerender = true`
- Routes are static - no server-side rendering at request time
- Use `$lib` imports in templates, not `statue-ssg`

### Git Operations
- **Never commit version bumps** (maintainers only)
- Don't commit `src/lib/index.ts` edits (auto-generated)
- Template changes go in `templates/` not root
- Don't commit `build/`, `.svelte-kit/`, `node_modules/`

### File Structure
- Components: `PascalCase.svelte`
- Utilities: `kebab-case.js`
- Themes: `kebab-case.css`
- Routes: SvelteKit conventions (`+page.svelte`, etc.)

## Special Considerations

### MDX Support
Files with `.mdx` extension are flagged with `isMdx: true` and rendered as Svelte components, not HTML. This enables interactive components within markdown.

### Path Aliases
- `$lib` → `src/lib`
- `$content` → `content`
- `$components` → `src/lib/components`
- `$cms` → `src/lib/cms`

### Development vs Production
- Dev mode: Content cache disabled, hot reload enabled
- Production: Content cached, all pages pre-rendered
- Use `process.env.NODE_ENV` or `import.meta.env.DEV` to detect mode

### Package Distribution
Statue is published as an npm package. The `files` field in `package.json` controls what's published:
- Includes: `src/`, `content/`, `templates/`, `scripts/`, `resources/`, configs
- Excludes: `node_modules/`, `build/`, `.svelte-kit/`, test files

## Getting Help

- **Discord**: https://discord.gg/accretional
- **Issues**: https://github.com/accretional/statue/issues
- **Docs**: See `content/docs/` or `README.md`
- **Contributing**: See `CONTRIBUTING.md`, `DEVELOPMENT.md`
