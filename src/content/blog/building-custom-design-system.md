---
title: "Building a Custom Design System with Tailwind & CSS Variables"
slug: "building-custom-design-system"
date: "May 12, 2024"
readingTime: "5 min read"
category: "Devlog"
excerpt: "Exploring the architecture behind merging a fixed-fluid hybrid grid with deeply customizable tonal elevation layers using modern CSS features."
tags: ["CSS", "DesignSystems", "Frontend", "Tailwind"]
---

When building high-fidelity products, managing design systems becomes a communication puzzle. Design variables like paddings, colors, and border-radiis often live fragmented between Figma styles and codebase variables.

Our goal was to merge a fixed-fluid hybrid grid with deeply customizable tonal elevation layers inside a React-Tailwind boundary.

### Leveraging the Power of CSS Custom Properties

Tailwind CSS provides awesome compile-time utility classes. However, hardcoding hex colors inside utility arrays severely limits dynamic layout modification (like seamless dark mode toggle or run-time custom skinning).

By mapping tailwind's configuration directly to **CSS Custom Properties (CSS variables)**, we gain runtime full flexibility:

```css
:root {
  --color-surface-subtle: #F9FAFB;
  --color-border-low-contrast: #E5E7EB;
  --color-primary: #0019d7;
}

.dark {
  --color-surface-subtle: #1c1b1b;
  --color-border-low-contrast: #474646;
  --color-primary: #e0e0ff;
}
```

With Tailwind config configured to inject these custom variables:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        "surface-subtle": "var(--color-surface-subtle)",
      }
    }
  }
}
```

Now, classes like `bg-surface-subtle` and `text-primary` immediately adapt to theme modifications dynamically without a single JavaScript re-render. Combining this with fluid typography parameters ensures visual crispness across view constraints.
