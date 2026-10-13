# Agent 维护说明

本仓库是 ADaozz 的个人技术出版物，不是作品集、企业官网或 SaaS 控制台。Agent 改站点时只处理内容、站点数据和必要的排版约束；不要发明履历、不要加演示文、不要改成卡片墙。

发布不依赖本地构建。把变更推到 `main` 后，由 GitHub Actions 检查并发布到 GitHub Pages。

## 信息放哪里

| 要写的东西 | 放这里 | 不要放这里 |
| --- | --- | --- |
| 长文、有结论或有完整取舍的技术文章 | `src/content/writing/*.md` 或 `*.mdx` | 不要写进 `src/pages/` |
| 短笔记、命令、缺陷、实验、未完成的观察 | `src/content/notes/*.md` | 不要做成 Writing 的缩小复制 |
| 个人项目 | `src/content/projects/*.md` | 不要在页面里手写项目状态 |
| 站点名、品牌、首页标题、简介、兴趣、Email、GitHub | `src/data/site.ts` | 不要在 About / Header 里硬编码一套新文案 |
| 导航项 | `src/data/site.ts` 的 `nav` | 不要只改某个页面的页眉 |
| 颜色、字号、页宽、行高 | `src/styles/tokens.css` | 不要在组件里另起主色 |
| 全局排版与首页/列表布局 | `src/styles/global.css` | 不要为单篇文章写一套新主题 |
| 文章正文样式（代码块、表格、引用、标题） | `src/styles/prose.css` | 不要给代码块加第三种强调色 |
| 静态图、favicon | `public/` | Markdown 里的站点根路径图片用 `import.meta.env.BASE_URL` 拼接，以便 GitHub Pages 子路径可用 |
| 内容 schema | `src/content.config.ts` | 改字段前确认列表页、详情页、搜索、RSS 都能消费 |
| 部署 | `.github/workflows/deploy.yml` | 不要为了发一篇文章改工作流 |

空集合是合法状态。没有文章时页面显示空文案即可，不要补样例数据。

## 三种内容怎么写

### Writing

文件：`src/content/writing/<slug>.md`

```yaml
---
title: "文章标题"
description: "列表和搜索用的摘要，写完整句子"
publishedAt: 2026-10-13
updatedAt: 2026-10-20   # 可选
tags:
  - AI Agent
  - Engineering
draft: false
featured: false
---
```

规则：

- `slug` 来自文件名，不要在页面代码里登记。
- `featured: true` 才会稳定出现在首页 Selected Writing；一篇都没有 featured 时，首页会退回最近文章。
- `draft: true` 不进入正式构建的页面、搜索索引、RSS。
- 正文面向阅读：标题用 `##` / `###`，够多时详情页会自动出目录。
- 需要表格、MDX 组件时用 `.mdx`。
- 不要默认加封面图。

### Notes

文件：`src/content/notes/<slug>.md`

```yaml
---
title: "短标题"
description: "一行说明，可空"
publishedAt: 2026-10-13
tags:
  - CLI
draft: false
---
```

规则：

- 比文章短，信息密度更高，不要写大段导语。
- 适合命令、复现步骤、一次失败、一条还没写成文的观察。
- 每条笔记都有自己的详情页，列表不要做成卡片。

### Projects

文件：`src/content/projects/<slug>.md`

```yaml
---
title: "deep_agent_cli"
summary: "一句话说明这个项目做什么"
stack:
  - Python
  - Linux
github: "https://github.com/ADaozz/deep_agent_cli"
status: active
order: 1
draft: false
---
```

规则：

- `status` 只能是 `wip` | `active` | `paused` | `archived`。页面按字段显示，禁止写成「已发布」「稳定」除非字段就是这个意思。
- 缺少 GitHub 或主页时把字段留空或删掉，不要编链接。
- 有 `github` 时，列表整行应链到该仓库。
- `order` 越小越靠前。

### 站点身份

改作者介绍、About、页脚 GitHub、首页主标题时，只改 `src/data/site.ts`。

- `author.headline`：首页主标题
- `author.bio` / `description`：首页副文和 SEO
- `author.email`：空字符串表示未配置，About 必须显示「未配置」，不要编邮箱
- 不要编造工作经历、社交关系或未提供的项目

## 排版约束

视觉目标：Swiss Editorial / 克制的技术出版物。底色鼠尾草绿，字纯黑。

只使用 tokens 里的颜色：

- 背景 `#97AC9F`
- 主文字 `#000000`
- 次级文字 `#2E4036`
- 分割线 `rgba(0, 0, 0, 0.24)`
- 代码块允许黑底绿字反转：背景 `#000000`，字 `#97AC9F`

版心：

- 页面最大宽度 1040px
- 长文正文 720px
- 正文字号约 16–17px，行高 1.8
- 标题字重 600–700
- 分割线 1px
- 圆角不超过 4px
- 英文微标题（`WRITING`、`PROJECTS`、`NOTES`）用小号大写；主要内容用中文

Agent 改样式时必须遵守：

- 列表用横线、编号、留白，不用大面积独立卡片
- 首页保持：介绍 → 精选文章 → 最近更新 → 双栏 Projects / Notes → 页脚
- Hover 用下划线或黑色透明度，不用高饱和强调色
- 夜间模式只对调鼠尾草绿 `#97AC9F` 和黑色 `#000000`，不要引入第三种主色
- 项目条目（有 GitHub 时）整行链接到 GitHub 仓库页
- 不用渐变 Hero、玻璃拟态、大阴影、荧光、伪终端、无意义滚动动画
- 移动端导航必须能换行，不得横向撑破
- 代码块超长行在块内滚动，不能撑破页面
- 不要做评论、登录或 CMS

正文 Markdown 约定：

- 引用用 `>`
- 代码围栏标明语言
- 图片必须有 alt；说明写在 `figcaption` 或紧跟的说明文字
- 不要靠大量远程字体才能渲染

改完内容后，年份归档、标签、RSS、sitemap、搜索索引由现有页面自动派生，不要手写新归档页。

## 自动发布

工作流：`.github/workflows/deploy.yml`。

触发：

1. 把提交推到 `main`（合并 PR 也算）
2. 或在 GitHub Actions 里手动跑 `Deploy to GitHub Pages`

流水线顺序：内容检查 → 类型检查 → 构建 → 通过后才发布。检查失败不会更新线上站点。

地址规则（工作流自动算，不要把用户名写进源码）：

- `SITE_URL` 只写源站，例如 `https://adaozz.github.io`，不要带仓库路径
- 仓库名是 `ADaozz.github.io` → `BASE_PATH=/` → `https://adaozz.github.io/`
- 其他仓库名，例如 `blog` → `BASE_PATH=/blog` → `https://adaozz.github.io/blog/`
- RSS、canonical、sitemap 必须走 `absoluteUrl()`，避免 `/blog/blog/` 这种重复前缀

Agent 发一篇文章的正确动作：

1. 只新增或修改 `src/content/...` 或 `src/data/site.ts`
2. 提交并推到会进入 `main` 的分支
3. 不要本地 `npm run build` 作为发布步骤
4. 不要改 Pages 设置、不要创建新远端仓库、不要用 GitHub API 发布，除非维护者明确要求

维护者只需做一次（源码做不到）：仓库 Settings → Pages → Build and deployment → Source 选 **GitHub Actions**。之后每次 `main` 更新都会自动发布。

覆盖地址时，在仓库 Actions 的 Variables 里设 `SITE_URL` 和 `BASE_PATH`。未设置时沿用上面的自动规则。
