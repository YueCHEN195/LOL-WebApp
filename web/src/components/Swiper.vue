<template>
  <mt-swipe :auto="4000">
    <mt-swipe-item>
      <img src="../assets/1.png">
    </mt-swipe-item>
    <mt-swipe-item>
      <img src="../assets/2.jpeg">
    </mt-swipe-item>
    <mt-swipe-item>
      <img src="../assets/3.jpeg">
    </mt-swipe-item>
    <mt-swipe-item>
      <img src="../assets/4.jpeg">
    </mt-swipe-item>
  </mt-swipe>
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
.mint-swipe{
  height:11rem !important;
  margin-bottom: 1rem;
  .mint-swipe-indicators{
    left: 80%;
    transform: translateX(-5%);
    .mint-swipe-indicator{
      width:0.5rem;
      height:0.5rem;
      opacity: 1;
      background-color: #fff;
      border-radius: 0;
      margin:0.3rem;
    }
    .is-active{
      background-color: #4b67af;
      opacity: 1;
    }
  }
}
</style>
