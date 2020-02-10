<template>
  <div class="card bg-white">
    <card-header :title="title" :icon="icon"></card-header>
    <div class="nav-bar">
      <div class="nav-item" :class="{active: active == i}" v-for = "(category, i) in categories" :key="i" @click = "$refs.cardSwiper.swiper.slideTo(i)">
        <span>{{category.name}}</span>
      </div>
    </div>
    <swiper ref="cardSwiper" @slide-change="follow" :options="{autoHeight:true}">
      <swiper-slide v-for = "(category, i) in categories" :key="i">
        <slot name="body" :category = "category"></slot>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  props: {
    title: {type: String, required: true},
    icon: {type: String, required: true},
    categories: {type: Array, required: true}
  },
  data(){
    return{
      active: 0
    }
  },
  methods:{
    follow(){
      this.active = this.$refs.cardSwiper.swiper.realIndex
    }
  }
}
</script>


<style lang="scss">
.card{
  padding: 0.8rem;
  border-top: 0.01rem solid #d4d9de;
  border-bottom: 0.01rem solid #d4d9de;
  .nav-bar{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem;
  border-top: 0.01rem solid #d4d9de;
  .nav-item{
    border-bottom: 3px solid transparent;
  }
  .active{
    color:#db9e3f;
    border-bottom: 3px solid #db9e3f;
  }
 }
}
</style>>