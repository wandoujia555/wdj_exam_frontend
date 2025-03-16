import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
//@ts-ignore
import { createWeGlobalConfig, WeToolbar, WeEditable, WeEditor } from 'wangeditor5-for-vue3'
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import i18n from "./locales";
import { initScheme } from "./action/index";
import { isLogin } from "./action/index";
import { router } from "./utils/router";
import "element-plus/theme-chalk/dark/css-vars.css";
import { useFormItem } from 'element-plus'

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

initScheme();

const app = createApp(App) as any;
router.beforeEach((to, _, next) => {
  if (to.name != "Login" && !isLogin.value) {
    router.push({ path: "/Login" });
  }
  next();
});

app.use(router);
app.use(i18n);
app.use(ElementPlus);
// app.use(WeToolbar);
// app.use(WeEditable);
// app.use(WeEditor);
// Vue.component('QuillEditor', VueQuill.QuillEditor);

app.component('QuillEditor', QuillEditor)

app.mount("#app");
function debugWarn(reason: any): PromiseLike<never> {
    throw new Error("Function not implemented.");
}

