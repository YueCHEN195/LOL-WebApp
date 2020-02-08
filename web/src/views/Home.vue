<template>
<div>
  <swiper></swiper>
  <card title="新闻资讯" icon="news1">
    <div class="card-body">
      
      <div class="nav-bar">
        <div class="nav-item">
          <router-link to="/" tag="span">新闻</router-link>
        </div>
        <div class="nav-item">
          <router-link to="/123" tag="span">公告</router-link>
        </div>
        <div class="nav-item">
          <router-link to="/333" tag="span">活动</router-link>
        </div>
        <div class="nav-item">
          <router-link to="/333" tag="span">赛事</router-link>
        </div>
      </div>

    </div>
  </card>
</div>
</template>


<script>
import swiper from '../components/Swiper.vue'
import card from '../components/Card.vue'
export default {
  data(){
    return {
      
    }
  },
  components: {
    swiper,
    card
  }
}
</script>


<style lang = "scss">

</style>