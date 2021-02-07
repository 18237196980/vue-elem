<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <tree-table :data="GoodsCateList" :columns="columns" :show-index="true" :selection-type="false" :expand-type="false" index-text="#" border></tree-table>
    </el-card>
  </div>
</template>

<script>
import api from '@/api/index.js';
export default {
  data() {
    return {
      GoodsCateList: [],
      columns: [
        {
          label: '分类名称',
          prop: 'name'
        }
      ]
    };
  },
  created() {
    this.initGoodsCateList();
  },
  methods: {
    async initGoodsCateList() {
      const res = await api.goodsCateLevel({});
      const data = res.data;
      console.log(JSON.stringify(data));
      if (data.code === 1) {
        this.GoodsCateList = data.data;
      } else {
        this.$message.error('加载商品分类失败');
      }
    }
  }
};
</script>

<style></style>
