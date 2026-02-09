---
title: Custom Styling System
description: Learn how to use custom styling directives in your Statue blog posts and content
---

# Custom Styling System

Statue includes a powerful custom styling system that allows you to enhance your markdown content with callouts, colored sections, and inline text styling - all without writing HTML or CSS.

## Overview

The custom styling system uses a simple directive syntax that works in regular `.md` files:

- **Container directives** (`:::type ... :::`) - For callouts and sections
- **Leaf directives** (`::type`) - For dividers and spacers
- **Text directives** (`:type[text]`) - For inline styling

All styling automatically adapts to your chosen theme and respects CSS variables.

---

## Callouts

Callouts are colored boxes that highlight important information. Statue includes six built-in callout types.

### Basic Syntax

```markdown
:::info
This is an informational callout
:::
```

### Callout Types

#### Info Callout

:::info
Use info callouts for helpful information and tips
:::

```markdown
:::info
Use info callouts for helpful information and tips
:::
```

#### Warning Callout

:::warning
Use warning callouts to alert readers about important considerations
:::

```markdown
:::warning
Use warning callouts to alert readers about important considerations
:::
```

#### Error Callout

:::error
Use error callouts to highlight critical issues or things to avoid
:::

```markdown
:::error
Use error callouts to highlight critical issues or things to avoid
:::
```

#### Success Callout

:::success
Use success callouts to confirm positive outcomes
:::

```markdown
:::success
Use success callouts to confirm positive outcomes
:::
```

#### Note Callout

:::note
Use note callouts for general notes and additional information
:::

```markdown
:::note
Use note callouts for general notes and additional information
:::
```

#### Tip Callout

:::tip
Use tip callouts to share helpful tips and best practices
:::

```markdown
:::tip
Use tip callouts to share helpful tips and best practices
:::
```

### Custom Titles

Add a custom title to any callout using the `title` attribute:

:::warning{title="Important Note"}
This callout has a custom title
:::

```markdown
:::warning{title="Important Note"}
This callout has a custom title
:::
```

### Disable Icons

Remove the icon from a callout by setting `icon=false`:

:::info{icon=false}
This callout has no icon
:::

```markdown
:::info{icon=false}
This callout has no icon
:::
```

### Custom Icons

Specify a different Lucide icon name:

:::tip{icon="lightbulb"}
This uses a custom icon
:::

```markdown
:::tip{icon="sparkles"}
This uses a custom icon
:::
```

Available icons: `info`, `alert-triangle`, `circle-x`, `circle-check`, `file-text`, `lightbulb`, and any Lucide icon name.

### Custom CSS Classes

Add custom CSS classes for additional styling:

:::success{.my-custom-class}
This callout has an additional CSS class
:::

```markdown
:::success{.my-custom-class}
This callout has an additional CSS class
:::
```

---

## Colored Sections

Colored sections allow you to highlight content blocks with theme colors and borders.

### Basic Syntax

```markdown
:::colored-section{color="primary"}
Content with primary theme color background
:::
```

### Available Colors

- `primary` - Primary theme color
- `secondary` - Secondary theme color
- `accent` - Accent theme color
- `card` - Card background color
- `muted` - Muted color

### Examples

:::colored-section{color="primary"}
This section uses the primary theme color
:::

```markdown
:::colored-section{color="primary"}
This section uses the primary theme color
:::
```

:::colored-section{color="secondary"}
This section uses the secondary theme color
:::

```markdown
:::colored-section{color="secondary"}
This section uses the secondary theme color
:::
```

### Border Accents

Add border accents to colored sections:

:::colored-section{color="card" border="left"}
This section has a left border accent
:::

```markdown
:::colored-section{color="card" border="left"}
This section has a left border accent
:::
```

Available border positions:

- `left` - Left border accent
- `right` - Right border accent
- `top` - Top border accent
- `bottom` - Bottom border accent
- `all` - Border on all sides

### Gradient Backgrounds

Create gradient backgrounds using theme colors:

:::colored-section{color="primary" gradient=true}
This section has a beautiful gradient background
:::

```markdown
:::colored-section{color="primary" gradient=true}
This section has a beautiful gradient background
:::
```

---

## Inline Text Styling

Enhance specific words or phrases with inline styling directives.

### Highlighted Text

Use :highlight[highlighted text] to make it stand out.

```markdown
Use :highlight[highlighted text] to make it stand out.
```

### Badges

Add :badge[New] badges to mark features or labels.

```markdown
Add :badge[New] badges to mark features or labels.
```

### Colored Text

Use theme colors for emphasis:

