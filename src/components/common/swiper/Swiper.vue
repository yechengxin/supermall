<template>
  <swiper ref="mySwiper" :options="swiperOptions">
    <slot></slot>
    <div class="swiper-pagination swiper-pagination-banner" slot="pagination"></div>
  </swiper>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "carrousel",
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination",
          clickable: true // 允许点击小圆点跳转
        },
        speed: 300,
        autoplay: {
          disableOnInteraction: false
        },
        loop: true
      }
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    }
  }
};
</script>
<style scoped>
</style>