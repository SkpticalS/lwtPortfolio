# 罗文韬个人作品集网站 — 执行计划

## 项目概述
基于 Viktor Oddy 创意工作室模板重构的炫技级个人作品集网站。融合 10 大精心设计的 Section，类苹果 FLIP 动效的作品详情展开系统，以及拖拽式 Ins 风后台管理。

## 核心特性
- 单页滚动体验（10 Section 架构）
- GSAP + Framer Motion 双轨动效系统
- Shared Layout Transition（类苹果）作品详情展开
- React DnD 拖拽式 Ins 风后台管理
- 中文字体：得意黑（Smiley Sans）+ 思源宋体
- Lenis 丝滑滚动
- AIGC 图片涌现交互

## Stage 1: 项目初始化（Main Agent）
- 读取 vibecoding-webapp-swarm SKILL.md
- 运行 init-webapp.sh
- 复制用户上传图片到 public/ 目录
- 创建 scaffold 分支

## Stage 2: 设计（Pro_Designer）
- 读取 design-guide.md
- 输出 design.md + home.md + admin.md
- 为 7 个项目生成 AI 图片/视频（补充缺失素材）

## Stage 3: Scaffold（Scaffold Agent）
- 搭建共享基础设施：Navbar, Footer, Layout
- 实现 Hero + Infinite Marquee + Personal Statement（前 3 个 Section）
- 配置 Tailwind 主题、字体、GSAP、Lenis
- 生成媒体资产并提交

## Stage 4: 并行子页面实现（3 个并行 Agent）

### Agent A: 首页核心 Section
- Experience Cards (教育+商业化)
- Testimonial Carousel (评价轮播)
- Portfolio Projects (7 项目网格)
- FLIP 动效详情展开系统
- AIGC Emerge Section
- Footer + Copyright Bar + Bottom Nav

### Agent B: 动效系统 + 首页打磨
- Lenis 滚动集成
- IntersectionObserver fadeInUp 系统
- 视差滚动效果
- 跑马灯 CSS 动画
- 底部悬浮导航
- 全局动效协调

### Agent C: 后台管理页面
- Ins 风拖拽发布系统
- localStorage 持久化
- 图片上传 + 预览
- Post 管理（增删改查）
- 拖拽排序
- 作品数据源管理

## Stage 5: 合并、构建、部署（Main Agent）
- Octopus merge 所有分支
- 路由连接
- Build + Deploy

## 技术栈
- React 19 + TypeScript + Vite 7.2.4
- Tailwind CSS v3.4.19
- GSAP (ScrollTrigger, Flip)
- Framer Motion
- Lenis (平滑滚动)
- react-beautiful-dnd (拖拽)
- shadcn/ui

## 页面结构
1. **Home** — 单页 10 Section 作品集
2. **Admin** — 拖拽式后台管理
