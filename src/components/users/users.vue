<template>
  <div>
    <el-card class="box-card">
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 搜索框 -->
      <div style="margin: 20px 0;">
        <el-input placeholder="请输入内容" class="searchUser">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <!--  添加用户 按钮 -->
        <el-button type="success" plain>添加用户</el-button>
      </div>
      <el-table stripe style="width: 100%">
        <el-table-column prop="id" label="#" width="50">
        </el-table-column>
        <el-table-column prop="username" label="姓名" width="110">
        </el-table-column>
        <el-table-column prop="email" label="邮箱">
        </el-table-column>
        <el-table-column prop="mobile" label="电话" width="180">
        </el-table-column>
        <el-table-column prop="create_time" label="创建日期" width="180">
        </el-table-column>
        <el-table-column prop="mg_state" label="用户状态" width="180">
        </el-table-column>
        <el-table-column label="操作" width="180">
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1"
        :page-sizes="[2, 4, 6, 8]" :page-size="2" layout="total, sizes, prev, pager, next, jumper" :total="400">
      </el-pagination>
    </el-card>
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    },
    // create(

    // )
    methods: {
      handleSizeChange() {

      },
      handleCurrentChange() {

      }
    }
  }

</script>
<style>
  .box-card {
    height: 100%;
  }

  .searchUser {
    width: 300px;
  }

</style>
