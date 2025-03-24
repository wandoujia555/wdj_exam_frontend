<script setup lang="ts">
import { RouterView } from "vue-router";
import { reactive, ref, watch } from "vue";
import {
  color_scheme,
  user_code,
  user_name,
  isLogin,
  user_type,
} from "./action";
import { ElMessage } from "element-plus";
import { jumpUrl } from "./utils/router";
import { EventBus } from './action';

const activeIndex = ref("1");

const scheme = ref(color_scheme.value == "dark");

watch(scheme, (newValue, _) => {
  color_scheme.value = newValue ? "dark" : "light";
});

const handleCommand = (command: string | number | object) => {
  if (command == "a") {
    user_code.value = undefined as any;
    user_name.value = undefined as any;
    isLogin.value = undefined as any;
    user_type.value = undefined as any;
    jumpUrl("./login").then(() => {
      ElMessage(`退出登录成功`);
    });
  }else if(command == "export"){
    EventBus.emit('export', { message: 'Hello from Component A!' });
  }
};

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

const font = reactive({
  color: "rgba(0, 0, 0, .15)",
});

watch(
  color_scheme,
  () => {
    font.color =
      color_scheme.value == "dark"
        ? "rgba(0, 0, 0, 0.3)"
        : "rgba(0, 0, 0, .15)";
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <div class="content-bg">
    <!-- v-if="!$route.meta.hideNav" -->
    <navigation v-if="!$route.meta.hideNav">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
      >
        <div class="logo">logo</div>
        <el-menu-item index="0" v-if="!$route.meta.hideInfo">首页</el-menu-item>
        <!-- <el-menu-item index="1" v-if="!$route.meta.hideInfo">历史考试</el-menu-item>
         -->
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link"> 操作 </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="a">退出登录</el-dropdown-item>
              <el-dropdown-item v-if="$route.meta.export" command="export">导出</el-dropdown-item>
              <!-- <el-dropdown-item command="b">Action 2</el-dropdown-item>
              <el-dropdown-item command="c">Action 3</el-dropdown-item> -->
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <div class="button-scheme">
          <el-switch v-model="scheme" />
        </div>
      </el-menu>
    </navigation>
    <el-watermark
      :font="font"
      class="content-bg-watermark"
      :content="[user_name, user_code ? user_code : '']"
    >
      <div class="content">
        <RouterView></RouterView>
      </div>
    </el-watermark>
    <!--  v-if="!$route.meta.hideNav" -->
  </div>
</template>

<style scoped lang="less">
.content {
  width: 100%;
  display: flex;
}
.content-bg {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: var(--el-color-info-light-8);
  /* background-color: var(--el-bg-color-page); */
  /* background-color: var(--el-bg-color); */
  margin: 0;
  min-height: 100vh;
}

.content-bg-watermark {
  display: flex;
  flex: 1;
}

.el-dropdown-link {
  outline: none;
  margin: 0 1rem;
  height: 100%;
  display: flex;
  align-items: center;
}

.button-scheme {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 1rem;
}

.el-menu--horizontal > .logo {
  display: flex;
  align-items: center;
  margin-left: 1rem;
  margin-right: auto;
}

/* 
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
} */

/* .logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
} */
</style>
