<script setup lang="ts">
import { RouterView } from 'vue-router';
import { ref, watch } from 'vue'
import { color_scheme } from './action';
import { ElMessage } from 'element-plus'

const activeIndex = ref('1')

const scheme = ref(color_scheme.value == 'dark')

watch(scheme, (newValue, _) => {
  color_scheme.value = newValue ? 'dark' : 'light'
})

const handleCommand = (command: string | number | object) => {
  ElMessage(`click on item ${command}`)
}

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

</script>

<template>
  <div class="content-bg">
    <navigation v-if="!$route.meta.hideNav">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
        @select="handleSelect">
        <el-menu-item index="0">
          <!-- <img style="width: 100px" src="/images/element-plus-logo.svg" alt="Element logo" /> -->
        </el-menu-item>
        <el-menu-item index="1">Processing Center</el-menu-item>
        <el-sub-menu index="2">
          <template #title>Workspace</template>
          <el-menu-item index="2-1">item one</el-menu-item>
          <el-menu-item index="2-2">item two</el-menu-item>
          <el-menu-item index="2-3">item three</el-menu-item>
        </el-sub-menu>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            Dropdown List<el-icon class="el-icon--right"><arrow-down /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="a">Action 1</el-dropdown-item>
              <el-dropdown-item command="b">Action 2</el-dropdown-item>
              <el-dropdown-item command="c">Action 3</el-dropdown-item>
              <!-- <el-dropdown-item command="d" disabled>Action 4</el-dropdown-item> -->
              <!-- <el-dropdown-item command="e" divided>Action 5</el-dropdown-item> -->
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <div class="button-scheme">
          <el-switch v-model="scheme" />
        </div>
      </el-menu>
    </navigation>
    <RouterView></RouterView>
  </div>
</template>

<style scoped>
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

.el-dropdown-link {
  outline: none;
  margin-right: 1rem;
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

.el-menu--horizontal>.el-menu-item:nth-child(1) {
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
