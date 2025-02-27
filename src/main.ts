import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import i18n from './locales'
import {initScheme} from './action/index'
import {isLogin} from './action/index'
import { router } from "./utils/router";
initScheme()

const app = createApp(App) as any;
router.beforeEach((to, _, next) => {
    if(to.name!='Login'&&!isLogin.value){
        router.push({ path: '/Login', });
    }
    next();
});

app.use(router)
app.use(i18n)
app.use(ElementPlus);
app.mount("#app");
