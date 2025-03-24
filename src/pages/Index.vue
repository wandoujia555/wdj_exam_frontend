<script setup lang="ts">
import { computed, ref } from "vue";
import { forma_data, forma_data_day } from "../utils";
import { jumpUrl } from "../utils/router";
import {
  getPaperList,
  getPaperUser,
  setPaperUser,
  type PaperInfo,
} from "../api/paper";
import { user_code, user_type } from "../action";
import TeaIndex from "../components/TeaIndex.vue";
import { ElMessage } from "element-plus";

// import { ref } from 'vue'
// import ChangeI18n from './gloabl/ChangeI18n.vue'
const date_now = new Date();

// 获取系统公告
interface Announced {
  title: string;
  text: string;
  createTime: number;
}

const announceds: Announced[] = [
  {
    title: "系统维护中",
    text: "1742710771000",
    createTime: 1742710771000,
  },
  {
    title: "系统更新",
    text: "1742710771000",
    createTime: 1742710771000,
  },
  {
    title: "系统构建",
    text: "1742710771000",
    createTime: 1742710771000,
  },
  {
    title: "考试正在构建",
    text: "1742710771000",
    createTime: 1742710771000,
  },
];

// 获取当前考试
// interface Exam {
//   status?:number,//1代表即将进行,2代表已完成,3代表
//   name: string,
//   start_time: number,
//   end_time: number,
//   created_time:number,
//   desc: string,
//   invigilator: string[],
// }

const exams = ref<PaperInfo[]>([]);

const exams_future = computed(() => {
  return exams.value.filter(
    (value) => value.status == 2
  );
});
const now_future = computed(() => {
  return exams.value.filter((item) => item.status != 2);
});

const exam_time = (start_time: number, end_time: number): string => {
  let [start_day, start_hour] = forma_data(new Date(start_time))
    .toString()
    .split(" ");
  let [end_day, end_hour] = forma_data(new Date(end_time))
    .toString()
    .split(" ");

  return `${start_day} ${start_hour}  -  ${
    start_day == end_day ? "" : end_day
  } ${end_hour}`;
};
getPaperList(2).then((data) => {
  exams.value = data;
  console.log("data", data);
});

function getPaperUserHandler(o:any) {
  let paper_id = o.id 
  let user_id = user_code.value
  getPaperUser({ user_id: user_id, paper_id: paper_id }).then((data) => {
    if (data.paper_user_status == 0) {
      // 已经交卷,考试已结束
      ElMessage({
        message: "已经交卷,考试已结束",
        type: "warning",
      });
      return
    } else if (data.status == 0) {
      // 还没开始
      ElMessage("考试还没开始,请耐心等待");
      return
    } else if (data.status == 2) {
      // 结束了
      // 还没开始
      ElMessage("考试已经结束");
      return
    } else if (data.status == 1) {
      jumpUrl("./exam", { id: `${o.id}` });
      return
    }
    jumpUrl("./exam", { id: `${o.id}` });
  });
}
</script>

<template>
  <div class="content-wrap">
    <div class="content" v-if="user_type == 0">
      <div class="content-item-title">当前考试</div>
      <div class="content-item exams">
        <el-card
          v-if="now_future.length != 0"
          class="exams-item"
          v-for="(o, index) in now_future"
          :key="index"
        >
          <template #header>
            <div class="card-header">
              <span>考试公告</span>
            </div>
          </template>
          <div class="exams-item-title item-info">
            {{ o.name }}
          </div>
          <div class="exams-item-time item-info small-info">
            时间: {{ exam_time(o.start_time * 1000, o.end_time * 1000) }}
          </div>
          <div class="exams-item-location item-info small-info">
            描述: {{ o.desc }}
          </div>
          <!-- <div class="item-info small-info">
            监考老师:
            <span v-for="invi in o.invigilator">
              &#32;{{ `${invi}` }}&#12288;
            </span>
          </div> -->
          <el-button class="item-info exam-button" @click="() => {getPaperUserHandler(o)}"
            >进入考试</el-button
          >
        </el-card>
        <el-card v-else class="card_empty">
          <el-empty />
        </el-card>
      </div>
      <div class="content-item-title">已经结束的的考试</div>
      <div class="content-item announced">
        <el-card class="announced-left">
          <template #header>
            <div class="card-header">
              <span>已经结束的考试</span>
            </div>
          </template>
          <div
            v-if="exams_future.length"
            v-for="(o, index) in exams_future"
            :key="index"
            class="announced-left-item"
          >
            <div class="announced-left-item-title">{{ o.name }}</div>
            <div class="announced-left-item-time small-info">
              {{ exam_time(o.start_time * 1000, o.end_time * 1000) }}
            </div>
          </div>
          <el-empty v-else description=" " />
        </el-card>
        <el-card class="announced-right">
          <template #header>
            <div class="card-header">
              <span>系统公告</span>
            </div>
          </template>
          <div
            v-for="(o, index) in announceds"
            :key="index"
            class="announced-right-item"
          >
            <div>{{ o.title }}</div>
            <div class="announced-right-item-footer small-info">
              {{ forma_data_day(new Date(o.createTime)) }}
            </div>
          </div>
          <el-empty v-if="!announceds.length" description=" " />
        </el-card>
      </div>
    </div>
    <div v-else>
      <TeaIndex></TeaIndex>
    </div>
  </div>
</template>

<style scoped lang="less">
.small-info {
  color: var(--el-text-color-secondary);
  font-size: 0.625rem;
}

.content-wrap {
  display: flex;
  width: 100%;
  flex: 1;
  justify-content: center;
}

.content {
  width: 100%;
  margin: 0 80px;
  padding: 16px;
  display: flex;
  flex-direction: column;

  &-item {
    width: 100%;

    &-title {
      margin: 3rem 0 1rem;
      font-size: 1.5rem;
      font-weight: bold;
      color: var(--el-text-color-primary);
    }
  }

  .announced {
    display: flex;
    gap: 2.5rem;

    &-left {
      flex: 1;
      height: fit-content;

      &-item {
        &-title {
          font-size: 1.25rem;
        }

        padding-bottom: 1.25rem;
        border-bottom: 1px solid var(--el-card-border-color);
      }

      &-item:last-child {
        border-bottom: none;
      }
    }

    &-right {
      width: 18.75rem;

      &-item {
        border-bottom: 1px solid var(--el-card-border-color);
        padding: 0.5rem 0;

        &-footer {
          font-size: 0.625rem;
        }
      }

      &-item:last-child {
        border-bottom: none;
      }
    }
  }

  .exams {
    display: flex;
    justify-content: start;
    gap: 2.5rem;
    flex-wrap: wrap;

    &-item {
      box-sizing: border-box;
      width: calc(50% - 1.25rem);

      .item-info {
        margin-top: 0.625rem;
      }

      .item-info:first-child {
        margin-top: 0;
      }

      &-title {
        font-size: 1.25rem;
        font-weight: bold;
        color: var(--el-text-color-primary);
      }
    }
  }
}

.read-the-docs {
  color: #888;
}
.card_empty {
  width: 100%;
}
</style>
