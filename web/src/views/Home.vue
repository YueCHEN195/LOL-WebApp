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
  <card title="英雄列表" icon="news1" :categories="HeroCates">
    <template #body="{category}">
      <div class="hero-container">
        <div class="hero-item" v-for="(hero, i) in category.heroList" :key="i">
          <div><img :src="hero.img"></div>
          <div style="text-align:center">{{hero.title}}</div>
        </div>
      </div>
      <div class="show-more" @click="state = !state">
        <van-icon v-if="state" name="arrow-up" />
        <van-icon v-if="!state" name="arrow-down" />
        {{msg}}
      </div>
    </template>
  </card>
</div>
</template>


<script>
import swiper from '../components/Swiper.vue'
import dayjs from 'dayjs'
export default {
  data(){
    return {
      articleCats: [],
      fullHeroCats: [],
      lessHeroCats:[],
      msg: '展开',
      state: false
    }
  },
  components: {
    swiper,
  },
  methods: {
    errorMessage(){
      
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
        this.fullHeroCats = res.data
        this.lessHeroCats = JSON.parse(JSON.stringify(this.fullHeroCats))
        for(let i = 0;i < this.lessHeroCats.length;i++){
          this.lessHeroCats[i].heroList = this.lessHeroCats[i].heroList.slice(0,15)
        }
      }catch(e){
        this.errorMessage()
        console.log(e)
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
  computed: {
    HeroCates(){
      if(!this.state){
        return this.lessHeroCats
      }else{
        
        return this.fullHeroCats
      }
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
.show-more{
  text-align: center;
}
</style>