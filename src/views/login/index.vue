<template>
<div class="login-wrap">
  <div class="login-from-wrap">
    <div class="login-head">
      <img src="./logo_index.png" alt="黑马头条">
    </div>
    <div class="login-form">
  <el-form ref="form" :model="form">
    <el-form-item>
      <el-input v-model="form.mobile" placeholder="手机号"></el-input>
    </el-form-item>
    <el-form-item>
      <el-col :span="10">
        <el-input v-model="form.code" placeholder="验证码"></el-input>
      </el-col>
       <el-col :span="10" :offset="2">
        <el-button  @click="handleSendCode">获取验证码</el-button>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-button class="btn-login" type="primary" @click="onSubmit">登录</el-button>
    </el-form-item>
  </el-form>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import '@/vendor/gt'
export default {
  name: 'AppLogin',
  data () {
    return {
      form: {
        mobile: '15106849157',
        code: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submint!')
    },
    handleSendCode () {
      const { mobile } = this.form
      // console.log(this.form)
      // console.log(this.form.mobile)
      // console.log({ mobile })
      axios({
        methods: 'GET',
        url: `http://ttapi.research.itcast.cn/mp/v1_0/captchas/${mobile}`
      }).then(res => {
        console.log(res.data)
      })
    }

  }
}
</script>

<style lang="less" scoped>
  .login-wrap {
    height: 100%;
   display: flex;
   //弹性盒子:子盒子水平 垂直居中
   justify-content: center;
   align-items: center;
   background:url('./login_bg.jpg');
   .login-from-wrap{
     background-color: #fff;
     padding: 50px;
     border-radius: 10px;
   }
   .login-head{
     margin-bottom: 30px;
     display:flex;
     justify-content:center;
      align-items: center;
   }
   .el-button{
        width: 100%;
      }
  }
</style>
