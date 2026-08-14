# 我的记录 · 个人博客

一个用来写日记、笔记、随手记的个人网站。基于 [Astro](https://astro.build/) 静态博客，**不需要数据库、不需要服务器**，写作就是在电脑上编辑文本文件，别人可以随时点进来阅读（没有评论、登录等交互）。

---

## 一、这个网站长什么样

- **首页**：把所有记录按时间从新到旧排好，每条带一个分类标签（日记 / 笔记 / 随手记）。
- **全部记录页**：可按分类查看，顶部有各分类的数量统计。
- **文章页**：单条记录的完整内容。
- **关于页**：自我介绍，可自由修改。

你的所有内容都是 `src/content/blog/` 里的 `.md` 文本文件——**这就是你的全部数据**，想备份就复制这个文件夹，想搬家就带走它，永远不会被平台绑架。

---

## 二、本地预览（在自己电脑上看效果）

第一次使用前，先在这个文件夹里安装依赖（只需一次）：

```bash
npm install
```

> 如果 `npm install` 报缓存权限错误（EPERM），运行一次
> `sudo chown -R $(id -u):$(id -g) ~/.npm` 再重试即可。

然后启动本地预览：

```bash
npm run dev
```

终端会显示一个地址（一般是 `http://localhost:4321`），用浏览器打开就能看到网站。
**改动文件后网页会自动刷新**，边写边看。按 `Ctrl + C` 停止。

---

## 三、怎么写一条新记录

1. 进入 `src/content/blog/` 文件夹。
2. 新建一个 `.md` 文件，文件名建议用日期，例如 `2026-08-20-hello.md`（文件名会成为网址的一部分，尽量用英文/数字/短横线更稳妥）。
3. 文件开头写这几行「信息头」（叫 frontmatter），再往下写正文：

```markdown
---
title: '标题写这里'
description: '一句话简介，会显示在首页列表里。'
pubDate: '2026-08-20'
category: 'diary'
---

正文从这里开始，用 Markdown 写就行。

- 可以列清单
- **可以加粗**

想看更多写法，参考站里那篇《Markdown 速查》。
```

**信息头字段说明：**

| 字段 | 必填 | 说明 |
|---|---|---|
| `title` | 是 | 标题 |
| `description` | 是 | 一句话简介（首页列表里显示） |
| `pubDate` | 是 | 日期，格式 `'2026-08-20'` |
| `category` | 否 | 分类，只能是 `diary`(日记) / `notes`(笔记) / `quick`(随手记)，不写默认随手记 |
| `updatedDate` | 否 | 更新日期，格式同上 |
| `heroImage` | 否 | 顶部大图（进阶，见下方说明） |

保存后，本地预览页面会自动出现这条新记录。

---

## 四、常见改动在哪里改

| 想改什么 | 改哪个文件 |
|---|---|
| 网站名字、简介、页脚署名 | `src/consts.ts` |
| 分类（增删「日记/笔记/随手记」） | `src/consts.ts` 里的 `CATEGORIES`，同时改 `src/content.config.ts` 里的 `category` 枚举 |
| 「关于」页内容 | `src/pages/about.astro` |
| 导航栏文字 | `src/components/Header.astro` |
| 整体配色、字体大小 | `src/styles/global.css` |

> 顶部大图（heroImage）：把图片放进 `src/assets/`，然后在信息头写
> `heroImage: '../../assets/你的图片.jpg'` 即可。不写就没有大图，页面也很干净。

---

## 五、发布上线（让别人能访问）

上线分三步：**代码传到 GitHub → 用 Vercel 免费托管 →（可选）绑定自己的域名**。全程免费，只有域名要花钱（约 ¥60/年）。

### 第 1 步：传到 GitHub

1. 注册 [GitHub](https://github.com) 账号，新建一个空仓库（Repository）。
2. 在本文件夹里运行：

```bash
git init
git add .
git commit -m "我的记录：初始版本"
git branch -M main
git remote add origin 你的仓库地址   # 形如 https://github.com/你的用户名/仓库名.git
git push -u origin main
```

### 第 2 步：Vercel 免费部署

1. 用 GitHub 账号登录 [Vercel](https://vercel.com)。
2. 点 **Add New → Project**，选中你刚才的仓库，点 **Import**。
3. Vercel 会自动识别这是 Astro 项目，一路默认，点 **Deploy**。
4. 一两分钟后就有一个 `xxx.vercel.app` 的网址，网站上线了。

**之后每次更新**：只要在本地 `git push`，Vercel 会自动重新部署，网站几十秒后自动更新。日常写作节奏就是：

```bash
git add .
git commit -m "写了一篇新记录"
git push
```

### 第 3 步（可选）：绑定自己的域名

1. 在 [Namecheap](https://namecheap.com) / 阿里云 / 腾讯云 买一个域名（`.com` 约 ¥60/年）。
2. Vercel 项目 → **Settings → Domains** → 填入你的域名。
3. 按 Vercel 给的提示，去域名商后台改 DNS 记录（照抄它给的值）。
4. 生效后就能用 `你的域名.com` 访问了。
5. 别忘了把 `astro.config.mjs` 里的 `site` 改成你的正式网址（影响 RSS、站点地图、分享链接）。

---

## 六、几个常见问题

**Q：数据会丢吗？**
不会。你的内容同时在三处：本地电脑（你写作的地方）、GitHub（云端备份）、Vercel（对外展示）。比放在单一服务器数据库里更安全。

**Q：国内访问慢吗？**
Vercel 在国外，国内访问偶尔偏慢但能用。非常在意速度可以以后换国内托管（阿里云/腾讯云轻量服务器），但那需要域名备案。先用 Vercel 跑起来完全没问题。

**Q：别人能评论吗？**
默认不能，这正是你要的「只看不交互」。以后想加评论也可以（接入第三方评论服务），但不是必须。

**Q：想整体检查有没有错？**

```bash
npm run build
```

能成功就说明没问题；`dist/` 是构建产物，不用管它。

---

## 技术栈

- [Astro](https://astro.build/)（静态站点生成，官方 blog 模板改造）
- 内容：Markdown / MDX 文件
- 托管：GitHub + Vercel（均免费）
