<template>
  <swiper class="swiper">
    <swiper-item class="item" v-for="(item,index) in topImages" :key="index">
      <img :src="item"/>
    </swiper-item>
  </swiper>
</template>

<script>
import Swiper from "components/common/swiper/Swiper";
import SwiperItem from "components/common/swiper/SwiperItem";

	export default {
		name: "DetailSwiper",
    components: {
			Swiper,
      SwiperItem
    },
    props: {
			topImages:  {
        type: Array,
        default() {
          return []
        }
      }
    }
	}
</script>

<style scoped>
.item img {
  width: 100%;
  height: 300px;
  overflow: hidden;
}
</style>