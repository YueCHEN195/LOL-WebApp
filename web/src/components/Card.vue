<template>
  <div class="card bg-white">
    <div class="card-header">
      <i class="iconfont" :class="`icon-${icon}`"></i>
      <div class="title fs-lg">{{title}}</div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props:{
    title:{type: String,required: true, default:'新闻资讯'},
    icon: {type: String, required: true, default: 'news1'}
  }
}
</script>

<style lang="scss" scoped>
.card{
  padding: 0.8rem;
  border-top: 0.01rem solid #d4d9de;
  border-bottom: 0.01rem solid #d4d9de;
  .card-header{
    display:flex;
    padding-bottom: 0.8rem;
    .title{
      font-weight:600;
      flex:1;
      margin-left: 0.5rem;
    }
  }
  .card-body{
    .nav-bar{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.8rem;
      border-top: 0.01rem solid #d4d9de;
      .nav-item{
        border-bottom: 3px solid transparent;
      }
      .router-link-active{
        color:#db9e3f;
        border-bottom: 3px solid #db9e3f;
      }
    }
  }
}
</style>