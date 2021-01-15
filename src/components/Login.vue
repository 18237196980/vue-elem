<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-img"><img src="../assets/image/logo.png" /></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login'
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
</style>
