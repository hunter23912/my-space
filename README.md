# 我的空间

## vue 框架学习

### vue 文件特性

`html`,`js`,`css`三个部分在一起

### 父子组件信息传递

- 父->子: props
- 子->父: emit

## my space 页面结构

- `navbar`
- content:
  - 首页
  - 好友列表
  - 好友动态
  - 登录
  - 注册
  - 404

## 非对称加密

用于加密通信：公钥加密，私钥解密。HTTPS 通信
用于身份验证和数据完整性校验：私钥签名，公钥验证。如 JWT,SSH

## 解决 CORS 问题

- 测试接口

```shell
curl -i -X POST https://app165.acapp.acwing.com.cn/api/token -H "Origin: http://localhost:5173" -H "Content-Type: application/json" -d '{"username":"123","password":"123"}'
```

- 给 vite 服务器添加代理配置

```js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      "/api": {
        target: "https://app165.acapp.acwing.com.cn",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
```

注意，需要修改`changeOrigin: true`才行，否则会出现 500 错误
