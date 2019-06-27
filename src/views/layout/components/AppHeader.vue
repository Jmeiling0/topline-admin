<template>
  <el-row class="app-header">
    <el-col :span="14">江苏传智播客科技股份有限公司</el-col>
    <el-col :span="10" :offset="16">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
           <img width="25"  :src="userInfo.photo">
            {{userInfo.name}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>账户设置</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'AppHeader',
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    this.userInfo = JSON.parse(window.localStorage.getItem('user_info'))
    // 这里是获取localStorage的token信息 格式是js对象
  }
}
</script>

<style lang="less" scoped>
.app-header{
  height: 60px;
  display: flex;
  align-items: center;
}
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;

  }
</style>
