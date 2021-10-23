# serverless-nuxt3-template

serverless-nuxt3-template

`npx nuxi init nuxt3-app`

出现初始化失败，可以直接去 [https://github.com/nuxt/starter/tree/v3](https://github.com/nuxt/starter/tree/v3) 下载

## Alias

```js
import { ... } from '#app'

```

'#app' = "node_modules/nuxt3/dist/app"

## components

Nuxt automatically imports any components in your components/ directory

这个就有点 uni-app easycom 那味了

实际上是继承自 nuxt2中的 `@nuxt/components` 

## composables 

新加的文件夹，类似于 `hooks`
## pages

动态路由，抛弃了原先那种 _xx 的用法，命名变得和 next 类似了

## plugins

All plugins in your plugins/ directory are auto-registered, so you should not add them to your nuxt.config separately.

自动注册了,照理说这时候要进行 `.ts/.client.ts/.server.ts` 的区分了。
## server

`h3` 是 `nuxt3` 内置的一个轻量级框架

`h3` 看代码和用法，就像一个 用 ts 重写的现代版 `connect` (目前只到 `0.3.3`版本)

所以他也能兼容 `connect/express` middleware(生态好)

列出它几个特性吧:

✔️  Portable: Works perfectly in Serverless, Workers, and Node.js

✔️  Compatible: Support connect/express middleware

✔️  Minimal: Small, tree-shakable and zero-dependency

✔️  Modern: Native promise support

✔️  Extendable: Ships with a set of composable utilities but can be extended
## 参考源码

https://github.com/nuxt/framework/blob/main/packages/nuxi/src/commands/init.ts

```js
const knownTemplates = {
  nuxt3: 'nuxt/starter#v3',
  v3: 'nuxt/starter#v3',
  bridge: 'nuxt/starter#bridge'
}
```
