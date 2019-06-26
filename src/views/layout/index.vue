<template>
  <div>
   <AppAside/>
   <AppHeader/>
  </div>
</template>

<script>
import AppAside from './components/AppAside'
import AppHeader from './components/AppHeder'
export default {
  name: 'AppHeader',
  components: {
    AppAside,
    AppHeader
  },
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>

</style>
