<script setup lang="ts">
import { computed, ref } from 'vue';
import { forma_data, forma_data_day } from '../utils';
import { jumpUrl } from '../utils/router';

// import { ref } from 'vue'
// import ChangeI18n from './gloabl/ChangeI18n.vue'
const date_now = new Date();


defineProps<{ msg: string }>()

// 获取系统公告
interface Announced {
  title: string,
  text: string,
  createTime: number,
}

const announceds: Announced[] = [
  {
    title: '1740972869584',
    text: '1740972869584',
    createTime: 1740972869584,
  },
  {
    title: '1740972869584',
    text: '1740972869584',
    createTime: 1740972869584,
  },
  {
    title: '1740972869584',
    text: '1740972869584',
    createTime: 1740972869584,
  },
  {
    title: '1740972869584',
    text: '1740972869584',
    createTime: 1740972869584,
  }
]

// 获取当前考试
interface Exam {
  type?:number,//1代表即将进行,2代表已完成,3代表
  title: string,
  start_time: number,
  end_time: number,
  location: string,
  invigilator: string[],
}

const exams = ref<Exam[]>([
  {
    title: '考试一',
    start_time: 1740972869584,
    end_time: 1740972869584,
    location: '地点',
    invigilator: ['一', '二'],
  },
  {
    title: '考试一',
    start_time: 1741972869584,
    end_time: 1741972869584,
    location: '地点',
    invigilator: ['一', '二'],
  },
  {
    title: '考试一',
    start_time: 1741972869584,
    end_time: 1741972869584,
    location: '地点',
    invigilator: ['一', '二'],
  },
  {
    title: '考试一',
    start_time: 1741972869584,
    end_time: 1741972869584,
    location: '地点',
    invigilator: ['一', '二'],
  }
])
const exams_future = computed(() => {
  return exams.value.filter(value => value.start_time > date_now.getTime())
})

const exam_time = (start_time: number, end_time: number): string => {
  let [start_day, start_hour] = forma_data(new Date(start_time)).toString().split(' ')
  let [end_day, end_hour] = forma_data(new Date(end_time)).toString().split(' ')

  return `${start_day} ${start_hour}-${start_day == end_day ? '' : end_day}${end_hour}`
}


// const count = ref(0)
</script>

<template>
  <div class="content-wrap">
    <div class="content">

      <div class="content-item-title">当前考试</div>
      <div class="content-item exams">
        <el-card class="exams-item" v-for="(o, index) in exams" :key="index">
          <template #header>
            <div class="card-header">
              <span>考试公告</span>
            </div>
          </template>
          <div class="exams-item-title item-info">
            {{ o.title }}
          </div>
          <div class="exams-item-time item-info small-info">
            时间: {{ exam_time(o.start_time, o.end_time) }}
          </div>
          <div class="exams-item-location item-info small-info">
            地点: {{ o.location }}
          </div>
          <div class="item-info small-info">
            监考老师:
            <span v-for="invi in o.invigilator">
              &#32;{{ `${invi}` }}&#12288;
            </span>
          </div>
          <el-button class="item-info exam-button" @click="()=>{
            jumpUrl('./exam')
          }">进入考试</el-button>
        </el-card>
      </div>
      <div class="content-item-title">即将到来的考试</div>
      <div class="content-item announced">
        <el-card class="announced-left">
          <template #header>
            <div class="card-header">
              <span>即将到来的考试</span>
            </div>
          </template>
          <div v-if="exams_future.length" v-for="(o, index) in exams_future" :key="index" class="announced-left-item">
            <div class="announced-left-item-title">{{ o.title }}</div>
            <div class="announced-left-item-time small-info">{{ forma_data(new Date(o.start_time)) }}</div>
          </div>
          <el-empty v-else description=" " />
        </el-card>
        <el-card class="announced-right">
          <template #header>
            <div class="card-header">
              <span>系统公告</span>
            </div>
          </template>
          <div v-for="(o, index) in announceds" :key="index" class="announced-right-item">
            <div>{{ o.title }}</div>
            <div class="announced-right-item-footer small-info">{{ forma_data_day(new Date(o.createTime)) }}</div>
          </div>
          <el-empty v-if="!announceds.length" description=" " />
        </el-card>
      </div>
    </div>
  </div>

</template>

<style scoped lang="less">
.small-info {
  color: var(--el-text-color-secondary);
  font-size: .625rem;
}

.content {
  width: 100%;
  margin: 0 80px;
  padding: 16px;
  display: flex;
  flex-direction: column;

  &-wrap {
    display: flex;
    width: 100%;
    flex: 1;
  }

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
        padding: .5rem 0;

        &-footer {
          font-size: .625rem;
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
        margin-top: .625rem;
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
</style>
