<template>
<div>
  <swiper></swiper>
  <card title="" icon="" categories="[]">
    <template #body="{category}">
      <div class="article-list" v-for="(article, i) in category.articleList" :key="i">
      </div>
    </template>
  </card>
</div>
</template>


<script>
import swiper from '../components/Swiper.vue'

export default {
  data(){
    return {
      
    }
  },
  components: {
    swiper,
  }
}
</script>


<style lang = "scss">

</style>