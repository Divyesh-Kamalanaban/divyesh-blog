---
title: "Pragmatic Observability: What to Actually Alert On"
slug: "pragmatic-observability"
date: "Sep 15, 2024"
readingTime: "6 min read"
category: "DevOps"
excerpt: "Alert fatigue is real. Stop paging on high CPU and start paging on degraded user experience. A comprehensive guide to setting up Service Level Objectives (SLOs) that matter."
tags: ["DevOps", "Observability", "SRE"]
---

It is 3:00 AM on a Tuesday. Your pager goes off: *'CPU Utilization at 92% on container-prod-x89s'*. You groggily log on, run a telemetry trace, and find a background batch index compiler has brief-pulsed. The system is operating normally for users, but an arbitrary metric ceiling was crossed.

This is alert fatigue. If everything is critical, nothing is.

### Pivot from System Metrics to Experience Indicators

Traditional monitoring alerts on high CPU, memory caps, or server thread limitations. While important for capacity scaling, these do not map directly to user pain. A container can run at 99% CPU while users still receive instant, cached responses. Conversely, a database lock can bring your checkout process to a halt while CPU sits at 1%.

To establish a pragmatic telemetry setup, organize your alerts around **Service Level Objectives (SLOs)** that track user-facing pain points. Focus on Google's SRE Golden Signals:

#### 1. Latency (The User Experience Dial)
Do not page on average latency metrics (averages hide terrible edge experiences). Set alerts on high-percentile latencies:
- **Good Alert:** "More than 5% of web checkout requests over the last 10 minutes exceeded 1.5 seconds."

#### 2. Traffic (The Saturation Indicator)
Monitor demand spikes. If traffic goes off-chart or drops to zero, a routing anomaly is present.

#### 3. Errors (The Quality Monitor)
Track explicit server-fault codes (HTTP 5xx, gRPC error states). Ensure your rate-of-error tolerances map strictly to service functionality.

#### 4. Saturation (The System Buffer)
Alert on resource exhaustion *only* when it projects hard outages in the immediate future, such as disk space running down within a few hours.

By configuring monitoring alerts based on user-journey impairment, you save your development team’s sanity and target engineering focus on actual failures.
