<!-- <template>
    <div style="border: 1px solid #ccc">
        <Toolbar v-if="showToolbarFlag" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode"
            style="border-bottom: 1px solid #ccc" />
        <Editor v-model="valueHtml" :defaultConfig="editorConfig" :mode="mode" @onCreated="handleCreated"
            @onChange="handleChange" :style="{ height: editorHeight, overflowY: 'hidden' }" :readOnly="readOnlyFlag" />
    </div>
</template>

<script setup lang="ts">
import filesApi from '@/api/sys/files';
import { watch, onBeforeUnmount, nextTick, ref, shallowRef, onMounted, onBeforeMount } from 'vue'
//@ts-ignore
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css' // 引入 css


// Props：使用属性，子组件接收父组件传递的内容
const props = defineProps({
    // 内容
    content: { type: String, default: '' },
    // 工具栏是否显示，默认显示
    showToolbarFlag: { type: Boolean, default: true },
    // 编辑器高度，默认500px
    editorHeight: { type: String, default: '500px' },
    // 编辑器是否只读，默认可编辑
    readOnlyFlag: { type: Boolean, default: false }
})

// Emits：使用事件，将子组件内容传递给父组件。父组件使用 update(content: string) 
const emit = defineEmits<{ (e: 'update', content: string): void }>()

const mode = ref('default')

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('')

const toolbarConfig = {}

const editorConfig = {
    placeholder: '请输入内容...',
    MENU_CONF: {} as any
}

// 上传图片配置
editorConfig.MENU_CONF['uploadImage'] = {
    // form-data fieldName ，默认值 'wangeditor-uploaded-image'。传给后端接口的参数名，重要!
    fieldName: 'file',
    server: 'http://localhost:8080/files/wangEditorUpload',
}

const handleCreated = (editor: any) => {
    editorRef.value = editor // 记录 editor 实例，重要！

    // 根据父组件传递的readOnlyFlag，设置编辑器为只读
    if (props.readOnlyFlag) {
        editorRef.value.disable();
    } else {
        editorRef.value.enable();
    }
}

const handleChange = () => {
    valueHtml.value = editorRef.value.getHtml()
    emit('update', valueHtml.value)
}

// 监听 props 变化，监听父组件传来的content
watch(() => props.content, (newVal: string) => {
    nextTick(() => {
        if (editorRef.value) {
            // console.log(" 当前编辑器的状态：", editorRef.value); 

            // 富文本编辑器按 html 格式回显
            editorRef.value.setHtml(newVal)
            valueHtml.value = newVal
        }
    })
}
)

onMounted(async () => {
    await nextTick(); // 延迟渲染，确保 DOM 更新完成
    if (props.content) {
        valueHtml.value = props.content
    }
})

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

</script> -->


<script setup lang='ts'>
import { QuillEditor } from '@vueup/vue-quill';
// import ImageUploader from 'quill-image-uploader';
import { ref, watch } from 'vue';
const content = defineModel()
// import { ref } from 'vue'
// import Quill from 'quill'
const props = defineProps<{
    readonly:boolean
}>()

// console.log(Quill)
// var quill = new Quill('#editor', {
//     theme: 'snow'
// });
// const content = ref();
// watch(content,()=>{
//     contentModel
// })
function onContentUpdate(newContent:string) {
    console.log(content.value)
    content.value = newContent;
}
</script>
<template>
    <div>
        <QuillEditor :readOnly="readonly" @update:content="onContentUpdate" contentType="html" class="my-editor" theme="snow"></QuillEditor>
    </div>
</template>

<style>
.my-editor {
    height: 200px;
}
</style>