<script setup lang='ts'>
import { ref, watch } from 'vue'
import { getQuestionAnswer, type Question } from '../api/paper';
import Editor from './Editor.vue';
import { user_type } from '../action';
interface Props {
    question: Question,
    index: number,
    readonly: boolean,
}
const props = defineProps<Props>()
const { question } = props as any
if (question.answer && !question.score_reslut) {
    if ([1, 2, 3].includes(question.type)) {

    }
    question.score_reslut = 0
}
if(user_type.value == 1){
    getQuestionAnswer({ id: question.id }).then(data => {
    question.answer_true = data.answer
    console.log(question.answer, question.answer_true)
    question.score_reslut = getScore(question.answer, question.answer_true, question.question_type)
})
}


function getScore(answer: string, answer_true: string, type: number) {

    if (type == 1 || type == 2) {
        return question.answer_true == question.answer ? Number(question.score) : 0
    } else if (type == 3) {
        const correctSet = new Set(answer_true.split(''));
        const userSet = new Set(answer.split(''));
        // 错误选项，直接0分
        for (const option of userSet) {
            if (!correctSet.has(option)) {
                return 0;
            }
        }
        // 正确满分,部分一半分
        return correctSet.size === userSet.size ? question.score : question.score / 2
    } else {
        return 0
    }
}

const check = ref(question.answer)
watch(check, (newVal) => {
    question.answer = newVal
})



</script>
<template>
    <div class="question">
        <div class="green" v-if="user_type == 1">正确答案:{{ question.answer_true }}</div>
        <div class="question-title">{{ index }}. <span v-html="question.name"></span></div>
        <el-radio-group :disabled="readonly" class="question-content" v-if="question.question_type == 1"
            v-model="check">
            <el-radio v-for="(option, key) in question.content" :key="option + key" :value="key">{{ key }}. {{ option
                }}</el-radio>
        </el-radio-group>
        <el-checkbox-group :disabled="readonly" class="question-content" v-if="question.question_type == 2"
            v-model="check">
            <el-checkbox v-for="(option, key) in question.content" :key="option + key" :value="key">
                <div v-html="option"></div>
            </el-checkbox>
        </el-checkbox-group>
        <Editor :readonly="readonly" v-if="[4, 5].includes(Number(question.question_type))" v-model="check"></Editor>
        <el-input-number v-if="user_type == 1" v-model="question.score_reslut" :min="0" :max="question.score" />
    </div>
</template>

<style scoped lang="less">
.question {
    &-title {
        display: flex;
        font-size: 16px;

        p {
            margin-block-start: 0;
            margin-block-end: 0;
        }
    }

    margin: 20px 0;
    // width: 600px;
    border-bottom: 1px solid var(--el-color-info-light-5);
    padding-bottom: 24px;

    &-radio {
        margin-left: 20px;
        margin-top: 20px;
    }

    .el-checkbox {
        // margin-left: 20px;
        margin-top: 20px;
    }

    &-content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-left: 18px;

        .el-radio {
            margin-top: 16px;
        }

        .ml-3 {
            cursor: pointer;
        }
    }
}

.green {
    color: green;
}
</style>
<style>
.question-title p {
    margin-block-start: 0;
    margin-block-end: 0;
}
</style>