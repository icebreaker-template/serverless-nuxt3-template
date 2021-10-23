# serverless-nuxt3-template

serverless-nuxt3-template

`npx nuxi init nuxt3-app`

出现初始化失败，可以直接去 [https://github.com/nuxt/starter/tree/v3](https://github.com/nuxt/starter/tree/v3) 下载

## Alias

```js
import { ... } from '#app'

```

'#app' = "node_modules/nuxt3/dist/app"

## Pages

变量路由的命名变得和 next 类似了
## 参考源码

https://github.com/nuxt/framework/blob/main/packages/nuxi/src/commands/init.ts

```js
const knownTemplates = {
  nuxt3: 'nuxt/starter#v3',
  v3: 'nuxt/starter#v3',
  bridge: 'nuxt/starter#bridge'
}
```
