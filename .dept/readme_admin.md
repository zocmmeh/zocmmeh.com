# 📋 中山大学中山眼科中心茂名医院 — 网站编辑指南

## 📁 文件结构说明

```
maoming_eye_hospital_design/
├── index.html          ← 首页（轮播图、快速服务、科室展示、新闻动态）
├── services.html       ← 就诊服务（在线预约挂号系统）
├── departments.html    ← 科室介绍（6个科室详情）
├── doctors.html        ← 专家团队（专家列表和详情）
├── guide.html          ← 就医指南（门诊/急诊/住院/医保流程）
├── faq.html            ← 常见问题（分类FAQ手风琴）
├── about.html          ← 医院简介（概述、设备、数据）
├── contact.html        ← 联系我们（地址、交通、留言表单）
├── css/
│   └── style.css       ← 全局样式（颜色、布局、响应式）
├── js/
│   └── common.js       ← 公共交互（轮播、菜单、表单）
├── images/
│   ├── logo.png        ← 导航栏Logo（中山大学中山眼科中心官方院徽）
│   ├── logo_footer.png ← 页脚Logo
│   ├── logo_standalone.png ← 独立Logo（白色背景版）
│   └── favicon.ico     ← 浏览器标签页图标
└── README_ADMIN.md     ← 本文件（编辑指南）
```

---

## ✏️ 常见修改操作

### 1. 修改医院基本信息

| 修改内容 | 编辑文件 | 搜索关键词 |
|---------|---------|-----------|
| 医院名称 | **所有 HTML 文件** | `中山大学中山眼科中心茂名医院` |
| 医院地址 | contact.html, index.html | `茂名市茂南区` |
| 联系电话 | contact.html, index.html | `0668-` |
| 门诊时间 | contact.html, guide.html | `门诊时间` |
| 微信号/二维码 | contact.html | `微信公众号` |

### 2. 修改导航菜单

编辑 **所有 8 个 HTML 文件** 中的 `<nav>` 部分，找到 `<div class="nav-links">`，修改其中的链接。

### 3. 修改轮播图（首页）

打开 `index.html`，找到 `<div class="hero-slider">`，每个 `<div class="hero-slide">` 是一张轮播。
修改背景色/文字即可更换内容。

### 4. 修改科室信息

打开 `departments.html`，找到对应的科室 `<div class="dept-card">`，修改：
- 科室名称
- 诊疗范围
- 特色技术
- 科室位置

### 5. 修改/添加专家

打开 `doctors.html`，每个 `<div class="doctor-card">` 是一位专家。复制一个卡片并修改：
- 专家姓名
- 职称
- 擅长领域
- 出诊时间
- 头像：修改 `<div class="doctor-avatar">` 的背景色或换成 `<img>` 标签

### 6. 修改常见问题

打开 `faq.html`，找到对应的分类标签区域，修改或添加 FAQ 条目：
```html
<div class="faq-item">
  <div class="faq-question">你的问题？</div>
  <div class="faq-answer">你的答案</div>
</div>
```

### 7. 修改医院动态/新闻

打开 `index.html`，找到 `<div class="news-list">`，修改新闻条目的标题、日期和摘要。

### 8. 修改颜色主题

打开 `css/style.css`，搜索以下变量并修改：
```css
:root {
  --primary: #1a5cb0;      /* 主色（蓝色） */
  --primary-dark: #144a8c;  /* 深蓝色 */
  --primary-light: #e8f0fe; /* 浅蓝色背景 */
  --accent: #ff6b00;        /* 强调色（橙色） */
}
```

### 9. 修改底部版权信息

编辑 **所有 HTML 文件** 中的 footer 部分，搜索 `版权所有`。

---

## 🖼️ 如何添加真实图片

### 替换 Logo
将新 Logo 放入 `images/` 文件夹，然后在 HTML 中修改：
```html
<img src="images/logo.png" alt="..." style="height:40px;">
```

### 添加科室/专家真实照片
1. 将照片放入 `images/` 文件夹
2. 在 HTML 中找到对应位置
3. 将占位色块替换为 `<img>` 标签

### 添加轮播图背景
在 `index.html` 的 `.hero-slide` 中修改 `style="background: ..."` 为真实图片：
```html
<div class="hero-slide" style="background-image: url('images/banner1.jpg'); background-size: cover; background-position: center;">
```

---

## 🚀 部署到服务器

### 方式一：直接上传
将整个 `maoming_eye_hospital_design/` 文件夹内的所有文件上传到服务器网站根目录。

### 方式二：通过 FTP
使用 FileZilla 等工具连接服务器，上传文件。

### 方式三：联系开发
如有技术问题，联系网站开发团队处理。

---

## ⚠️ 注意事项

1. **修改前备份**：修改任何文件前，建议先复制一份备份
2. **保持一致**：导航栏和底部信息在所有页面中都要保持一致
3. **编码格式**：所有 HTML 文件使用 **UTF-8** 编码保存
4. **测试**：修改后用浏览器打开测试，特别注意手机端显示效果
5. **Logo**：`images/logo.png` 是中山大学中山眼科中心官方院徽，**请勿替换**
