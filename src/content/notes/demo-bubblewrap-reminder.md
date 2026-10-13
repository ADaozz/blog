---
title: "演示：Bubblewrap 默认无网络"
description: "Agent 在沙箱里跑命令时，先确认网络策略，再判断是工具失败还是策略拦截。"
publishedAt: 2026-10-08
tags:
  - CLI
  - Linux
draft: false
demo: true
---

检查命令失败时，先看是不是沙箱策略拦住了。默认无网络会让 `curl`、包安装和在线模型探测一起失败，日志看起来会像工具坏了。

```bash
# 先确认当前是否在沙箱里，再决定要不要开网络
bwrap --help >/dev/null
```
