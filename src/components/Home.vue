<template>
    <el-container style="height: 100%;">
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-container>
          <el-main>Main</el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
</template>

<script>
</script>

<style scoped>
  .el-header{
    background-color: #1890FF;
  }
  .el-aside{
    background-color: #F4F1F1;
  }
  .el-main .el-footer{
    background-color: #F0F2F5;
  }
</style>
