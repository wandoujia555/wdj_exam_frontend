import { createRouter, createWebHistory } from "vue-router";
import routes from "virtual:generated-pages";
import Index from "../pages/Index.vue";
// import routes from '~pages'
routes.push({ path: "/", component: Index });
const hideNavs = ["/exam"];
const hideInfo = ["/login", "/exam"];
routes.forEach((item) => {
  if (hideNavs.includes(item.path)) {
    item.meta = {
      hideNav: true,
    };
  }
  if (hideInfo.includes(item.path)) {
    if (item.meta) {
      item.meta.hideInfo = true;
    } else {
      item.meta = {
        hideInfo: true,
      };
    }
  }
});
export const router = createRouter({
  history: createWebHistory(),
  routes,
});

export function jumpUrl(path: string, params?: Record<string, string>) {
  // console.log(buildUrlWithParams(path,params))
  router.push({ path, query: params });
}

function buildUrlWithParams(url: string, params?: Record<string, string>) {
  // 检查 params 是否为对象
  if (typeof params !== "object" || params === null) {
    return url;
  }
  // 将 params 转换为查询字符串
  const queryString = new URLSearchParams(params).toString();

  // 拼接 URL 和查询字符串
  const hasExistingQuery = url.includes("?");
  const separator = hasExistingQuery ? "&" : "?";

  return `${url}${separator}${queryString}`;
}
