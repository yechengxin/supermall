<template>
  <swiper class="swiper">
    <swiper-item class="item" v-for="(item,index) in banners" :key="index">
      <img :src="item.image" @load="imageLoad" />
    </swiper-item>
  </swiper>
</template>

<script>
import Swiper from "components/common/swiper/Swiper";
import SwiperItem from "components/common/swiper/SwiperItem";

export default {
  name: "HomeSwiper",
  data() {
    return {
      isLoaded: false
    };
  },
  props: {
    banners: {
      type: Array,
      required: true
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    imageLoad() {
      if (!this.isLoaded) {
        this.$emit("swipperImageLoad");
        this.isLoaded = true;
      }
    }
  }
};
</script>
<style scoped>
.item img {
  width: 100%;
  height: 100%;
}
</style>