- :text-primary[Primary colored text]
- :text-secondary[Secondary colored text]
- :text-accent[Accent colored text]

```markdown
- :text-primary[Primary colored text]
- :text-secondary[Secondary colored text]
- :text-accent[Accent colored text]
```

### Underlined Text

Add :underline[simple underlines] or :underline-primary[colored underlines].

```markdown
Add :underline[simple underlines] or :underline-primary[colored underlines].
```

Available underline colors:

- `:underline-primary[text]`
- `:underline-secondary[text]`
- `:underline-accent[text]`

---

## Special Elements

### Dividers

Add horizontal dividers to separate content:

Content above

::divider

Content below

```markdown
Content above

::divider

Content below
```

#### Colored Dividers

Use theme colors for dividers:

::divider{color="primary"}

```markdown
::divider{color="primary"}
```

Available colors: `primary`, `secondary`, `accent`

### Spacers

Add vertical spacing between elements:

Content above

::spacer{height="3rem"}

Content below

```markdown
Content above

::spacer{height="3rem"}

Content below
```

---

## Combining Features

You can combine multiple styling features to create rich content:

:::tip{title="Pro Tip"}
Use :highlight[highlighted text] and :badge[Important] badges even inside callouts!

You can also use :text-primary[colored text] for extra emphasis.

::divider{color="accent"}

Even dividers work inside callouts!
:::

```markdown
:::tip{title="Pro Tip"}
Use :highlight[highlighted text] and :badge[Important] badges inside callouts!

::divider{color="accent"}

Even dividers work inside callouts!
:::
```

---

## Theme Integration

All custom styling uses CSS variables from your theme:

- `--color-primary` - Primary color
- `--color-secondary` - Secondary color
- `--color-accent` - Accent color
- `--color-card` - Card background
- `--color-muted` - Muted color
- `--color-foreground` - Foreground/text color
- `--color-border` - Border color

This ensures that custom styling:

- ✅ Works across all 11+ built-in themes
- ✅ Adapts to light/dark mode (if implemented)
- ✅ Maintains consistent visual hierarchy
- ✅ Respects your brand colors

---

## Accessibility

The custom styling system is built with accessibility in mind:

- **Semantic HTML** - Uses appropriate HTML elements (`<div>`, `<mark>`, `<span>`)
- **ARIA Roles** - Callouts include data attributes for screen readers
- **Color Contrast** - All colors use `color-mix()` for proper contrast
- **Keyboard Navigation** - All elements are navigable via keyboard

---

## Best Practices

:::tip{title="Styling Guidelines"}

1. **Use callouts sparingly** - Too many callouts reduce their impact
2. **Stick to theme colors** - Maintains visual consistency
3. **Keep accessibility in mind** - Ensure good color contrast
4. **Test across themes** - Verify styling works with different themes
5. **Use semantic types** - Choose the callout type that matches the content
   :::

### When to Use Each Callout Type

- **Info** - Helpful information, explanations, context
- **Warning** - Important considerations, cautions, gotchas
- **Error** - Critical issues, mistakes to avoid, breaking changes
- **Success** - Confirmations, achievements, positive outcomes
- **Note** - General notes, side information, references
- **Tip** - Best practices, shortcuts, recommendations

---

## Technical Details

The custom styling system is implemented as a markdown preprocessor that transforms directive syntax into HTML before mdsvex parses the markdown. This approach:

- Works in regular `.md` files (no `.mdx` required)
- Maintains compatibility with existing markdown
- Generates static HTML (no JavaScript required for rendering)
- Supports all markdown features inside directives

Icons are rendered using [Lucide Icons](https://lucide.dev/) and loaded dynamically on the client side.

---

## Troubleshooting

### Directives Not Rendering

Ensure there are blank lines before and after container directives:

```markdown
<!-- ✅ Correct -->

Some text

:::info
Callout content
:::

More text

<!-- ❌ Incorrect -->

Some text
:::info
Callout content
:::
More text
```

### Attributes Not Working

Ensure attribute values with spaces are quoted:

```markdown
<!-- ✅ Correct -->

:::warning{title="Important Note"}

<!-- ❌ Incorrect -->

:::warning{title=Important Note}
```

### Icons Not Showing

Icons are loaded dynamically. If icons don't appear:

1. Check browser console for errors
2. Verify `lucide-svelte` is installed
3. Ensure JavaScript is enabled

---

## Examples

For a comprehensive example showcasing all custom styling features, see the [test styling page](/blog/test-custom-styling).

---

**Need more help?** Join our [Discord community](https://discord.gg/accretional) or [open an issue](https://github.com/accretional/statue/issues).
