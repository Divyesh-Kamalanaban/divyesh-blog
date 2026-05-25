---
id: "byte-9"
type: "snippet"
title: "Hide Scrollbar Utility CSS"
date: "Oct 12"
fileName: "styles.css"
---

```css
/* Acorn standard scrollbar removal */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none; /* IE/Edge */
  scrollbar-width: none;    /* Firefox */
}
```
