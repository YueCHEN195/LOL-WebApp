<template>
<div>
  <div class="nav-bar bg-primary text-white">
    <div class="nav-item">
      <router-link to="/" tag="span">首页</router-link>
    </div>
    <div class="nav-item">
      <router-link to="/123" tag="span">攻略中心</router-link>
    </div>
    <div class="nav-item">
      <router-link to="/333" tag="span">赛事中心</router-link>
    </div>
  </div>
  <router-view></router-view>
</div>
</template>


<script>


export default {
  
}
</script>


<style lang = "scss" scoped>
.nav-bar{
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-top: 0.7rem;
  padding-bottom: 0.7rem;
  .nav-item{
    border-bottom: 3px solid transparent;
  }
  .router-link-active{
    border-bottom: 3px solid #fff;
  }
}
</style>