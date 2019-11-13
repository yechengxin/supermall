<!--  -->
<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Bscroll from "better-scroll";
export default {
  name: "Scroll",
  data() {
    return {
      scroll: null
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    //创建scroll对象
    this.scroll = new Bscroll(this.$refs.wrapper, {
      //使div span等标签的原生点击事件生效
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    });

    //监听滚动的位置
    this.scroll.on("scroll", position => {
      this.$emit("scroll", position);
    });

    //监听上拉事件
    this.scroll.on("pullingUp", () => {
      this.$emit("pullingUp");
    });
  },
  methods: {
      //内容滚动到指定的坐标
    scrollTo(x = 0, y = 0, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    //上拉刷新完成
    finishPullUp() {
      this.scroll.finishPullUp();
    },
    //刷新scroll的高度
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    //获取当前scroll的y值
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  }
};
</script>
<style scoped>
.wrapper {
    overflow: hidden;
  }
</style>