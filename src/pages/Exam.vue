<script setup lang='ts'>
import { ref, watch } from 'vue'
import { getPaperById, setAnswer, type Paper } from '../api/paper';
import { ElMessage } from 'element-plus';
import Question from '../components/Question.vue';
import { user_code } from '../action';
import { jumpUrl } from '../utils/router';
import Editor from '../components/Editor.vue';
function startExam() {
    getPaperById({ id: 1 })
        .then(data => {
            if (data) {
                paper.value = data
                let totalSeconds = 7200; // 示例秒数
                setInterval(() => {
                    totalSeconds--;
                    timeSeconds.value = convertSecondsToTime(totalSeconds);
                    if (totalSeconds <= 0) {
                        endExam()
                    }
                }, 1000)
            }
        })
        .catch(() => {
            ElMessage(`error:网络错误,请刷新重试`)
        })
}

const paper = ref<Paper>()
const paperList = ref<any[]>([])
const saveTime = ref<Date>(new Date())
const timeSeconds = ref<string>(convertSecondsToTime(7200))

function serAnswer() {
    setAnswer({
        content: JSON.stringify(paper.value),
        user_id: user_code.value,
        paper_id: 2,
    }).then(()=>{
        saveTime.value = new Date()
    })
}
function submit() {
    setAnswer({
        content: JSON.stringify(paper.value),
        user_id: user_code.value,
        paper_id: 2,
    }).then(() => {
        endExam()
    })
}
function convertSecondsToTime(seconds: number) {
    const hours = Math.floor(seconds / 3600).toString(); // 计算小时数
    const remainingSecondsAfterHours = seconds % 3600; // 剩余的秒数
    const minutes = Math.floor(remainingSecondsAfterHours / 60).toString(); // 计算分钟数
    const remainingSeconds = (remainingSecondsAfterHours % 60).toString(); // 剩余的秒数

    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${remainingSeconds.padStart(2, '0')}`;
}

// 考试结束
function endExam() {
    jumpUrl('./End')
}

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
        <div v-if="!paper">
            <!-- <WeEditor v-model="aaa"></WeEditor> -->
            <div>考试注意事项</div>
            <button @click="startExam">点击开始考试</button>
        </div>
        <div v-else="paper" class="exam-wrap">
            
            <!-- <Editor :api-key="apiKey" :init="editorOptions" v-model="content" /> -->
            <div class="content" v-for="questionList in paper.content">
                <div class="title">{{ questionList.name }}</div>
                <Question v-for="(question, index) in questionList.content" :index="index + 1" :question="question">
                </Question>
            </div>
            <div class="submit" @click="submit">交卷</div>
            <div class="save" @click="serAnswer">保存|{{ saveTime.toLocaleTimeString() }}</div>
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

    &-right {}

    border-bottom: 1px solid var(--el-menu-border-color);
    background-color: var(--el-color-info-light-8);
}

.wrapper {
    color: var(--el-text-color-primary);
    width: 100%;
    height: 100%;
}

.exam-wrap {
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
</style>