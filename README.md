# 本地文件在线预览应用
## 项目概述
开发纯前端静态文件在线预览应用，无后端依赖，适配电脑、移动端双端，采用响应式布局，整体扁平化简约视觉风格。

## 技术栈硬性要求
Vue3 + Vite + TypeScript + Pinia + Element Plus + Tailwind CSS，组合式API+script setup写法，可引入pdfjs-dist、office-viewer等文件预览相关第三方插件

## 页面结构
1. 顶部导航栏：展示应用名称、基础功能入口
2. 文件上传区：支持点击选取、拖拽上传两种模式
3. 文件列表区：展示文件基础信息，附带预览、单删、清空操作按钮
4. 预览弹窗：承载文件查看、缩放、翻页等操作面板
5. 底部备注区：标注支持的文件格式范围

## 核心功能
1. 文件上传：支持多文件上传，校验文件格式与大小，异常状态弹窗提示，可单独删除、批量清空文件
2. 格式预览：兼容图片、PDF、TXT、Word、Excel主流格式，图片支持缩放，PDF支持翻页缩放，文档正常排版展示
3. 预览操作：缩放调节、尺寸重置、关闭预览，移动端适配手势缩放交互
4. 状态管理：借助Pinia统一管控文件列表、预览状态、页面交互数据

## UI设计规范
整体扁平化设计，无繁杂装饰特效；搭配清爽商务色系，Element Plus组件与Tailwind样式混用协调统一；页面过渡动画简洁流畅；布局自适应不同屏幕尺寸，移动端控件尺寸适配触控操作

## 代码编写规范
1. 全程TS编写，完善类型接口定义，规避any类型
2. 按业务拆分独立组件，代码层级清晰、注释规范
3. 组件优先使用Element Plus基础组件，样式复用Tailwind原子类
4. Pinia拆分仓库管理全局状态，逻辑解耦易维护
5. 项目可正常编译启动，无代码报错、依赖缺失问题

## 交付内容
输出完整可运行项目源码，包含项目目录结构、配置文件、依赖清单、业务组件、状态仓库、类型文件，附带依赖安装与项目启动指令

## 快速开始

```bash
# 安装依赖
npm install

# 本地开发
npm run dev

# 生产构建
npm run build

# 预览构建产物
npm run preview
```

开发服务器默认地址：`http://localhost:5173`

## Zeabur 部署

项目已包含 `zbpack.json`，Zeabur 会执行 `npm run build` 并将 `dist` 目录作为静态站点发布。

### 部署后页面未更新的常见原因

1. **代码未推送到 Git 仓库**  
   Zeabur 从 GitHub/GitLab 拉取代码构建。请确认已将本地最新修改 `commit` 并 `push` 到绑定的远程仓库。

2. **未触发重新构建**  
   在 Zeabur 控制台对服务执行 **Redeploy（重新部署）**，并查看构建日志中 `output_dir` 是否为 `dist`。

3. **浏览器缓存了旧的 index.html**  
   已配置 `public/_headers`：`index.html` 不缓存，带 hash 的 JS/CSS 可长期缓存。部署后请 **强制刷新**（Ctrl+F5）或清除站点缓存后再访问。

4. **环境变量（可选）**  
   若自动识别失败，可在 Zeabur 服务中设置：
   - `ZBPACK_BUILD_COMMAND=npm run build`
   - `ZBPACK_OUTPUT_DIR=dist`

### 验证是否部署成功

打开线上地址 → 浏览器开发者工具 → Network → 刷新页面，检查加载的 `index-*.js` 文件名是否与本地 `dist/index.html` 中引用的一致。

### 报错：npm 任务检测: 无法分析文件 package.json

常见原因与处理：

1. **Git 仓库根目录没有 `package.json`**（或文件为空、未提交）  
   在 GitHub 网页确认仓库根目录存在完整 `package.json`，且与 `src/`、`zbpack.json` 同级。

2. **Zeabur 根目录配置错误**  
   服务设置中「Root Directory」留空或填 `.`，不要指向子目录。

3. **未提交 `package-lock.json`**  
   执行 `npm install` 后一并提交 `package-lock.json`，Zeabur 使用 `npm ci` 安装依赖。

4. **重新推送后 Redeploy**  
   ```bash
   git add package.json package-lock.json zbpack.json
   git commit -m "fix: 修复 Zeabur package.json 检测"
   git push
   ```