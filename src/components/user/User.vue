<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="请输入内容"><el-button slot="append" icon="el-icon-search"></el-button></el-input>
        </el-col>
        <el-col :span="4"><el-button type="primary">添加</el-button></el-col>
      </el-row>

      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="name" label="用户名"></el-table-column>
        <el-table-column prop="cnname" label="中文用户名"></el-table-column>
        <el-table-column prop="mobile" label="手机"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="enable_flag" label="是否启用"></el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      total: 0,
      query: {
        pageNumber: 1,
        pageSize: 10
      }
    };
  },
  created() {
    this.initUsers();
  },
  methods: {
    async initUsers() {
      const res = await this.$http.post('/ele/users', this.query);
      console.log(res);
      const data = res.data;
      if (data.code === 1) {
        this.tableData = data.rows;
        this.total = data.total;
      } else {
        this.$message.warning('获取用户列表失败');
      }
    },
    handleClick() {}
  }
};
</script>

<style></style>
