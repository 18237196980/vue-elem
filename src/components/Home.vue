<template>
  <el-container style="height: 100%;">
    <el-header class="header-div">
      <div class="header-left">
        <div class="header-img"><img src="../assets/image/w-ma.png" /></div>
        <div class="header-title">电商管理系统</div>
      </div>

      <div class="header-right">
        <div class="username">欢迎：{{ username }}</div>
        <el-button @click="logout" type="info">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside :width="collapse_flag ? '64px' : '201px'">
        <div class="toggole" @click="showHideMenu">|||</div>
        <el-menu
          :default-active="activePath"
          :router="true"
          :collapse-transition="false"
          :collapse="collapse_flag"
          :unique-opened="true"
          class="el-menu-vertical-demo"
          background-color="#24262F"
          text-color="#ffffff"
          active-text-color="#ffd04b"
        >
          <el-submenu :index="item.id" v-for="item in menuList" :key="item.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item-group :index="child.id" v-for="child in item.children" :key="child.id">
              <el-menu-item @click="changeAcive(child.path)" :index="child.path">{{ child.name }}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main><router-view></router-view></el-main>
        <el-footer></el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menuList: [],
      collapse_flag: false,
      activePath: '',
      username: ''
    };
  },
  created() {
    this.initMenus();
    this.activePath = window.localStorage.getItem('activePath');
    this.username = window.localStorage.getItem('name');
  },
  methods: {
    // 退出登陆
    logout() {
      let that = this;
      that
        .$confirm('确定退出登录吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          window.localStorage.clear();
          that.$router.push('/login');
        })
        .catch(() => {});
    },
    async initMenus() {
      const res = await this.$http.post('/ele/menus');
      const data = res.data;
      if (data.code === 1) {
        this.menuList = data.data;
      }
    },
    showHideMenu() {
      this.collapse_flag = !this.collapse_flag;
    },
    changeAcive(path) {
      console.log(path);
      this.activePath = path;
      window.localStorage.setItem('activePath', path);
    }
  }
};
</script>

<style scoped>
.el-header {
  background-color: #3a3d49;
}
.el-aside {
  background-color: #24262f;
}
.el-main .el-footer {
  background-color: #f2f2f2;
}
.header-div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
}
.header-left {
  display: flex;
  align-items: center;
}
.header-img img {
  width: 45px;
  height: 45px;
}
.header-title {
  color: #ffffff;
  font-weight: 600;
  margin-left: 10px;
  align-items: center;
}
.toggole {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  background-color: #2d303d;
  color: #ffffff;
  font-size: 10px;
  letter-spacing: 0.4em;
  cursor: pointer;
}
.header-right {
  display: flex;
  justify-content: center;
  align-items: center;
}
.username {
  color: #ffffff;
  font-weight: 600;
  margin-right: 30px;
}
</style>
