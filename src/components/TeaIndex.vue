<template>
  <div class="min-h-screen bg-gray-50">
    <el-table class="table" :data="exams" style="width: 1200px">

      <el-table-column label="考试名称" prop="name" />
      <el-table-column label="考试时间" prop="start_time" width="240">
        <template #default="scope">
          {{ exam_time(scope.row.start_time * 1000, scope.row.end_time * 1000) }}
        </template>
      </el-table-column>
      <!-- <el-table-column label="参考人数" prop="students" width="100" /> -->
      <!-- <el-table-column label="平均分" prop="avgScore" width="100" /> -->
      <el-table-column label="状态" width="100">
        <template #default="scope">
          <el-tag :type="scope.row.status === 2 ? 'info' : 'success'">
            {{ scope.row.status == 2 ? '结束': '进行中' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button type="primary" size="small" class="!rounded-button whitespace-nowrap"
            @click="viewDetail(scope.row)">
            查看详情
          </el-button>
          <!-- <el-button type="success" size="small" class="!rounded-button whitespace-nowrap"
            @click="exportScore(scope.row)">
            导出成绩
          </el-button> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { forma_data, forma_data_day } from '../utils';
import { jumpUrl } from '../utils/router';
import { getPaperList, type PaperInfo } from '../api/paper';
const date_now = new Date();

// 获取系统公告
interface Announced {
  title: string,
  text: string,
  createTime: number,
}
const exams = ref<PaperInfo[]>([])

const exams_future = computed(() => {
  return exams.value.filter(value => value.start_time > date_now.getTime())
})

const exam_time = (start_time: number, end_time: number): string => {
  let [start_day, start_hour] = forma_data(new Date(start_time)).toString().split(' ')
  let [end_day, end_hour] = forma_data(new Date(end_time)).toString().split(' ')

  return `${start_day} ${start_hour}  -  ${start_day == end_day ? '' : end_day} ${end_hour}`
}
getPaperList(2).then((data) => {
  exams.value = data
  console.log('data', data)
})



function viewDetail (data:any){
  jumpUrl('./AnswerList',{id:data.id})
}

</script>
<style scoped>
.min-h-screen {
  width: 100%;
}

.el-menu {
  border-right: none;
}
</style>