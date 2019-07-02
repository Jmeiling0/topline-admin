<template>
<div class="login-wrap">
  <div class="login-from-wrap">
    <div class="login-head">
      <img src="./logo_index.png" alt="黑马头条">
    </div>
    <div class="login-form">
      <!--
        表单验证:
        rules 配置验证规则
        将需要的字段通过 prop 属性配置到 el-from-item 组件上
        ref 获取表单组件, 可以手动调用表单组件的验证方法

       -->
  <el-form :model="form" :rules="rules" ref="ruleForm">
    <el-form-item  prop="mobile">
      <el-input v-model="form.mobile" placeholder="手机号"></el-input>
    </el-form-item>
    <el-form-item  prop="code">
      <el-col :span="10">
        <el-input v-model="form.code" placeholder="验证码"></el-input>
      </el-col>
       <el-col :span="10" :offset="2">
          <!-- <el-button  @click="handleSendCode">获取验证码</el-button> -->
        <el-button  @click="handleSendCode" :disabled="!!codeTimer || codeLoading">{{ codeTimer ? `剩余${codeSecons}秒` : '获取验证码' }}</el-button>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-button class="btn-login" type="primary" @click="handleLogin" :loading="loginLoading">登录</el-button>
    </el-form-item>
    <el-form-item prop="agree">
       <el-checkbox v-model="form.agree" ></el-checkbox>
       <span>我已阅读并同意<a href="#">用户协议</a>和<a href="#">隐私条款</a></span>
    </el-form-item>
  </el-form>
    </div>
  </div>
</div>
</template>

<script>
// import axios from 'axios'
import '@/vendor/gt' // gt.js会向全局window暴露一个函数initGeetest
const initCodeSeconds = 15
export default {
  name: 'AppLogin',
  data () {
    return {
      form: { // 表单数据
        mobile: '15106849157',
        code: '246810',
        agree: '' // 是否同意用户协议
      },
      loginLoading: false, // 登录按钮 loading 状态

      rules: {// 表单验证规则
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { len: 11, message: '长度必须为11个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '长度必须为6个字符', trigger: 'blur' }
        ],
        agree: [
          { required: true, message: '请同意用户协议', trigger: 'change' },
          { pattern: /true/, message: '请同意用户协议', trigger: 'change' }
        ]
      },
      captchaObj: null, // 通过 initGeetest 得到的极验验证码对象
      codeSecons: initCodeSeconds, // 倒计时的时间
      codeTimer: null, // 倒计时定时器
      sendMobile: '', // 保存初始化验证码之后发送短信的手机号
      codeLoading: false
    }
  },
  methods: {
    handleLogin () {
      // 表单组件验证有一个方法 validate 可以用于获取当前表单的验证状态
      this.$refs['ruleForm'].validate(valid => {
        if (!valid) {
          return
        }
        // 表单验证通过,提交登录
        this.submitLogin()
      })
    },
    // 提交登录
    submitLogin () {
      this.loginLoading = true
      this.$http({
        method: 'POST',
        url: '/authorizations',
        data: this.form
      }).then(data => { // axios >=200 && <400的状态码都会进入这里
        // 登录成功,将接口返回的用户信息数据放到本地存储
        // window.localStorage.setItem('user_info', JSON.stringify(res.data.data))
        window.localStorage.setItem('user_info', JSON.stringify(data))
        // Elemnet 提供的message 消息提示组建
        // 这也是组建调用的一种形式
        this.$message({
          message: '登陆成功',
          type: 'success'
        })

        this.loginLoading = false
        // 建议路由跳转都使用 name去跳转,路由传参非常方便
        this.$router.push({
          name: 'home'
        })
      })
        .catch(err => { // >=400 的 http 状态码都会进入到 catch 中
        // console.log(err)
          if (err.response.status === 400) {
            this.$message.error('登录失败,验证码或手机号错误')
          }
          this.loginLoading = false
        })
    },

    handleSendCode () {
      // 校验手机号是否有效
      this.$refs['ruleForm'].validateField('mobile', errorMessage => {
        if (errorMessage.trim().length > 0) {
          return
        }
        // 手机号码验证通过

        // 验证是否有验证码插件对象
        if (this.captchaObj) {
        // 手机号码有效,初始化验证码插件
        // this.showGeetest()
        // 如果用户输入的手机号和之前的验证码手机号不一致,就基于当前手机号重新初始化
        // 否则,直接verify显示
          if (this.form.mobile !== this.sendMobile) {
          // 手机验证码发生改变,重新初始化验证码插件

            // 重新初始化之前,将原来的验证码插件DOM删除
            document.body.removeChild(document.querySelector('.geetest_panel'))
            this.showGeetest()
          } else {
          // 一致,直接verify
            this.captchaObj.verify()
          }
        } else {
          // 这里是第1次的初始化验证码插件
          this.showGeetest()
        }
      })
    },
    showGeetest () {
      // 函数中的function函数中的this指向window

      // 初始化验证码期间,禁用按钮的点击状态
      this.codeLoading = true
      const { mobile } = this.form
      // console.log(this.form)
      // console.log(this.form.mobile)
      console.log({ mobile })
      if (this.captchaObj) {
        return this.captchaObj.verify()
      }

      // 调用 获取短信验证码 (极验 API2) 接口,发送短信
      this.$http({
        methods: 'GET',
        url: `/captchas/${this.form.mobile}`
      }).then(data => {
        // const data = res.data.data
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
          captchaObj.onReady(() => {
            // 只有ready才能显示验证码
            this.sendMobile = this.form.mobile
            captchaObj.verify() // 显示验证码
            // 验证码初始化好了 ,让 "获取验证码可以点击"
            this.codeLoading = false
          }).onSuccess(() => {
            const {
              geetest_challenge: challenge,
              geetest_seccode: seccode,
              geetest_validate: validate } =
            captchaObj.getValidate()
            this.$http({
              method: 'GET',
              url: `/sms/codes/${this.form.mobile}`,
              params: { // 专门用来查询query查询字符串参数
                challenge,
                seccode,
                validate
              }
            }).then(data => {
              // 发送短信之后,开始倒计时
              this.codeCountDown()
            })
          })
        })
      })
    },
    /** 倒计时 */
    codeCountDown () {
      this.codeTimer = window.setInterval(() => {
        this.codeSecons--
        if (this.codeSecons <= 0) {
          this.codeSecons = initCodeSeconds // 让定时器回到初始状态
          window.clearInterval(this.codeTimer)// 清除倒计时
          this.codeTimer = null // 清除倒计时定时器的标准
        }
      }, 1000)
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
      .el-checkbox{
        margin-right:10px;
      }
  }
</style>
