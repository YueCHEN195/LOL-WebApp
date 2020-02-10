<template>
<div>
  <swiper></swiper>
  <card title="新闻资讯" icon="news1" :categories="articleCats">
    <template #body="{category}">
      <div class="article-list" v-for="(article, i) in category.articleList" :key="i">
        <span class="title">[{{category.name}}] | {{article.title}}</span>
        <span>{{article.updatedAt | timeFilter}}</span>
      </div>
    </template>
  </card>
  <card title="英雄列表" icon="news1" :categories="heroCats">
    <template #body="{category}">
      <div class="hero-container">
        <div class="hero-item" v-for="(hero, i) in category.heroList" :key="i">
          <div><img :src="hero.img"></div>
          <div style="text-align:center">{{hero.title}}</div>
        </div>
      </div>
    </template>
  </card>
</div>
</template>


<script>
import swiper from '../components/Swiper.vue'
import { Toast } from 'mint-ui'
import dayjs from 'dayjs'


export default {
  data(){
    return {
      articleCats: [],
      heroCats: []
    }
  },
  components: {
    swiper,
  },
  methods: {
    errorMessage(){
      Toast({
        message: '网络开小差啦~',
        position: 'bottom',
        duration: 5000
      })
    },
    async getArticleCat(){
      try{
        const res = await this.$http.get('article/list')
        this.articleCats = res.data
      }catch(e){
        this.errorMessage()
      }
    },
    async getHeroCat(){
      try{
        const res = await this.$http.get('hero/list')
        this.heroCats = res.data
      }catch(e){
        this.errorMessage()
      }
    }
  },
  created() {
    this.getArticleCat()
    this.getHeroCat()
  },
  filters:{
    timeFilter(val){
      return dayjs(val).format('MM/DD')
    }
  },
}
</script>


<style lang = "scss">
.article-list{
  display: flex;
  justify-content: space-between;
  padding:0.3rem;
  .title{
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.hero-container{
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  .hero-item{
    width:17%;
    margin: 0.3rem;
  }
}
</style>