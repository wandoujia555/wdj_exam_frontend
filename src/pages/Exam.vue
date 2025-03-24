<script setup lang="ts">
import { ref, watch } from "vue";
import {
  getPaperById,
  setAnswer,
  setPaperUser,
  type Paper,
} from "../api/paper";
import { ElMessage, ElMessageBox } from "element-plus";
import Question from "../components/Question.vue";
import { user_code } from "../action";
import { jumpUrl } from "../utils/router";
import { useRoute } from "vue-router";
import { forma_data } from "../utils";
const route = useRoute();
const id = route.query.id as string;
const data = ref<Paper>();

getPaperById({ id: Number(id) }).then((reply) => {
  if (reply) {
    data.value = reply;
    console.log(reply, "reply");
  }
});

const paper = ref<Paper>();
const saveTime = ref<Date>(new Date());
const timeSeconds = ref<string>(convertSecondsToTime(7200));

function serAnswer() {
  setAnswer({
    content: JSON.stringify(paper.value),
    user_id: user_code.value,
    paper_id: Number(id),
    answer_type: 0,
    status:2,
    scores:0,
  }).then(() => {
    saveTime.value = new Date();
  });
}
function submit() {
  setAnswer({
    content: JSON.stringify(paper.value),
    user_id: user_code.value,
    paper_id: 2,
    answer_type: 0,
    status:2,
    scores:0,
  })
    .catch(() => {
      ElMessage(`保存答案失败`);
    })
    .then((data) => {
      if (!data) {
        throw new Error("保存答案错误");
      }

      return open();
    })
    .then((isTrue) => {
      if (!isTrue) {
        return isTrue;
      }
      return setPaperUser({
        user_id: user_code.value,
        paper_id: Number(id),
        status: 0,
      });
    })
    .then((data) => {
      if (data) {
        endExam();
      }
    })
    .catch((err) => {
      if (err) {
        ElMessage(`交卷失败`);
      }
    });
}
function convertSecondsToTime(seconds: number) {
  const hours = Math.floor(seconds / 3600).toString(); // 计算小时数
  const remainingSecondsAfterHours = seconds % 3600; // 剩余的秒数
  const minutes = Math.floor(remainingSecondsAfterHours / 60).toString(); // 计算分钟数
  const remainingSeconds = (remainingSecondsAfterHours % 60).toString(); // 剩余的秒数

  return `${hours.padStart(2, "0")}:${minutes.padStart(
    2,
    "0"
  )}:${remainingSeconds.padStart(2, "0")}`;
}

// 考试结束
function endExam() {
  jumpUrl("./End",{},1).then(()=>{
    ElMessage.success(`交卷成功`);
  })
}
function startExam() {
  setPaperUser({
    user_id: user_code.value,
    paper_id: Number(id),
    status: 1,
  })
    .then(() => {
      if (data.value) {
        paper.value = data.value;
        return paper.value;
      } else {
        return getPaperById({ id: Number(id) });
      }
    })
    .then((data: Paper | false) => {
      if (!data) {
        ElMessage(`error:请检查考试是否存在`);
        throw new Error("error:请检查考试是否存在");
      }
      return getTotalSeconds(data.start_time * 1000, data.minutes);
    })
    .then((scond: number) => {
      let totalSeconds = scond; // 示例秒数
      setInterval(() => {
        totalSeconds--;
        timeSeconds.value = convertSecondsToTime(totalSeconds);
        if (totalSeconds <= 0) {
          endExam();
        }
      }, 1000);
    })
    .catch(() => {
      ElMessage(`error:网络错误,请刷新重试`);
    });
}

function getTotalSeconds(startExam: number, duration: number) {
  console.log(startExam);
  return Math.floor(
    (new Date(startExam).getTime() - Date.now()) / 1000 + duration * 60
  );
}

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

const open = () => {
  return ElMessageBox.prompt(
    '答案已保存,你确定退出考试吗?请输入 "我确定" ',
    "Tip",
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      inputPattern: /^我确定$/,
      inputErrorMessage: "答案已保存,但输入 '我确定' 才能退出考试 ",
    }
  )
    .then(() => {
      return true;
    })
    .catch(() => {});
};
</script>
<template>
  <div class="wrapper">
    <div class="nav">
      <div class="nav-left">
        <div class="nav-title">title</div>
        <div class="nav-name">考生</div>
      </div>
      <!-- <div class="nav-center">
                <div class="nav-center-procress">你呢</div>
                <div class="nav-center-percent">已完成 0/35 题</div>
            </div> -->
      <div class="nav-right">{{ timeSeconds }}</div>
    </div>
    <div v-if="!paper" class="exam-tip">
      <div class="exam-tip-top">
        <table border class="table">
          <tbody>
            <tr>
              <th style="width: 200px; padding: 10px" scope="col">考试名称</th>
              <th style="width: 300px; padding: 10px" scope="col">
                {{ data?.name }}
              </th>
            </tr>
            <tr>
              <th style="width: 200px; padding: 10px" scope="col">
                考试时长（分钟）
              </th>
              <th style="width: 300px; padding: 10px" scope="col">
                {{ data?.minutes }}
              </th>
            </tr>
            <tr>
              <th style="width: 200px; padding: 10px" scope="col">考试时间</th>
              <th style="width: 300px; padding: 10px" scope="col">
                {{
                  data
                    ? exam_time(
                        data.start_time * 1000,
                        (data.start_time + data.minutes * 60) * 1000
                      )
                    : ""
                }}
              </th>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="exam-tip-center">
        <ul>
          考试说明：
          <li>1、离开或退出考试界面答题计时不停止，请不要中途离开考试界面。</li>
          <li>2、保持座位前的桌面干净，不要有与考试无关的内容。</li>
          <li>
            3、考试时间截止或答题时间结束，如果处于答题页面，将自动提交试卷。
          </li>
          <li>
            4、考试过程中如果出现页面卡死、题目空白情况，请尝试切换网络或退出重新进入考试。
          </li>
        </ul>
      </div>
      <button class="startButton" @click="startExam">点击开始考试</button>
    </div>
    <div v-else="paper" class="exam-wrap">
      <!-- <Editor :api-key="apiKey" :init="editorOptions" v-model="content" /> -->
      <div class="content" v-for="questionList in paper.content">
        <div class="title">{{ questionList.name }}</div>
        <Question
          :readonly="false"
          v-for="(question, index) in questionList.content"
          :index="index + 1"
          :question="question"
        >
        </Question>
      </div>
      <div class="submit" @click="submit">交卷</div>
      <div class="save" @click="serAnswer">
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
