import { createRouter, createWebHistory } from "vue-router";
import routes from "virtual:generated-pages"
import Index from "../pages/Index.vue";
// import routes from '~pages'
routes.push({ path: '/', component: Index })
const hideNavs = ['/exam']
const hideInfo = ['/login','/exam']
routes.forEach(item => {
    if(hideNavs.includes(item.path)){
        item.meta = {
            hideNav: true
        }
    }
    if(hideInfo.includes(item.path)){
        if(item.meta){
            item.meta.hideInfo = true
        }else {
            item.meta = {
                hideInfo: true
            }
        }
    }
})
export const router = createRouter({
    history: createWebHistory(),
    routes,
})


export function jumpUrl(path:string){
    router.push({ path });
}