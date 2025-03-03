import { ref, watch } from "vue";
import { router } from "../utils/router";

let temp_scheme = localStorage.getItem("prefers-color-scheme")
export const color_scheme = ref(temp_scheme ?? 'light')

export function initScheme(){
  if(!temp_scheme) {
    try {
      let mqList = window.matchMedia('(prefers-color-scheme: dark)');
      color_scheme.value = mqList.matches ? 'dark' : 'light';
      mqList.addEventListener('change', (event) => {
        color_scheme.value = event.matches ? 'dark' : 'light';
      });
    } catch {
      color_scheme.value = 'light';
    }
  }
  
  document.documentElement.setAttribute('class', color_scheme.value);
  localStorage.setItem("prefers-color-scheme", color_scheme.value);
  
  watch(color_scheme,(newValue, _) => {
    document.documentElement.setAttribute('class', newValue);
    localStorage.setItem("prefers-color-scheme", newValue);
  })
  
}

export const isLogin = ref(localStorage.getItem("isLogin")=='true')
// 验证是否登陆过
watch(isLogin,(newValue, _)=>{
  localStorage.setItem("isLogin",String(newValue))
  if(!newValue){
    router.push('/login')
  }
})

// 用户名
export const user_name = ref(localStorage.getItem("user_name"))
watch(user_name,(newValue, _)=>{
  if(newValue)
    localStorage.setItem("user_name",newValue)
})

// 用户号码
export const user_code = ref<number>(Number(localStorage.getItem("user_code")))
watch(user_code,(newValue, _)=>{
  if(newValue)
    localStorage.setItem("user_code",String(newValue))
})