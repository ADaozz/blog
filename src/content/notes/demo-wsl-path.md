---
title: "演示：WSL 路径不要混用"
description: "Windows 路径和 Linux 路径混进同一条命令时，文件操作会先于模型逻辑出错。"
publishedAt: 2026-09-21
tags:
  - WSL
  - Engineering
draft: false
demo: true
---

把仓库放在 Linux 文件系统里，再让 Agent 以该目录为工作区。`/mnt/c/...` 可以读，但作为默认工作区会把权限、换行和文件监听一起变慢。
