<script setup lang="ts">
import { ref } from 'vue';
import { login } from '../api';
import { Avatar } from '@element-plus/icons-vue'
// import { ref } from 'vue'
// import ChangeI18n from './gloabl/ChangeI18n.vue'

defineProps<{ msg: string }>()
function sendLogin() {
  login({ code: 2, password: '123' })
}

function sendSubmit() {
  postData("http://127.0.0.1:8088/submit", { code: '42', password: '213' }).then((data) => {
    console.log(data); // JSON data parsed by `data.json()` call
    // localStorage.setItem("token",data.token)
  });
}

async function postData(url = "", data = {}) {
  let token = localStorage.getItem('token');
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    // mode: "cors", // no-cors, *cors, same-origin
    // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: "same-origin", // include, *same-origin, omit
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    // redirect: "follow", // manual, *follow, error
    // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data)
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
// const count = ref(0)


import type { TabsPaneContext } from 'element-plus'

const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
import type { TabsInstance } from 'element-plus'
const tabPosition = ref('stu')
const input = ref('')
</script>

<template>

  <div class="content-wrap">
    <!--  v-bind:class="['main']" -->
    <div class="content-top">这是一行字</div>
    <div class="content">
      <div>用户登录</div>
      <el-radio-group v-model="tabPosition">
        <el-radio-button value="stu">学生</el-radio-button>
        <el-radio-button value="tea">教师</el-radio-button>
      </el-radio-group>
      <el-input class="input" v-model="input" size="large" placeholder="Please Input" :prefix-icon="Avatar" />
      <el-input class="input" v-model="input" size="large" placeholder="Please Input" :prefix-icon="Avatar" />
      <div class="captcha-wrap">
        <el-input class="captcha" v-model="input" size="large" placeholder="Please Input" :prefix-icon="Avatar" />
        验证码
      </div>
      <div class="content-bottom">
        还没有账号? 立即注册
      </div>
    </div>
    <div class="content-bottom">这是一行字</div>
  </div>
  <!-- <button @click="sendLogin">发送请求</button>
  <button @click="sendSubmit">发送请求submit</button> -->
  <!-- <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p> -->
</template>

<style scoped lang="less">
.content {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  width: 25rem;
  gap: 1.625rem;
  align-items: center;
  border-radius: .5rem;
  background-color: var(--v-block-1);
  box-shadow: var(--el-box-shadow);
  color: var(--el-text-color-primary);
  &-wrap {
    padding: 2.375rem 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  &-top {
    font-size: 30px;
    font-weight: bold;
    color: var(--el-text-color-primary);
  }
  .input {
    width: 18.75rem;
  }
  .captcha {
    flex: 1;
    margin-right: 26px;

    &-wrap {
      display: flex;
      align-items: center;
      width: 18.75rem;
      margin-top: .625rem;
    }
  }
}

.read-the-docs {
  color: #888;
}
</style>
