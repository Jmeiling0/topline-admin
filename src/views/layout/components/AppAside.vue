<template>
<!--
  el-menu
    default-active 指定默认激活的菜单栏
    @open @close 展示和收起菜单栏单项的时候会触发
    text-color  设置菜单栏文本颜色
    active-text-color 设置激活时候的高亮颜色
    router 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转
  el-submenu
    index 导航表示,可以用作路由导航路径,必须唯一
 -->
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      router
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="/">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-s-order"></i>
          <span>内容管理</span>
        </template>
       <el-menu-item index="/publish">
        <i class="el-icon-document-copy"></i>
        <span slot="title">发布文章</span>
      </el-menu-item>
       <el-menu-item index="/article">
        <i class="el-icon-document"></i>
        <span slot="title">内容列表</span>
      </el-menu-item>
      <el-menu-item index="1-4">
        <i class="el-icon-edit-outline"></i>
        <span slot="title">评论列表</span>
      </el-menu-item>
       <el-menu-item index="1-5">
        <i class="el-icon-menu"></i>
        <span slot="title">素材管理</span>
      </el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span>粉丝管理</span>
        </template>
       <el-menu-item index="2-2">
        <i class="el-icon-s-data"></i>
        <span slot="title">图文数据</span>
      </el-menu-item>
       <el-menu-item index="2-3">
        <i class="el-icon-s-check"></i>
        <span slot="title">粉丝概况</span>
      </el-menu-item>
      <el-menu-item index="2-4">
        <i class="el-icon-picture"></i>
        <span slot="title">粉丝画像</span>
      </el-menu-item>
       <el-menu-item index="2-5">
        <i class="el-icon-user"></i>
        <span slot="title">粉丝列表</span>
      </el-menu-item>
      </el-submenu>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">账户设置</span>
      </el-menu-item>
    </el-menu>
</template>

<script>
export default {
  name: 'AppAside',
  data () {
    return {}
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="less" scoped>
.el-menu{
  height: 100%;
}
</style>
