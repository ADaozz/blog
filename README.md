# ADaozz

个人技术博客。静态优先，用 Astro + TypeScript + Markdown 记录 AI Agent、软件工程和开发工具方面的实践。

目标站点：`https://adaozz.github.io/`。当前仓库如果不是 `ADaozz.github.io`，GitHub Actions 会按项目站点发布到 `https://adaozz.github.io/<repo>/`。

## 添加内容

把 Markdown 或 MDX 放到对应目录，不必改页面代码。推送到 `main` 后由 GitHub Actions 检查并发布。

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

## 部署到 GitHub Pages

工作流：`.github/workflows/deploy.yml`。推送到 `main` 后会先跑内容检查、类型检查和构建，全部通过才发布。

1. 在仓库 Settings → Pages → Build and deployment 中选择 **GitHub Actions**。
2. 用户站点：仓库名为 `ADaozz.github.io`，访问 `https://adaozz.github.io/`。
3. 项目站点：访问 `https://adaozz.github.io/<repo>/`。
4. 如需覆盖自动推导，在 Actions 环境中设置 `SITE_URL` 和 `BASE_PATH`。

需要你在 GitHub 上确认 Pages 源为 GitHub Actions，并把代码合并到 `main`。

## 设计说明

视觉是鼠尾草绿底 `#97AC9F` 与纯黑文字。布局参考 Fourfold 的编辑式结构，组件和样式为独立实现。
