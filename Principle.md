# Nuxt3 & Serverless 尝鲜之旅

## 前言

`Nuxt3` 这个月刚出没多久，目前还在 `beta` 阶段，难以上生产环境。官方也推荐我们的 `Nuxt2` 项目，先迁移到 `Nuxt Bridge` 来进行一个平滑的过渡。

不过我们还是有必要预先体会一下 `Nuxt3` 与 `Nuxt2` 之间的异同点，来为我们的项目预先累积一些迁移知识。

## Quick Start

执行命令: `npx nuxi init nuxt3-app`

> Nodejs 版本最低为 ^14(LTS) , 国内有可能出现初始化失败，可以直接去 [https://github.com/nuxt/starter/tree/v3](https://github.com/nuxt/starter/tree/v3) 下载模板。

## Usage

除了 `vue3` 那些用法之外，可以看到 `nuxt3` 文档中广泛使用了 `setup` 的用法。同时对 `ts` 的支持也更好了。

同时以 `别名(Alias)` 为例:

```json
"#app": [
  "node_modules/nuxt3/dist/app"
],
"#app/*": [
  "node_modules/nuxt3/dist/app/*"
],
"#meta": [
  "node_modules/nuxt3/dist/meta/runtime"
],
"#meta/*": [
  "node_modules/nuxt3/dist/meta/runtime/*"
],
"#build": [
  ".nuxt"
],
"#build/*": [
  ".nuxt/*"
]
```

这样在我们的代码里，会出现许多的 `import { ... } from '#app'`，相比于直接 `import { ... } from 'vue'` ，这种的思路还是很值得我们学习的，依靠这种方法，即封装了那些原始的底层 API，同时也保障了一定的开发体验。

## Directory structure

接下来简单介绍一些目录上的变更，还有和 `Nuxt2` 的异同点:

### components

> `Nuxt automatically imports any components in your components/ directory`

`Nuxt3` 会自动导入在 `components` 目录里的组件，这个就有点 `uni-app` 的 `easycom` 那味了。

实际是继承自 `Nuxt2` 中的 `@nuxt/components` , 扫描代码中出现的组件来达到 `build` 时的一种 `"Tree Shaking"`。

### composables

这个在`Nuxt2`没有，是 `3` 新加的文件夹，类似于我们写 `react` 时存放的一些公共 `hooks` ，值得注意的是这个文件夹也是全局 **`自动导入`** 的。

### pages

`pages` 这一块大抵和原先类似，不过值得注意的是，`动态路由(Dynamic Routes)`有变化 ，它抛弃了原先那种 `\_xxx` 变量的用法，命名变得和 `nextjs` 类似了。

### plugins

`plugins` 改动最大的地方，就是它无需在 `nuxt.config.[ts/js]` 中手动注册了，只要放在这个目录里的，都会进行 `自动注册(auto-registered)`。

照理说，按照之前 `Nuxt2` 的思路，这时候要进行插件的运行时区分，就要手动命名为 `.ts/.client.ts/.server.ts` ，以此来代表 `runtime: all/client-only/server-only` 了，目前这块文档没有提及，可能目前走的还是条件编译的路子，即 `process.server`,`process.client` 加代码分支的路子。

### server

`server` 这个文件夹，有点像原先 `serverMiddleware` 的用法，里面存放着一些 `服务端中间件` 还有 `API endpoints`。

这里有一点值得一说：

`Nuxt2` 使用 `connect` 作为内置的 `server` 框架

`Nuxt3` 使用 `h3` 来取代了 `connect`, `h3` 是 `Nuxt`团队编写的一个
轻量级框架，拥有许多的改进，比如高可移植性，可以完美的工作在 `Serverless` , `Workers` ,`Node.js` 这些运行环境里。

同时它也能兼容 `connect/express` 这类的中间件，从而利用他们的现有生态。

笔者粗略的看了一下代码，发现它就像一个用 `ts` 重写的现代版 `connect` (version `0.3.3`版本)

### 设计理念

这么多自动导入的目录，感觉设计上一直在为 `vue3 setup` 的语法服务。

可以预料到，相比 `Nuxt2` ，`3` 的开发体验，应该会变得 `"很直接"`。

同时它做了大量的优化，写了一个 Server Engine named `Nitro`，这个就很厉害，它也是 `跨平台(Cross-platform)` 且 `Serverless` 友好的。

看了它在服务端这块，对 `Serverless` 优化了如此之多，笔者不得不使用 `Serverless` 去部署一番，亲身体会一下这些改进了。

## Serverless Deployment

这里演示一下，部署到腾讯云 `SCF` 的流程

准备工具: `Docker`,`Serverless Framework`

### Q: 为什么要用 `Docker`？ 

A: 因为目前腾讯云的 `Nodejs` 版本只能支持到 `12.16`，而 `Nuxt3` 最低的要求版本为 `14`。所以这时候我们必须去自定义运行时环境，来提升 `Nodejs` 的版本，于是就需要用到自定义镜像部署这个功能。

## 镜像上传到个人私有仓库

准备一份简单的 `Dockerfile`:

```dockerfile
FROM node:14-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json yarn.lock /usr/src/app/

RUN yarn --prod

COPY ./.output /usr/src/app/.output

EXPOSE 9000

ENTRYPOINT ["yarn" ,"start"]
```

> 其中 yarn start 指令为，nuxt3 build 后 ，node 对 `0.0.0.0:9000` 端口的监听

把镜像打出来之后，再 `push` 到腾讯云的个人私有仓库里，然后把 `IMAGE_URI` 拼接出来，作为 `serverless.yml` 的配置。

比如说我的公开的镜像地址为:

`ccr.ccs.tencentyun.com/tcb-100006794960-iuit/web-ssr-nuxt3-scf-demo:v1.0.1@sha256:1b29d131966f5278d35ef406dfcf9dc8acd07db04c4409494e8d55fd1dcac248`

接着，再使用 `serverless framework` 的 `components deploy` 指令，一键式镜像部署到 `SCF` ，我们的 `Nuxt3` 应用，就成功的部署到了公网上。

为此，笔者也写了一个腾讯云部署的 `Nuxt3` 模板：

[https://github.com/sonofmagic/serverless-nuxt3-template](https://github.com/sonofmagic/serverless-nuxt3-template)

有兴趣的，可以参照文章进行部署，或者直接拉取笔者的公有镜像进行部署，都是可以的。

## 尾言

`Nuxt3` 在 `vue3` 出来将近 **1年半** 之后 ，姗姗来迟，还是很惊喜的，祝愿它也能达到 `nextjs`的高度，未来可期。



