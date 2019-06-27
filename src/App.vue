<template>
  <div id="app">
    <!-- <h1>{{foo}}</h1> -->
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {}
  }
}
</script>
<style lang="less" scope>
#app {
  height: 100%;
}
</style>
