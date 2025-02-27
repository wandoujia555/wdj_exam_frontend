<template>
    <el-dropdown @command="handleSelect" :popup-max-height="false">
      <el-button>{{curLanguage == 'zh_CN' ? '中文': 'Endlish'}}<icon-down/></el-button>
      <template #dropdown>
        <el-dropdown-item command="zh_CN" :disabled="curLanguage == 'zh_CN'">中文</el-dropdown-item>
        <el-dropdown-item command="en_US" :disabled="curLanguage == 'en_US'">Endlish</el-dropdown-item>
      </template>
    </el-dropdown>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
// import { Message } from '@arco-design/web-vue';
import { computed } from "vue";

const i18n = useI18n()
//储存语种并进行切换
const handleSelect = (v:any) => {
  // console.log(v)
  localStorage.setItem('language',v)
  i18n.locale.value = v;
  // alert(v=='zhCn'?'当前语种为中文':'The current language is English')
};

// 计算当前语种
const curLanguage = computed(()=>{
  return i18n.locale.value
})

</script>
<style scoped>
.arco-btn{
  position: absolute;
  right: 10px;
  top: 5px;
}
.arco-dropdown-open .arco-icon-down {
  transform: rotate(180deg);
}
</style>