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

- `axios` 的 `delete` 方法只支持两个参数 `url` 和 `config`，请求体要放入 `config.data` 中

```js
axios.delete("https://app165.acapp.acwing.com.cn/myspace/post/", {
  data: form,
  headers: {
    Authorization: `Bearer ${userStore.access}`,
    "Content-Type": "application/x-www-form-urlencoded",
  },
});
```

- 一般的`post`建议`form`和`config`分开

```js
axios.post("https://app165.acapp.acwing.com.cn/myspace/post/", form, {
  headers: {
    Authorization: `Bearer ${userStore.access}`,
  },
});
```

- `axios`的`post`方法，固定三个参数`(url, body, config)`，所以第二个默认是`body`，

## 部署方式

```shell
pnpm build

# npm run build
```

打包后会生成`dist/`目录，里面就是可部署的静态文件
