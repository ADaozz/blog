# ADaozz

个人技术博客。静态优先，用 Astro + TypeScript + Markdown 记录 AI Agent、软件工程和开发工具方面的实践。

目标站点：`https://adaozz.github.io/`。当前仓库如果不是 `ADaozz.github.io`，GitHub Actions 会按项目站点发布到 `https://adaozz.github.io/<repo>/`。

## 添加内容

把 Markdown 或 MDX 放到对应目录，不必改页面代码。推送到 `main` 后由 GitHub Actions 检查并发布。

Agent 改内容和排版前先读 `AGENTS.md`。

| 类型 | 目录 | 必要字段 |
| --- | --- | --- |
| 文章 | `src/content/writing/` | `title` `description` `publishedAt` |
| 笔记 | `src/content/notes/` | `title` `publishedAt` |
| 项目 | `src/content/projects/` | `title` `summary` `status` |

文章 frontmatter：

```yaml
---
title: "文章标题"
description: "文章摘要"
publishedAt: 2026-10-13
tags:
  - AI Agent
  - Engineering
draft: false
featured: false
---
```

`draft: true` 的条目不会进入页面、搜索索引和 RSS。

项目 `status` 只能是 `wip`、`active`、`paused`、`archived`。页面按这个字段显示状态。

站点名称、简介、GitHub、Email 写在 `src/data/site.ts`。没有的信息保持空字段。

## 自动发布

推送到 `main` 就会发布，不需要本地构建。

工作流 `.github/workflows/deploy.yml` 会依次跑内容检查、类型检查和构建，全部通过后部署到 GitHub Pages。

一次性设置：仓库 Settings → Pages → Build and deployment → Source 选 **GitHub Actions**。当前 PR 还在 `main` 之外时，先合并，之后每次 push `main` 都会更新站点。

- 用户站点仓库 `ADaozz.github.io` → `https://adaozz.github.io/`
- 当前仓库 `blog` → `https://adaozz.github.io/blog/`

## 设计说明

视觉是鼠尾草绿底 `#97AC9F` 与纯黑文字。布局参考 Fourfold 的编辑式结构，组件和样式为独立实现。
