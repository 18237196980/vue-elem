<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <el-row>
        <el-col><el-button type="primary" @click="add">添加</el-button></el-col>
      </el-row>
      <tree-table class="tree-table" :data="GoodsCateList" :columns="columns" :show-index="true" :selection-type="false" :expand-type="false" index-text="#" border>
        <template slot="type" scope="scope">
          <el-tag size="small" v-if="scope.row.type === 1" type="success">一级</el-tag>
          <el-tag size="small" v-else-if="scope.row.type === 2" type="primary">二级</el-tag>
          <el-tag size="small" v-else-if="scope.row.type === 3" type="danger">三级</el-tag>
          <el-tag size="small" v-else>未知</el-tag>
        </template>
        <template slot="enable_flag" scope="scope">
          <el-tag size="small" v-if="scope.row.enable_flag === 0" type="danger">未启用</el-tag>
          <el-tag size="small" v-else-if="scope.row.enable_flag === 1" type="success">启用</el-tag>
          <el-tag size="small" v-else>未知</el-tag>
        </template>
        <template slot="opt">
          <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="handlDel(scope.row)">删除</el-button>
        </template>
      </tree-table>
    </el-card>

    <!-- 弹窗 添加商品分类 -->
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <!-- 表单 -->
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="分类名称" prop="name"><el-input v-model="ruleForm.name"></el-input></el-form-item>
        <el-form-item label="上级分类" prop="pid">
          <el-cascader
              v-model="value"
              :options="options"
              :props="{ expandTrigger: 'hover' }"
              @change="handleChange"></el-cascader>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirm">确定</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import api from '@/api/index.js';
export default {
  data() {
    return {
      title: '添加商品分类',
      dialogVisible:false,
      GoodsCateList: [],
      ruleForm: {
        name: '',

      },
      rules: {
        name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }, {}],
      },
      columns: [
        {
          label: '分类名称',
          prop: 'name'
        },
        {
          label: '层级',
          prop: 'type',
          type: 'template',
          template: 'type'
        },
        {
          label: '是否启用',
          prop: 'enable_flag',
          type: 'template',
          template: 'enable_flag'
        },
        {
          label: '操作',
          type: 'template',
          template: 'opt'
        },
        
      ]
    };
  },
  created() {
    this.initGoodsCateList();
  },
  methods: {
    add(){
      this.dialogVisible=true;
    },
    cancel() {
      this.dialogVisible = false;
      this.$refs['ruleForm'].resetFields();
    },
    handleClose() {
      this.cancel();
    },
    handleEdit(row){

    },
    handlDel(row){

    },
    confirm() {
      this.$refs['ruleForm'].validate(async valid => {
        if (valid) {
          /* this.ruleForm.enable_flag = this.ruleForm.enable_flag ? 1 : 0;
          let res;
          if (!this.viewType === 1) {
            // 添加
            res = await this.$http.post('/ele/user/add', this.ruleForm);
          } else {
            res = await this.$http.post('/ele/user/edit', this.ruleForm);
          }
          let data = res.data;
          if (data.code === 1) {
            this.$message({
              message: data.data,
              type: 'success'
            });
            this.initUsers();
            this.cancel();
          } else {
            this.$message.error(data.message);
          } */
        } else {
          return false;
        }
      });
    },
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
