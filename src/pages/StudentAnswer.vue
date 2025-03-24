<template>
    <div class="min-h-screen bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 flex mt-6">
        <div class="flex-1 ml-6">
          <div class="bg-white rounded-lg p-6">
            <!-- 搜索区域 -->
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center space-x-4">
                <el-input
                  v-model="searchText"
                  placeholder="搜索考试名称"
                  class="w-64"
                  :prefix-icon="Search"
                />
                <el-date-picker
                  v-model="dateRange"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                />
              </div>
              <el-button type="primary" class="!rounded-button whitespace-nowrap">
                <el-icon class="mr-1"><Search /></el-icon>
                搜索
              </el-button>
            </div>
  
            <!-- 考试列表 -->
            <el-table :data="examList" style="width: 100%">
              <el-table-column label="考试名称" prop="name" />
              <el-table-column label="考试时间" prop="time" width="180" />
              <el-table-column label="参考人数" prop="students" width="100" />
              <el-table-column label="平均分" prop="avgScore" width="100" />
              <el-table-column label="状态" width="100">
                <template #default="scope">
                  <el-tag :type="scope.row.status === '已结束' ? 'info' : 'success'">
                    {{ scope.row.status }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="200">
                <template #default="scope">
                  <el-button type="primary" size="small" class="!rounded-button whitespace-nowrap" @click="viewDetail(scope.row)">
                    查看详情
                  </el-button>
                  <el-button type="success" size="small" class="!rounded-button whitespace-nowrap" @click="exportScore(scope.row)">
                    导出成绩
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
  
            <!-- 分页 -->
            <div class="mt-4 flex justify-end">
              <el-pagination
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                :page-sizes="[10, 20, 30, 50]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  import { Search, School, Document, Plus, Files, User, Setting } from '@element-plus/icons-vue';
  
  const searchText = ref('');
  const dateRange = ref([]);
  const currentPage = ref(1);
  const pageSize = ref(10);
  const total = ref(150);
  
  const examList = ref([
    {
      name: '2023年高等数学期末考试',
      time: '2023-12-20 14:00-16:00',
      students: 120,
      avgScore: 85.5,
      status: '已结束'
    },
    {
      name: '2023年线性代数期中考试',
      time: '2023-10-15 09:00-11:00',
      students: 98,
      avgScore: 78.3,
      status: '已结束'
    },
    {
      name: '2023年概率论与数理统计测试',
      time: '2023-11-30 10:00-12:00',
      students: 105,
      avgScore: 82.7,
      status: '已结束'
    },
    {
      name: '2024年高等数学期中考试',
      time: '2024-01-10 14:00-16:00',
      students: 88,
      avgScore: 0,
      status: '进行中'
    },
    {
      name: '2023年数学分析期末考试',
      time: '2023-12-25 09:00-11:00',
      students: 76,
      avgScore: 80.9,
      status: '已结束'
    }
  ]);
  
  const viewDetail = (row: any) => {
    console.log('查看详情', row);
  };
  
  const exportScore = (row: any) => {
    console.log('导出成绩', row);
  };
  </script>
  
  <style scoped>
  .min-h-screen {
    width: 100%;
  }
  .el-menu {
    border-right: none;
  }
  </style>
  
  