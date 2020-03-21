<template>
  <div class="card bg-white">
  <card-header :title="title" :icon="icon"></card-header>
    <van-tabs v-model="active" 
    :background="'#fff'" 
    :color="'#db9e3f'" 
    :swipeable="true" 
    :lazy-render	= "false" 
    :animated = "true"
    :title-active-color="'#db9e3f'">
      <van-tab :title="category.name" v-for = "(category, i) in categories" :key="i">
        <slot name="body" :category="category"></slot>
      </van-tab>
    </van-tabs>
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
    
  }
}
</script>


<style lang="scss">
.card{
  padding: 0.8rem;
  border-top: 0.01rem solid #d4d9de;
  border-bottom: 0.01rem solid #d4d9de;
}
</style>>