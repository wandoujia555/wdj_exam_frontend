<script setup lang='ts'>
import { ref, watch } from 'vue'
import type { Question } from '../api/paper';
import Editor from './Editor.vue';
interface Props {
    question: Question,
    index: number
}
const props = defineProps<Props>()
const { question } = props
// if(choose.includes(question.question_type)){
//     question.content = JSON.parse(question.content)
// }
const check = ref()
watch(check,(newVal)=>{
    question.answer = newVal
})

</script>
<template>
    <div class="question">
        <div class="question-title">{{ index }}. {{ question.name }}</div>
        <el-radio-group class="question-content" v-if="question.question_type == 1" v-model="check">
            <el-radio v-for="(option, key) in question.content" :key="option + key" :value="key">{{ key }}. {{ option
                }}</el-radio>
        </el-radio-group>
        <el-checkbox-group class="question-content" v-if="question.question_type == 2" v-model="check">
            <el-checkbox v-for="(option, key) in question.content" :key="option + key" :value="key">
                {{ option }}
            </el-checkbox>
        </el-checkbox-group>
        <Editor v-if="question.question_type == 3" v-model="check"></Editor>
    </div>
</template>

<style scoped lang="less">
.question {
    &-title {
        font-size: 16px;
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
</style>