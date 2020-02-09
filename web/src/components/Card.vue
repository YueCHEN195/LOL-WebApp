<template>
  <div>
    <card-header :title="title" :icon="icon">
      <div class="nav-bar">
        <div class="nav-item" :class="{active: active == i}" v-for = "(category, i) in categories" :key="i" @click = "active = i">
          <span>{{category.name}}</span>
        </div>
      </div>
    </card-header>
    <div class="swiper-container">
      <swiper>
        <swiper-slide v-for = "(category, i) in categories" :key=i>
          <slot name="body" :category = "category"></slot>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>





<script>
export default {
  props: {
    title: {type: String, required: true},
    icon: {type: String, required: true},
    categories: {type: String, required: true}
  },
  data(){
    return{
      active: 0
    }
  }
}
</script>


<style lang="scss" scoped>
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
</style>>