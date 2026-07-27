# 部署指南

本指南介绍如何部署启发式思考系统到各个平台。

## 目录

1. [Firebase配置](#firebase配置)
2. [本地运行](#本地运行)
3. [Cloudflare Pages部署](#cloudflare-pages部署)
4. [其他部署选项](#其他部署选项)
5. [常见问题](#常见问题)

---

## Firebase配置

### 1. 创建Firebase项目

1. 访问 https://console.firebase.google.com/
2. 点击"创建项目"
3. 填写项目名称（如：think-system）
4. 确认默认设置，创建项目
5. 等待项目创建完成

### 2. 启用认证

1. 在Firebase控制台，点击左侧"Build"→"Authentication"
2. 点击"Get started"
3. 选择"Email/Password"，启用
4. 保存

### 3. 创建Firestore数据库

1. 点击"Firestore Database"
2. 点击"Create Database"
3. 选择位置（asia-southeast1最近）
4. 选择"Start in test mode"
5. 创建

### 4. 获取配置信息

1. 点击"Project settings"（齿轮图标）
2. 选择"Your apps"
3. 创建一个Web app
4. 复制firebaseConfig中的所有信息

### 5. 创建.env.local文件

在项目根目录创建 `.env.local` 文件：

```
REACT_APP_FIREBASE_API_KEY=your_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### 6. 设置Firestore规则

在Firebase控制台，Firestore Database → Rules，更新为：

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 用户只能访问自己的数据
    match /dramas/{document=**} {
      allow read, write: if request.auth.uid == resource.data.userId;
    }
    match /notes/{document=**} {
      allow read, write: if request.auth.uid == resource.data.userId;
    }
  }
}
```

---

## 本地运行

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问

### 构建生产版本

```bash
npm run build
```

生成的文件在 `build` 目录中。

---

## Cloudflare Pages部署

### 方法A：使用GUI

1. 访问 https://dash.cloudflare.com/
2. 登录/注册Cloudflare账户
3. 左侧菜单选择"Pages"
4. 点击"Create a project"
5. 连接GitHub仓库
6. 授权Cloudflare访问
7. 选择你的"think-system"仓库
8. 配置构建设置：
   - Framework: Create React App
   - Build command: `npm run build`
   - Build output directory: `build`
9. 环境变量：
   - 点击"Environment variables"
   - 添加所有REACT_APP_*变量
10. 点击"Save and Deploy"

### 方法B：使用CLI

```bash
# 安装Wrangler
npm install -g @cloudflare/wrangler

# 登录
wrangler login

# 构建
npm run build

# 发布
wrangler publish
```

### 创建wrangler.toml

```toml
name = "think-system"
type = "javascript"
account_id = "your_account_id"
workers_dev = true

[build]
command = "npm install && npm run build"
watch_paths = ["src/**/*.ts", "src/**/*.tsx"]

[build.upload]
format = "service-worker"
```

---

## 其他部署选项

### Vercel

1. 访问 https://vercel.com/
2. 导入项目
3. 配置环境变量
4. 部署

```bash
npm install -g vercel
vercel
```

### Netlify

1. 访问 https://netlify.com/
2. 连接GitHub仓库
3. 配置构建设置：
   - Build command: `npm run build`
   - Publish directory: `build`
4. 添加环境变量
5. 部署

### GitHub Pages

需要在package.json中添加homepage字段：

```json
"homepage": "https://yourusername.github.io/think-system"
```

---

## 常见问题

### Q: 部署后Cannot find module错误？

A: 确保.env.local中的所有变量都已设置。检查变量名称是否正确（必须以REACT_APP_开头）。

### Q: Firebase报权限错误？

A: 检查Firestore规则是否已正确更新。调试期间可以改为test mode，但生产环境必须使用安全规则。

### Q: Cloudflare部署很慢？

A: 这是正常的。第一次部署可能需要5-10分钟。之后会快得多。可以在部署历史中查看进度。

### Q: 如何更新已部署的版本？

A: 
- GitHub集成：直接推送到main分支，自动部署
- CLI：重新运行`npm run build && wrangler publish`

### Q: 如何处理自定义域名？

A:
- Cloudflare Pages: 在项目设置中添加Custom domain
- Vercel/Netlify: 在项目设置中配置domain

### Q: 如何备份数据？

A: 在Firebase控制台：
1. Firestore Database → 三点菜单
2. 选择"Export collection"
3. 选择存储位置
4. 导出完成

---

## 部署检查清单

在部署前，确保：

- [ ] 所有环境变量已设置正确
- [ ] Firebase规则已更新为安全模式
- [ ] 构建命令成功：`npm run build`
- [ ] 本地测试通过：`npm run dev`
- [ ] .env.local文件不在版本控制中
- [ ] README.md已更新
- [ ] LICENSE文件存在

---

## 监控和维护

### 查看错误日志

- Cloudflare: 在Pages项目中查看"Analytics"
- Vercel: 在Deployments中查看"Logs"
- Netlify: 在Deploys中查看"Deploy log"

### 性能优化

- 启用CDN缓存
- 压缩JavaScript和CSS
- 使用图像优化
- 检查Core Web Vitals

### 安全检查

- 定期更新依赖：`npm audit fix`
- 启用HTTPS（所有平台默认）
- 定期审查Firebase规则
- 监控异常访问

---

更多帮助，请参考：
- [Firebase文档](https://firebase.google.com/docs)
- [Cloudflare Pages文档](https://developers.cloudflare.com/pages/)
- [Vercel部署指南](https://vercel.com/docs)
- [Netlify部署指南](https://docs.netlify.com/)
