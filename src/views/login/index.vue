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
      },
      captchaObj: null// 通过 initGeetest 得到的极验验证码对象
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
      if (this.captchaObj) {
        return this.captchaObj.verify()
      }
      axios({
        methods: 'GET',
        url: `http://ttapi.research.itcast.cn/mp/v1_0/captchas/${mobile}`
      }).then(res => {
        const data = res.data.data
        window.initGeetest({
          // 以下配置多数来自服务器 SDK
          gt: data.gt,
          challenge: data.challenge,
          offline: !data.success,
          new_captcha: data.new_captcha,
          product: 'bind' // 隐藏按钮
        }, (captchaObj) => {
          this.captchaObj = captchaObj
          // 这里可以调用验证实例 captchaObj 的实例方法
          captchaObj.onReady(function () {
            // 只有ready才能显示验证码
            captchaObj.verify() // 显示验证码
          }).onSuccess(function () {
            const {
              geetest_challenge: challenge,
              geetest_seccode: seccode,
              geetest_validate: validate } =
            captchaObj.getValidate()
            axios({
              method: 'GET',
              url: `http://ttapi.research.itcast.cn/mp/v1_0/sms/codes/${mobile}`,
              params: { // 专门用来查询query查询字符串参数
                challenge,
                seccode,
                validate
              }
            }).then(res => {
              console.log(res.data)
            })
          })
        })
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
