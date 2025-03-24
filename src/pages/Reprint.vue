<script setup lang="ts">
import { ref, watch } from "vue";
import { getAnswer, getPaperById, setAnswer, type Paper } from "../api/paper";
import { ElMessage } from "element-plus";
import Question from "../components/Question.vue";
import { user_code } from "../action";
import { jumpUrl } from "../utils/router";
import { useRoute } from "vue-router";
import { forma_data } from "../utils";
const route = useRoute();
const user_id = route.query.user_id as string;
const paper_id = route.query.paper_id as string;
const status = route.query.status as string;

const paper = ref<Paper>();
const saveTime = ref<Date>(new Date());

getAnswer({ user_id: Number(user_id), paper_id: Number(paper_id) }).then(
  (reply) => {
    console.log(reply);
    let replay_data = JSON.parse(reply.content);
    if (!replay_data) {
      return replay_data;
    }
    paper.value = replay_data;
  }
);

function saveAnswer() {
  let data = paper.value;
  let scores = 0;

  paper.value?.content.forEach((list: any) => {
    list?.content.forEach((item: any) => {
      scores += item.score_reslut;
    });
  });
  console.log(scores);
  setAnswer({
    content: JSON.stringify(paper.value),
    user_id: Number(user_id),
    paper_id: Number(paper_id),
    answer_type: 1,
    status: Number(status) == 0 ? 0 : 1,
    scores: scores,
  }).then(() => {
    saveTime.value = new Date();
  });
}
function submit() {
  let scores = 0;

  paper.value?.content.forEach((list: any) => {
    list?.content.forEach((item: any) => {
      scores += item.score_reslut;
    });
  });

  setAnswer({
    content: JSON.stringify(paper.value),
    user_id: Number(user_id),
    paper_id: Number(paper_id),
    answer_type: 1,
    status: 0,
    scores: scores,
  }).then(() => {
    endExam();
  });
}

// 跳转结果页
function endExam() {
  jumpUrl("./index");
}
</script>
<template>
  <div class="wrapper">
    <!-- 考试预览 -->
    <div class="exam-wrap">
      <!-- <Editor :api-key="apiKey" :init="editorOptions" v-model="content" /> -->
      <div class="content" v-for="(questionList, list_index) in paper?.content">
        <div class="title">{{ questionList.name }}</div>
        <Question
          :readonly="true"
          v-for="(question, index) in questionList.content"
          :index="index + 1"
          :question="question"
        >
        </Question>
      </div>
      <div class="submit" @click="submit">完成</div>
      <div class="save" @click="saveAnswer">
        保存|{{ saveTime.toLocaleTimeString() }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &-left {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &-center {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &-right {
  }

  border-bottom: 1px solid var(--el-menu-border-color);
  background-color: var(--el-color-info-light-8);
}

.wrapper {
  color: var(--el-text-color-primary);
  width: 100%;
  height: 100%;
}

.exam-wrap {
  margin: 20px 0 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.title {
  margin-bottom: 32px;
  font-size: 20px;
}

.content {
  width: 780px;
}

.save {
  cursor: pointer;
  position: fixed;
  right: 20px;
  bottom: 20px;
  border: 2px solid var(--el-color-info-light-9);
  padding: 6px;
  border-radius: 4px;
  background-color: var(--el-color-primary-light-3);
}

.submit {
  cursor: pointer;
  border: 2px solid var(--el-color-info-light-9);
  padding: 6px 20px;
  border-radius: 4px;
  background-color: var(--el-color-primary-light-3);
}

.exam-tip {
  display: flex;
  margin: 80px 0 40px;
  align-items: center;
  // justify-content: center;
  flex-direction: column;

  &-top {
    display: flex;
    justify-content: center;
  }

  &-center {
    display: flex;
    justify-content: center;
  }

  .startButton {
    cursor: pointer;
    margin-top: 80px;
    width: 200px;
    height: 50px;
  }
}
</style>
