<template>
  <div class="card-header">
    <i class="iconfont" :class="`icon-${icon}`"></i>
    <div class="title fs-lg">{{title}}</div>
  </div>
</template>

<script>
export default {
  props:{
    title:{type: String,required: true},
    icon: {type: String, required: true}
  }
}
</script>

<style lang="scss" scoped>
.card-header{
  display:flex;
  padding-bottom: 0.8rem;
  .title{
    font-weight:600;
    flex:1;
    margin-left: 0.5rem;
  }
}
</style>