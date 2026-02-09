---
title: Testing Code Fence Fix
description: Verify that directives inside code blocks are not transformed
date: 2026-02-09
author: Claude
---

# Testing Code Fence Fix

This page tests that custom styling directives inside code blocks are preserved as code and not transformed into actual styled elements.

## Test 1: Container Directives in Code Blocks

Here's how to use callouts (this should display as code):

```markdown
:::info
This should be displayed as code, not as an actual callout
:::
```

And here's an actual working callout for comparison:

:::info
This is an actual rendered info callout
:::

## Test 2: Text Directives in Code Blocks

To highlight text, use this syntax (should display as code):

```markdown
Use :highlight[highlighted text] to make text stand out.
Add :badge[New] to mark new features.
Use :text-primary[colored text] for emphasis.
```

And here's the actual working text directives:

Use :highlight[highlighted text] to make text stand out.
Add :badge[New] to mark new features.
Use :text-primary[colored text] for emphasis.

## Test 3: Leaf Directives in Code Blocks

For dividers, use this syntax (should display as code):

```markdown
Content above

::divider

Content below

::divider{color="primary"}

::spacer{height="3rem"}
```

And here's the actual working dividers:

Content above

::divider

Content below

::divider{color="primary"}

More content

## Test 4: Inline Code

When documenting directives, use inline code like `:highlight[text]` or `:::info` which should display as code, not as styled elements.

The inline code `:badge[Example]` and `:::warning` should remain as inline code.

## Test 5: Multiple Code Blocks

First example of callout syntax:

```markdown
:::warning
First example
:::
```

Second example of colored section:

```markdown
:::colored-section{color="primary"}
Second example
:::
```

Third example with text directives:

```markdown
Use :underline[underlined text] and :text-accent[accent text].
```

All three code blocks should preserve the directive syntax.

## Test 6: Nested Directives

Here's a complex example showing directives inside a callout:

:::tip{title="Documentation Example"}
You can use text directives like :highlight[this] inside callouts.

Here's how to create a callout in your own content:

```markdown
:::info
Your content here
:::
```

The code block above should show the syntax, not render as a callout!
:::

## Test 7: Edge Cases

### Code Block with Multiple Directives

```markdown
:::info
This is a callout with :highlight[highlighted text] and :badge[Badge].

::divider

More content below the divider.
:::
```

### Mixed Content

Some text with :badge[Inline] directive.

```
:::warning
Code block without language specifier
:::
```

More text with :text-primary[colored] directive.

## Success Criteria

✅ Code blocks show directive syntax as plain text
✅ Inline code preserves directive syntax
✅ Regular directives outside code blocks work normally
✅ No transformation of directives inside fenced code blocks
✅ Text directives in inline code remain as code

---

:badge[Test Complete] - If you can see styled callouts, text highlighting, and badges on this page alongside code examples showing the syntax, the fix is working correctly!
