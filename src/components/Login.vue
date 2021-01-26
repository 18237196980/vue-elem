<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-img"><img src="../assets/image/logo.png" /></div>
      <el-form class="el-form" ref="form" :rules="rules" :model="form">
        <el-form-item prop="name"><el-input placeholder="请输入用户名" prefix-icon="test t-iconicon-test" v-model="form.name"></el-input></el-form-item>
        <el-form-item prop="pwd"><el-input placeholder="请输入密码" type="password" prefix-icon="test t-iconmima" v-model="form.pwd"></el-input></el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="onSubmit">登陆</el-button>
          <el-button type="info" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      form: {
        name: '',
        pwd: ''
      },
      rules: {
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' }, { min: 3, max: 5, message: '长度在3到6个字符', trigger: 'blur' }],
        pwd: [{ required: true, message: '请输入密码', trigger: 'blur' }, { min: 3, max: 5, message: '长度在3到6个字符', trigger: 'blur' }]
      }

    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    onReset () {
      console.log('reset')
    }
  }
}
</script>

<style scoped>
.login-container {
  background-color: #2b4b6b;
  height: 100%;
}
.login-box {
  height: 300px;
  width: 450px;
  border-radius: 3px;
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.login-img {
  width: 130px;
  height: 130px;
  position: absolute;
  left: 50%;
  border: 1px solid #eee;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
}
.login-img img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #eee;
}
.btns{
  display: flex;
  justify-content: flex-end;
}
.el-form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>
