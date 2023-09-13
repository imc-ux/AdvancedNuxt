// import * as ElementPlus from 'element-plus/dist/index.full';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import { ID_INJECTION_KEY } from 'element-plus';

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.provide(ID_INJECTION_KEY, {
    prefix: Math.floor(Math.random() * 10000),
    current: 0,
    locale: zhCn,
  });
  // nuxtApp.vueApp.use(ElementPlus, {
  //   locale: zhCn,
  // });
});
// element-plus.client.js;
