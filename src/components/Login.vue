<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-img"><img src="../assets/image/logo.png" /></div>
      <el-form class="el-form" ref="form" :rules="rules" :model="form">
        <el-form-item prop="username"><el-input placeholder="请输入用户名" prefix-icon="test t-iconicon-test" v-model="form.username"></el-input></el-form-item>
        <el-form-item prop="password"><el-input placeholder="请输入密码" type="password" prefix-icon="test t-iconmima" v-model="form.password"></el-input></el-form-item>
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
        username: 'jack',
        password: '1234'
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }, { min: 3, max: 10, message: '长度在3到10个字符', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }, { min: 3, max: 10, message: '长度在3到10个字符', trigger: 'blur' }]
      }

    }
  },
  methods: {
    onSubmit () {
      const that = this
      that.$refs.form.validate(async (valid) => {
        if (!valid) {
          that.$message.error('登录失败')
        } else {
          const res = await that.$http.post('/ele/login', that.form)
          const data = res.data
          if (data.code === 1) {
            window.localStorage.setItem('id', data.data.id)
            window.localStorage.setItem('name', data.data.name)
            window.localStorage.setItem('token', data.data.token)

            // 跳转到主页
            this.$router.push('/home')
          } else {
          }
        }
      })
    },
    onReset () {
      this.$refs.form.resetFields()
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
