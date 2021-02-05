<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row :class="['line_bottom', 'ycenter', i === 0 ? 'line_top' : '']" v-for="(menu1, i) in scope.row.perms" :key="menu1.id">
              <el-col :span="4">
                <el-tag>{{ menu1.name }}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="20">
                <el-row :class="['ycenter', i2 != 0 ? 'line_top' : '']" v-for="(menu2, i2) in menu1.children" :key="menu2.id">
                  <el-col :span="4">
                    <el-tag type="success">{{ menu2.name }}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="20">
                    <el-tag closable @close="handleCloseTag(scope.row, menu3)" v-for="menu3 in menu2.children" :key="menu3.id" type="warning">{{ menu3.name }}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="角色名称"></el-table-column>
        <el-table-column prop="code" label="角色编码"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
            <el-button size="mini" type="success" @click="givePerms(scope.row)">分配权限</el-button>
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
    <!-- 分配权限 -->
    <el-dialog title="分配权限" :visible.sync="dialogVisible" width="25%" :before-close="handleClose">
      <!-- 树形结构 -->
      <el-tree :data="TreeData" :check-strictly="true" :default-checked-keys="checkKeys" :default-expand-all="true" show-checkbox node-key="id" :props="defaultProps"></el-tree>
      <!-- 树形结构 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      total: 0,
      pageNumber: 1,
      pageSize: 3,
      pageSizes: [3, 6, 9],
      TreeData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      checkKeys: []
    };
  },
  created() {
    this.initRoles();
  },
  methods: {
    async givePerms(role) {
      this.checkKeys = [];
      let perms = role.perms;
      // 准备默认勾选节点(父子不级联勾选)
      for (let i = 0; i < perms.length; i++) {
        let menu1 = perms[i];
        this.checkKeys.push(menu1.id);
        if (menu1.children.length > 0) {
          for (let j = 0; j < menu1.children.length; j++) {
            let menu2 = menu1.children[j];
            console.log('menu2:' + JSON.stringify(menu2));
            this.checkKeys.push(menu2.id);
            if (menu2.children.length > 0) {
              for (let k = 0; k < menu2.children.length; k++) {
                let menu3 = menu2.children[k];
                this.checkKeys.push(menu3.id);
              }
            }
          }
        }
      }

      this.dialogVisible = true;
      const res = await this.$http.get('/ele/treePrems', {});
      const data = res.data;
      if (data.code === 1) {
        this.TreeData = data.data;
      } else {
        this.$message.warning('获取权限失败');
      }
    },
    handleClose() {
      this.dialogVisible = false;
    },
    async initRoles() {
      var param = {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
      };
      const res = await this.$http.post('/ele/roles', param);
      const data = res.data;
      if (data.code === 1) {
        this.tableData = data.rows;
        this.total = data.total;
      } else {
        this.$message.warning('获取用户列表失败');
      }
    },
    handleSizeChange(val) {
      this.pageNumber = 1;
      this.pageSize = val;
      this.initRoles();
    },
    handleCurrentChange(val) {
      this.pageNumber = val;
      this.initRoles();
    },
    handleCloseTag(role, menu) {
      let that = this;
      that
        .$confirm('确定删除权限【' + menu.name + '】吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(async () => {
          let res = await that.$http.post('/ele/roleMenu/del', { role_id: role.id, menu_id: menu.id });
          let data = res.data;
          console.log(JSON.stringify(data.data));
          if (data.code === 1) {
            that.$message({
              message: '删除成功',
              type: 'success'
            });
            role.perms = data.data;
          } else {
            that.$message.error(data.message);
          }
        })
        .catch(() => {});
    }
  }
};
</script>

<style scoped>
.el-tag {
  margin: 8px;
}
.line_top {
  border-top: 1px solid #f3f0f0;
}
.line_bottom {
  border-bottom: 1px solid #f3f0f0;
}
</style>
