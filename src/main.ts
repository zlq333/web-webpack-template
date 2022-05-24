import { getBrowserType } from '@fe/utils';
window.browserType = getBrowserType();
if (window.browserType.indexOf('IE') > -1) {
  window.location.href = './static/browser.html'; // 不支持ie系列
}
import '@fe/extend';
import { createApp } from 'vue';

import router from './router';
import store from './store';
import { vHas, vAllow } from '@fe/directive';

import ElementPlus from 'element-plus';
import 'dayjs/locale/zh-cn';
import locale from 'element-plus/lib/locale/lang/zh-cn';

import FeComponents from '@fe/vue-component-library';
import '@fe/vue-component-library/lib/style/index.css';

import App from './App.vue';
import Layout from '@/components/Layout.vue';

const app = createApp(App);

app
  .use(ElementPlus, { locale, size: 'small' })
  .use(FeComponents)
  .use(router)
  .use(store);

app.component('layout', Layout);

// 注册自定义指令 判断权限
app.directive('has', vHas(store));
// 注册自定义指令 限制输入
app.directive('allow', vAllow());

app.mount('#app');
