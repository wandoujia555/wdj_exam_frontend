<template>
    <div class="end-page">
        <el-card class="end-card" shadow="hover">
            <div class="end-content">
                <el-icon class="end-icon">
                    <Finished />
                </el-icon>
                <h2>考试已完成</h2>
                <p>感谢您的参与！</p>
                <p>请确认离开考场，并确保携带好您的个人物品。</p>
                <el-alert
                    title="提示"
                    type="info"
                    description="离开考场后，请保持安静，不要影响其他考生。"
                    show-icon
                    class="end-alert"
                />
                <el-button type="primary" @click="handleLeave" class="leave-button">确认离开</el-button>
            </div>
        </el-card>
    </div>
</template>

<script>
import { Finished } from '@element-plus/icons-vue';
import { jumpUrl } from '../utils/router';

export default {
    name: 'EndPage',
    methods: {
        handleLeave() {
            this.$message({
                message: '感谢您的配合，祝您生活愉快！',
                type: 'success',
            });
            jumpUrl('/index')
            // 在此处添加跳转逻辑或其他操作
        },
    },
};
</script>

<style scoped>
.end-page {
    width:100%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background: linear-gradient(135deg, #f5f5f5, #e8f5e9); */
}

.end-card {
    width: 450px;
    text-align: center;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.end-content {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.end-icon {
    font-size: 60px;
    color: #67c23a;
    margin-bottom: 20px;
}

h2 {
    margin: 10px 0;
    font-size: 26px;
    color: #333;
    font-weight: bold;
}

p {
    margin-bottom: 10px;
    color: #666;
    font-size: 16px;
}

.end-alert {
    margin: 20px 0;
    text-align: left;
    width: 100%;
}

.leave-button {
    margin-top: 20px;
    width: 100%;
    font-size: 16px;
}
</style>