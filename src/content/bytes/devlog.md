---
id: "byte-7"
type: "devlog"
title: "Migrating to Next 14"
date: "Oct 18"
fileName: "devlog.md"
---

Server actions are finally feeling stable enough for production use. Ripping out tRPC in favor of native actions reduced the bundle size by almost 15%. The developer experience is vastly simpler, though handling loading states requires a slight mental shift.
