---
title: "Why We Need to Rethink Server-Side Rendering"
slug: "rethinking-ssr"
date: "Apr 15, 2024"
readingTime: "8 min read"
category: "Opinion"
excerpt: "An argument for a more balanced approach to hydration and SSR in modern web applications, focusing on the true cost of shipping JavaScript."
tags: ["Architecture", "Performance", "SSR"]
---

Server-Side Rendering (SSR) is often preached as the ultimate solution for frontend performance and Search Engine Optimization (SEO). The promise is simple: the server prepares complete HTML layouts, and devices receive pre-built pages instantaneously.

But this architecture contains serious performance trade-offs, primarily due to **Hydration**.

### The Hydration Tax

When the browser receives static HTML layouts, the page is rendered visually of course, but it is not *interactive*. The client still has to download, parse, and execute megabytes of component bundles to attach react event hook attachments.

During this period—known as the **Uncanny Valley**—the page looks complete but elements like buttons or menus appear completely broken or unresponsive. Under heavy mobile devices, this gap can exceed tens of seconds, frustrating user experiences.

### A Plural Approach to Site Rendering

Instead of rendering *everything* on the server and drinking the hydration tax globally, consider:

- **Islands of Interactive Components:** Hydrate only the dynamic pieces (navigation bars, charts) and leave the biographical and textual components as pure static HTML (using modern frameworks like Astro).
- **Server Actions:** Re-align client transactions to handle back-and-forth network responses natively to alleviate bundle volumes.

Engineering is the study of trade-offs. It is time to treat JavaScript bundles with the budgeting rigor they demand.
