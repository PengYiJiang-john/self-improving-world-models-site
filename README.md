# Self-Improving World Models — Website

这是研究网站的公开发布文件，介绍基于模型的控制、Self / World / Others，以及贯穿其中的递归自我改进（RSI）。

This repository contains the public website files for a research proposal on model-based control, Self / World / Others, and recursive self-improvement (RSI).

[网站 / Website](https://pengyijiang-john.github.io/self-improving-world-models-site/)

网页支持中文和英文；所有运行时资源均已本地打包，无需安装依赖或构建。GitHub Pages 从本仓库的 `main` 分支根目录发布，每次推送到 `main` 都会自动触发部署。私有源码仓库不会自动同步到这里；网站更新需将其 `dist/` 内容复制到本仓库根目录后推送。

The bilingual site includes all runtime assets and needs no install or build step. GitHub Pages publishes this repository's root from `main`; each push to `main` automatically triggers deployment. The private source repository does not mirror here automatically: website updates require copying its `dist/` contents into this repository root and pushing the changes.

真实静态子页 `body.html`、`platonic.html` 和 `rsi.html` 使用相对链接，支持 GitHub Pages 项目子路径。

The static subpages `body.html`, `platonic.html`, and `rsi.html` use relative links and support a GitHub Pages project path.
