import { createRouter, createWebHistory } from "vue-router";
import routes from "virtual:generated-pages"
import Index from "../pages/Index.vue";
// import routes from '~pages'
routes.push({ path: '/', component: Index })

export const router = createRouter({
    history: createWebHistory(),
    routes,
})