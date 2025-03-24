<script setup lang="ts">
import { ref } from "vue";
import { login } from "../api";
import { Avatar } from "@element-plus/icons-vue";
// import { ref } from 'vue'
// import ChangeI18n from './gloabl/ChangeI18n.vue'

defineProps<{ msg: string }>();

function sendSubmit() {
  postData("http://127.0.0.1:8088/submit", {
    code: "42",
    password: "213",
  }).then((data) => {
    console.log(data); // JSON data parsed by `data.json()` call
    // localStorage.setItem("token",data.token)
  });
}

async function postData(url = "", data = {}) {
  let token = localStorage.getItem("token");
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
    body: JSON.stringify(data),
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
// const count = ref(0)

import { ElMessage, type TabsPaneContext } from "element-plus";

const activeName = ref("first");

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
import type { TabsInstance } from "element-plus";
import { jumpUrl } from "../utils/router";
import { isLogin } from "../action";
const tabPosition = ref("stu");
const input = ref("");
const input_code = ref("");
const input_password = ref("");

function handleEdit(e: string) {
  let value = e.replace(/[^\d]/g, ""); // 只能输入数字
  value = value.replace(/^0+(\d)/, "$1"); // 第一位0开头，0后面为数字，则过滤掉，取后面的数字
  value = value.replace(/(\d{15})\d*/, "$1"); // 最多保留15位整数
  input_code.value = value;
}

function sendLogin() {
  let code = parseInt(input_code.value);
  let password = input_password.value;
  console.log(tabPosition.value, tabPosition.value == "tea" ? 1 : 0);
  login({
    code: code,
    password: password,
    login_type: tabPosition.value == "tea" ? 1 : 0,
  })
    .then((data) => {
      if (data) {
        isLogin.value = true;
        ElMessage({
          message: "登陆成功",
          type: "success",
        });
        jumpUrl("/index");
      }
    })
    .catch((err) => {
      ElMessage.error("用户名或密码错误！");
    });
}
</script>

<template>
  <div class="content-wrap">
    <!--  v-bind:class="['main']" -->
    <div class="content-top">考试系统</div>
    <div class="content">
      <div>用户登录</div>
      <el-radio-group v-model="tabPosition">
        <el-radio-button value="stu">学生</el-radio-button>
        <el-radio-button value="tea">教师</el-radio-button>
      </el-radio-group>
      <el-input
        class="input"
        @input="handleEdit"
        v-model="input_code"
        size="large"
        placeholder="Please Input"
        :prefix-icon="Avatar"
      />
      <el-input
        class="input"
        show-password
        type="password"
        v-model="input_password"
        size="large"
        placeholder="Please Input"
        :prefix-icon="Avatar"
      />
      <!-- <div class="captcha-wrap">
        <el-input
          class="captcha"
          v-model="input"
          size="large"
          placeholder="Please Input"
          :prefix-icon="Avatar"
        />
        验证码
      </div> -->
      <el-button class="login-button" @click="sendLogin" type="primary"
        >登录</el-button
      >
      <div class="content-bottom">还没有账号? 立即注册</div>
    </div>
    <div class="content-bottom"></div>
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
  border-radius: 0.5rem;
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
    outline: none;
  }

  .login-button {
    height: 2.25rem;
    line-height: 2.25rem;
    // padding: 1.125rem 0;
    width: 18.75rem;
  }

  .captcha {
    flex: 1;
    margin-right: 26px;

    &-wrap {
      display: flex;
      align-items: center;
      width: 18.75rem;
      margin-top: 0.625rem;
    }
  }
}

.read-the-docs {
  color: #888;
}
</style>
<style>
input:-internal-autofill-selected {
  -webkit-text-fill-color: #ffffff !important;
  transition: background-color 5000s ease-in-out 0s !important;
}
</style>
