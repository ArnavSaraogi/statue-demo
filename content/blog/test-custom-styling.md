---
title: Testing Custom Styling System
description: Comprehensive test of all custom styling features in Statue
date: 2025-01-15
author: Statue Team
---

# Custom Styling System Test

This page demonstrates all the custom styling features available in Statue blog posts.

## Callout Types

### Info Callout

:::info
This is an informational callout with a default info icon. It uses a blue color scheme and is perfect for sharing helpful information with your readers.
:::

### Warning Callout

:::warning
This is a warning callout with a default warning icon. Use this to alert readers about important considerations or potential issues.
:::

### Error Callout

:::error
This is an error callout with a default error icon. Use this to highlight critical issues or things to avoid.
:::

### Success Callout

:::success
This is a success callout with a default success icon. Perfect for confirming successful actions or positive outcomes.
:::

### Note Callout

:::note
This is a note callout with a neutral color scheme. Use this for general notes and additional information.
:::

### Tip Callout

:::tip
This is a tip callout using the primary theme color. Share helpful tips and best practices with your readers.
:::

## Callout with Custom Attributes

### Custom Title

:::warning{title="Important Note"}
This warning callout has a custom title specified using the `title` attribute.
:::

### Callout Without Icon

:::info{icon=false}
This info callout has the icon disabled. Sometimes you want a clean look without the visual icon.
:::

### Custom CSS Class

:::success{.my-custom-class}
This success callout has an additional custom CSS class for extra styling possibilities.
:::

## Colored Sections

### Primary Color Section

:::colored-section{color="primary"}
This section uses the primary theme color as its background. It's great for highlighting important content that aligns with your brand.
:::

### Secondary Color Section

:::colored-section{color="secondary"}
This section uses the secondary theme color. Perfect for creating visual hierarchy and variety.
:::

### Accent Color Section

:::colored-section{color="accent"}
This section uses the accent theme color. Use this to draw attention to special content.
:::

### Section with Left Border

:::colored-section{color="card" border="left"}
This section has a card background with a prominent left border in the primary color.
:::

### Section with All Borders

:::colored-section{color="primary" border="all"}
This section has borders on all sides, creating a strong visual frame around the content.
:::

### Gradient Background Section

:::colored-section{color="primary" gradient=true}
This section uses a gradient background based on your theme's hero gradient colors. It creates a beautiful, modern look.
:::

## Inline Text Styling

Here's an example of :highlight[highlighted text] that stands out from regular content.

Check out this :badge[New] badge - perfect for marking new features or important labels.

You can also use :text-primary[primary colored text], :text-secondary[secondary colored text], or :text-accent[accent colored text] to emphasize specific words.

For subtle emphasis, try :underline[simple underlines] or :underline-primary[colored underlines] using theme colors.

## Special Elements

### Divider

Here's content before the divider.

::divider

And here's content after the divider.

### Colored Divider

Content before a primary-colored divider.

::divider{color="primary"}

Content after the colored divider.

### Spacer

Content before spacer.

::spacer{height="3rem"}

Content after spacer (with 3rem spacing).

## Combining Features

You can combine multiple styling features to create rich, engaging content:

:::tip{title="Pro Tip"}
Use :highlight[highlighted text] and :badge[Important] badges even inside callouts! You can also use :text-primary[colored text] to add extra emphasis.

::divider{color="accent"}

And you can even add dividers within callouts for better organization.
:::

:::colored-section{color="secondary" border="left"}

## Nested Heading

Colored sections can contain headings, lists, and all other markdown elements:

- First item with :badge[New] badge
- Second item with :text-accent[accent color]
- Third item with :underline-primary[primary underline]

::divider

Even dividers work inside colored sections!
:::

## Real-World Example

:::info{title="Getting Started"}
Welcome to Statue! Here's what you need to know to get started with custom styling:

1. Use :highlight[container syntax] (:::type) for callouts and sections
2. Use :highlight[leaf syntax] (::type) for dividers and spacers
3. Use :highlight[text syntax] (:type[text]) for inline styling

::divider{color="primary"}

Check out the :text-primary[documentation] for more details, or explore the :badge[Examples] section.
:::

:::tip{title="Best Practices"}

- Use callouts sparingly to maintain impact
- Stick to your theme colors for consistency
- Test your content in both light and dark modes
- Keep accessibility in mind - ensure good color contrast
  :::

:::success{title="You're Ready!"}
Now you have all the tools you need to create beautifully styled blog posts. Happy writing!
:::

---

**Note**: All styling automatically adapts to your chosen theme and works seamlessly across all devices.
