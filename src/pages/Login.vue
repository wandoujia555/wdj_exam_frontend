<script setup lang="ts">
// import { ref } from 'vue'
// import ChangeI18n from './gloabl/ChangeI18n.vue'

defineProps<{ msg: string }>()
function sendLogin() {


  postData("http://127.0.0.1:8088/login", { code: '42', password: '213' }).then((data) => {
    console.log(data); // JSON data parsed by `data.json()` call
    localStorage.setItem("token",data.token)
  });

  
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
</script>

<template>
  asdasdasd
  <button @click="sendLogin">发送请求</button>
  <button @click="sendSubmit">发送请求submit</button>
  
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped lang="less">
.read-the-docs {
  color: #888;
}
</style>
