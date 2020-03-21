<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="4000" :indicator-color="'#4b67af'">
      <van-swipe-item><img src="../assets/1.png"></van-swipe-item>
      <van-swipe-item><img src="../assets/2.jpeg"></van-swipe-item>
      <van-swipe-item><img src="../assets/3.jpeg"></van-swipe-item>
      <van-swipe-item><img src="../assets/4.jpeg"></van-swipe-item>
    </van-swipe>
  </div>
</template>


<script>
export default {
  data(){
    return{

    }
  }
}
</script>

<style lang="scss">
.van-swipe__indicators{
  left: 88%;
  .van-swipe__indicator{
    width:0.5rem;
    height:0.5rem;
    opacity: 1;
    border-radius: 0;
    margin:0.3rem;
  }
}
</style>
