<script setup lang="ts">
// @ts-ignore
import ExportExcel from "export-excel-js";
import { EventBus } from "../action";
import { ref, onMounted, onUnmounted } from "vue";
import { getAnswerInfoList } from "../api/paper";
import type { AnswerInfo } from "../api/paper";
import { jumpUrl } from "../utils/router";
import { useRoute } from "vue-router";
const route = useRoute();
const id = Array.isArray(route.query.id)
  ? Number(route.query.id[0])
  : Number(route.query.id);
const answerList = ref<AnswerInfo[]>();
getAnswerInfoList(id).then((reply) => {
  answerList.value = reply;
});

function handleCorrect(data: any) {
  jumpUrl("/Reprint", {
    user_id: data.user_id,
    paper_id: id.toString(),
    status: data.status,
  });
}

const exportExcel = () => {
  console.log(ExportExcel);
  const headers = ["ID", "姓名", "状态", "分数"];
  if (!answerList.value) return;
  const data = answerList.value.map((item) => [
    item.user_id,
    item.name,
    item.status == 0 ? "批改完成" : "批改中",
    item.score,
  ]);
  data.unshift(headers);
  ExportExcel.export2excel(data, `表格${id}数据`);
};

onMounted(() => {
  EventBus.on("export", exportExcel);
});

onUnmounted(() => {
  EventBus.off("export", exportExcel);
});
</script>
<template>
  <div class="wrapper">
    <div class="content">
      <el-table :data="answerList" style="width: 100%">
        <el-table-column prop="user_id" label="ID" width="80"></el-table-column>
        <el-table-column prop="name" label="Name"></el-table-column>
        <el-table-column label="Actions" width="150">
          <template #default="scope">
            <el-tag :type="scope.row.status == 0 ? 'info' : 'success'">
              {{ scope.row.status == 0 ? "批改完成" : "批改中" }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="score"
          label="Score"
          width="120"
        ></el-table-column>
        <el-table-column label="Actions" width="150">
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              @click="handleCorrect(scope.row)"
              >批改</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style scoped lang="less">
.wrapper {
  color: var(--el-text-color-primary);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  .content {
    width: 80%;
  }
}
</style>
