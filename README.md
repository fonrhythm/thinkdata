# 启发式思考系统 (Think System)

一个用于深度分析BL年代剧的React应用，基于五层启发式思考框架。

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 📖 项目简介

**启发式思考系统**是一个交互式的影视分析工具，帮助用户通过五层递进式思考来深度分析年代爱情剧：

1. **表面观感** - 你的直觉反应
2. **具体分析** - 细看"怎样"和"为什么"
3. **理论审视** - 用理论工具重新看
4. **综合反思** - 多个理论工具的对话
5. **终极反思** - 从看剧回到看自己

每一层都包含系统的问题框架和理论指导。

## 🎯 核心功能

- ✅ 用户认证与账户管理
- ✅ 剧集管理与追踪
- ✅ 五层思考系统交互
- ✅ 笔记保存与编辑
- ✅ 理论工具库（权力、性别、现代性、后殖民、个人与结构）
- ✅ 深度分析生成
- ✅ 导出为PDF和文章

## 🛠 技术栈

### 前端
- **React 18.2** - UI框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式系统
- **React Router 6** - 路由管理
- **Zustand** - 状态管理

### 后端/数据库
- **Firebase Authentication** - 用户认证
- **Firestore** - 数据库
- **Firebase Storage** - 文件存储

### 其他
- **Axios** - HTTP请求
- **html2pdf.js** - PDF导出
- **date-fns** - 日期处理

## 📦 项目结构

```
think-system/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── Login.tsx
│   │   │   └── Register.tsx
│   │   ├── MainLayout.tsx
│   │   ├── DramaSelector.tsx
│   │   ├── ThinkingLayers/
│   │   │   ├── LayerSelector.tsx
│   │   │   ├── Layer1Surface.tsx
│   │   │   ├── Layer2Analysis.tsx
│   │   │   ├── Layer3Theory.tsx
│   │   │   ├── Layer4Synthesis.tsx
│   │   │   └── Layer5Ultimate.tsx
│   │   ├── TheoryToolbox.tsx
│   │   ├── SceneAnalyzer.tsx
│   │   ├── NoteEditor.tsx
│   │   ├── ArticleGenerator.tsx
│   │   └── ColorPalette.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useDrama.ts
│   │   ├── useThinking.ts
│   │   └── useNotes.ts
│   ├── types/
│   │   ├── index.ts
│   │   └── firebase.ts
│   ├── services/
│   │   ├── firebase.ts
│   │   ├── noteService.ts
│   │   └── articleService.ts
│   ├── constants/
│   │   ├── colors.ts
│   │   ├── layers.ts
│   │   └── theories.ts
│   ├── App.tsx
│   ├── App.css
│   └── index.tsx
├── .env.example
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

## 🚀 快速开始

### 前置要求
- Node.js >= 16
- npm 或 yarn
- Firebase账户

### 1. 克隆项目

```bash
git clone <your-repo-url>
cd think-system
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置Firebase

1. 访问 [Firebase Console](https://console.firebase.google.com/)
2. 创建新项目（或使用现有项目）
3. 启用以下服务：
   - Authentication (Email/Password)
   - Firestore Database
   - Storage (可选)

4. 获取Firebase配置信息

5. 在项目根目录创建 `.env.local` 文件：

```bash
cp .env.example .env.local
```

6. 填入你的Firebase凭证：

```
REACT_APP_FIREBASE_API_KEY=your_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### 4. 启动开发服务器

```bash
npm run dev
```

访问

## 📚 使用指南

### 注册与登录

1. 访问应用首页
2. 点击"注册"创建新账户
3. 使用邮箱和密码登录

### 添加剧集

1. 登录后，点击"添加新剧"
2. 填入剧名、年份、平台等信息
3. 保存

### 开始分析

1. 选择一部剧集
2. 按照五层框架逐层分析：
   - 从表面观感开始
   - 逐步深入具体分析
   - 运用理论工具
   - 综合多个视角
   - 最后进行自我反思

3. 每一层的笔记会自动保存到Firebase

### 导出与分享

- 保存的笔记可以生成为PDF
- 支持导出为文章格式
- 可以生成分析报告

## 🔐 Firebase配置指南

### Firestore规则（安全配置）

在Firebase控制台，更新Firestore规则为：

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
    match /articles/{document=**} {
      allow read, write: if request.auth.uid == resource.data.userId;
    }
  }
}
```

## 🌐 部署

### 部署到Cloudflare Pages

#### 使用GUI

1. 访问 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 选择 Pages
3. 连接GitHub仓库
4. 配置构建设置：
   - Framework: Create React App
   - Build command: `npm run build`
   - Build output: `build`
5. 添加环境变量（所有REACT_APP_*变量）
6. 部署

#### 使用CLI

```bash
# 安装Wrangler
npm install -g @cloudflare/wrangler

# 登录
wrangler login

# 创建wrangler.toml（见下方）
# 然后部署
npm run build
wrangler publish
```

**wrangler.toml 示例：**

```toml
name = "think-system"
type = "javascript"
account_id = "your_account_id"
workers_dev = true

[build]
command = "npm install && npm run build"
watch_paths = ["src/**/*.ts", "src/**/*.tsx"]
```

### 其他部署选项

- **Vercel**: `vercel deploy`
- **Netlify**: 连接GitHub，自动部署
- **GitHub Pages**: 需要自定义配置

## 🎨 自定义样式

### 颜色系统

所有颜色定义在 `src/constants/colors.ts`：

```typescript
export const COLORS = {
  primary: {
    dark: '#1B202B',      // 深蓝
    main: '#93A4C1',      // 主蓝
    light: '#D3DFF2',     // 浅蓝
    lighter: '#E7E8E4',   // 最浅
  },
  accent: {
    rose: '#C96D8A',      // 粉红
    champagne: '#F5E6D1', // 香槟
    muted: '#B5ACA3',     // 中性
  },
};
```

修改这些颜色以匹配你的品牌。

## 📖 理论框架参考

项目包含5个理论工具：

1. **权力分析** (傅柯) - 权力如何生产爱情与主体
2. **性别与性向分析** (女性主义/酷儿理论) - 性别气质与身份
3. **现代性批判** (韦伯/本雅明) - 传统与现代的张力
4. **后殖民视角** (萨义德/斯皮瓦克) - 东西方想象与他者化
5. **个人与结构** (米尔斯/萨特) - 能动性与结构约束

每个理论都包含详细的概念说明和引导性问题。

## 🤝 贡献指南

欢迎贡献！请按照以下步骤：

1. Fork 本项目
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

## 📝 许可证

本项目采用 MIT 许可证。详见 `LICENSE` 文件。

## 🐛 报告问题

如遇到问题，请在 GitHub Issues 中报告。

## 💬 获取帮助

- 查看 `docs/` 文件夹中的详细文档
- 提交 Issue 或 Discussion
- 联系项目维护者

## 🎓 学习资源

- [Firebase文档](https://firebase.google.com/docs)
- [React官方文档](https://react.dev)
- [TypeScript文档](https://www.typescriptlang.org/docs/)
- [Tailwind CSS文档](https://tailwindcss.com/docs)

## 📊 项目统计

- 代码行数：约3000-4000行
- 组件数量：15+
- 理论工具：5个
- 思考层级：5层

## 🙏 致谢

感谢所有为这个项目提供灵感的学者和粉丝！

---

**最后更新**：2024年
**维护者**：[Your Name/Team]

如果这个项目对你有帮助，请给个Star ⭐！
