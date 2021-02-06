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
          <el-input placeholder="请输入内容" v-model="cnname"><el-button @click="search" slot="append" icon="el-icon-search"></el-button></el-input>
        </el-col>
        <el-col :span="2"><el-button @click="reset">重置</el-button></el-col>
        <el-col :span="4"><el-button type="primary" @click="add">添加</el-button></el-col>
      </el-row>

      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="name" label="用户名"></el-table-column>
        <el-table-column prop="cnname" label="中文用户名"></el-table-column>
        <el-table-column prop="mobile" label="手机"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="enable_flag" label="是否启用">
          <template slot-scope="scope">
            <el-tag size="small" v-if="scope.row.enable_flag === 1" type="success">启用</el-tag>
            <el-tag size="small" v-if="scope.row.enable_flag === 0" type="danger">未启用</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
            <el-button size="mini" type="success" @click="assignRole(scope.row)">分配角色</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNumber"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 弹窗 添加、编辑用户 -->
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <!-- 表单 -->
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="活动名称" prop="name"><el-input v-model="ruleForm.name" :disabled="disabled"></el-input></el-form-item>
        <el-form-item label="中文用户名" prop="cnname"><el-input v-model="ruleForm.cnname"></el-input></el-form-item>
        <el-form-item label="手机" prop="mobile"><el-input v-model="ruleForm.mobile"></el-input></el-form-item>
        <el-form-item label="邮箱" prop="email"><el-input v-model="ruleForm.email"></el-input></el-form-item>
        <el-form-item label="是否启用" prop="enable_flag"><el-switch v-model="ruleForm.enable_flag" active-color="#13ce66" inactive-color="#CFD1D4"></el-switch></el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirm">确定</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 弹窗 分配角色 -->
    <el-dialog :title="title" :visible.sync="roleVisible" width="20%" :before-close="handleCloseRole">
      <div>
        <p>用户名称：{{ userInfo.cnname }}</p>
        <p>角色名称：{{ userInfo.roleName }}</p>
        <p>
          角色名称：
          <el-select v-model="role_id" placeholder="请选择"><el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id"></el-option></el-select>
        </p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="selectRoleClose">取 消</el-button>
          <el-button type="primary" @click="confirmRole">确 定</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from '@/api/index.js';
export default {
  data() {
    // 校验手机号格式
    var checkMobile = (rule, value, callback) => {
      var reg = /^1\d{10}$/;
      setTimeout(() => {
        if (!reg.test(value)) {
          callback(new Error('请输入正确的手机号'));
        } else {
          callback();
        }
      }, 500);
    };
    return {
      title: '添加用户',
      viewType: 0,
      tableData: [],
      total: 0,
      pageNumber: 1,
      pageSize: 3,
      pageSizes: [3, 6, 9],
      cnname: '',
      dialogVisible: false,
      disabled: false,
      roleVisible: false,
      userInfo: {},
      roleList: [],
      role_id: '',

      ruleForm: {
        name: '',
        cnname: '',
        mobile: '',
        email: '',
        enable_flag: false
      },
      rules: {
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' }, { min: 3, max: 5, message: '长度在 1 到 8 个字符', trigger: 'blur' }],
        cnname: [{ required: true, message: '请输入中文用户名', trigger: 'blur' }, { min: 3, max: 5, message: '长度在 1 到 10 个字符', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }, { validator: checkMobile, trigger: 'blur' }]
      }
    };
  },
  created() {
    this.initUsers();
  },
  methods: {
    selectRoleClose() {
      this.handleCloseRole();
    },
    async confirmRole() {
      var param = {
        u_id: this.userInfo.id,
        role_id: this.role_id
      };
      const res = await api.assignRoleForUser(param);
      const data = res.data;
      if (data.code === 1) {
        this.initUsers();
        this.handleCloseRole();
      } else {
        this.$message.error(data.message);
      }
    },
    handleCloseRole() {
      this.roleVisible = false;
      this.role_id = '';
    },
    async assignRole(userInfo) {
      const res = await api.allRoles({});
      const data = res.data;
      if (data.code === 1) {
        this.roleList = data.data;
      } else {
        this.$message.warning(data.message);
      }
      this.title = '分配角色';
      this.userInfo = userInfo;
      this.roleVisible = true;
    },
    add() {
      this.viewType = 0;
      this.disabled = false;
      this.title = '添加用户';
      this.dialogVisible = true;
    },
    search() {
      this.initUsers();
    },
    reset() {
      this.pageNumber = 1;
      this.pageSize = 3;
      this.cnname = '';
      this.initUsers();
    },
    async initUsers() {
      var param = {
        cnname: this.cnname,
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
      };
      const res = await this.$http.post('/ele/users', param);
      const data = res.data;
      if (data.code === 1) {
        this.tableData = data.rows;
        this.total = data.total;
      } else {
        this.$message.warning('获取用户列表失败');
      }
    },
    async handleEdit(row) {
      this.disabled = true;
      this.viewType = 1;
      this.title = '编辑用户';
      this.dialogVisible = true;
      const res = await this.$http.get('/ele/user/getById?id=' + row.id);
      const data = res.data;
      if (data.code === 1) {
        this.ruleForm = data.data;
        this.ruleForm.enable_flag = data.data.enable_flag == 1 ? true : false;
      } else {
        this.$message.error(data.message);
      }
    },
    handleDelete(row) {
      let that = this;
      that
        .$confirm('确定删除用户【' + row.name + '】吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(async () => {
          let res = await that.$http.post('/ele/user/del', { id: row.id });
          let data = res.data;
          if (data.code === 1) {
            that.$message({
              message: data.data,
              type: 'success'
            });
            that.initUsers();
            that.cancel();
          } else {
            that.$message.error(data.message);
          }
        })
        .catch(() => {});
    },
    handleSizeChange(val) {
      this.pageNumber = 1;
      this.pageSize = val;
      this.initUsers();
    },
    handleCurrentChange(val) {
      this.pageNumber = val;
      this.initUsers();
    },
    handleClose() {
      this.cancel();
    },
    cancel() {
      this.dialogVisible = false;
      this.$refs['ruleForm'].resetFields();
    },
    confirm() {
      this.$refs['ruleForm'].validate(async valid => {
        if (valid) {
          this.ruleForm.enable_flag = this.ruleForm.enable_flag ? 1 : 0;
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
          }
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style></style>
