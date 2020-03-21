<template>
  <div id="main-container">
    <van-tabs v-model="active" 
    :background="'#db9e3f'" 
    :color="'#fff'" 
    :title-inactive-color="'#fff'"
    :title-active-color="'#fff'">
      <van-tab title="首页" to="/"></van-tab>
      <van-tab title="攻略中心" to="/strategy"></van-tab>
      <van-tab title="赛事中心" to="/game"></van-tab>
    </van-tabs>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>


<script>


export default {
  data(){
    return {
      active: 0
    }
  }
}
</script>


<style lang = "scss">
</style>