<h1 align="center">Cusys based on Nuxt</h1>

> Construction

[![nuxt v3.3.2](https://img.shields.io/badge/nuxt-v3.3.2-00DC82.svg)](https://nuxt.com/)
[![pinia/nuxt v0.4.8](https://img.shields.io/badge/pinia/nuxt-v0.4.8-FFD859.svg)](https://pinia.vuejs.org/)

> Component

[![element-plus v2.3.2](https://img.shields.io/badge/element--plus-v2.3.2-409EFF.svg)](https://element-plus.org/zh-CN/component/button.html)
[![ej2-vue-ui-components v22.1.36](https://img.shields.io/badge/ej2--vue--ui--components-v22.1.36-FFF.svg)](https://ej2.syncfusion.com/vue/documentation/)
[![vue-quill v1.1.1](https://img.shields.io/badge/vue--quill-v1.1.1-2C3E50.svg)](https://github.com/vueup/vue-quill)


## Introduction

此 Nuxt3 项目用于开发 UX 系统 管理(任务管理)目录下 统计管理、菜单设置页面。

## Table of Contents

- [Technologies](#technologies)
- [Code Formatter](#code-formatter)
- [Development](#development)
  - [菜单设置](http://127.0.0.1:8011/cusys/nuxt/settings/)
  - [统计管理](http://127.0.0.1:8011/cusys/nuxt/analysis/)
- [Production](#production)
- [Links](#)

## Technologies

AdvancedNuxt uses the following technologies:

- [Nuxt3](https://v3.nuxtjs.org) as the Vue framework.
- [Pinia](https://pinia.vuejs.org/) for state management in Vue.
- [TypeScript](https://www.typescriptlang.org) for type safety.

## Code Formatter

- [Prettier](https://prettier.io)
- [Eslint](https://eslint.org)

## Development

clone this repository

```bash
git clone git@github.com:imc-ux/AdvancedNuxt.git
```

install dependencies

```bash
npm install
```

local development

```bash
npm run dev
```

Start the development server on [http://127.0.0.1:8011/cusys/nuxt/](http://127.0.0.1:8011/cusys/nuxt/)

The pages are generated from pages/

#### 菜单设置: [http://127.0.0.1:8011/cusys/nuxt/settings/](http://127.0.0.1:8011/cusys/nuxt/settings/)

#### 统计管理: [http://127.0.0.1:8011/cusys/nuxt/analysis/](http://127.0.0.1:8011/cusys/nuxt/analysis/)

## Production

### Build the application for production

打包之前，先配置好 nuxt.config.ts 文件。

```ts
  # nuxt.config.ts
  export default defineNuxtConfig({
    app: {
      baseURL: '/cusys/nuxt/', // 配置一个绝对地址，指向资源存放目录
      buildAssetsDir: '/static/',
    },
  })
```

generate: 构建应用程序并生成每个路径作为 HTML 文件。

```
npm run generate
```

生成.output， .output/public/文件夹下内容上传服务器。

使用 generate 打包后每个对应的页面都会生成一个 html，打包的时候不能关闭后台，它会请求后台数据生成首屏的数据。

[Go to Top](#table-of-contents)
