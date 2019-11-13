<!--  -->
<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swipperImageLoad="swipperImageLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view :features="recommends" />
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2" />
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" /><!-- 给组件添加点击事件必须加上native -->
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop";

// import { debounce } from "common/utils";
import { itemImgListenerMixin } from "common/mixin";

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import { getHomeMultidata, getHomeGoods } from "network/home.js";

export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] }, //流行
        new: { page: 0, list: [] }, //新款
        sell: { page: 0, list: [] } //精选
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      index: 0,
      popY: -440,
      newY: -440,
      sellY: -440,
    };
  },
  mixins: [itemImgListenerMixin],
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  activated() {
    //解决页面切换时  首页有时会直接置顶
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
  },
  deactivated () {
    //切换界面时获取scroll的y
    this.saveY = this.$refs.scroll.getScrollY()
    //取消全局事件的监听
    this.$bus.$off( "itemImageLoad", this.itemImgListener)
  },
  components: {
    NavBar,
    Scroll,
    TabControl,
    GoodsList,
    BackTop,
    HomeSwiper,
    RecommendView,
    FeatureView
  },
  created() {
    // 1.请求首页数据
    this._getHomeMultidata();
    // 2.请求首页商品信息
    this._getHomeGoods("pop");
    this._getHomeGoods("new");
    this._getHomeGoods("sell");
  },
  // mounted() {
  //   //用mixins混入替换
  //   //1.图片加载完成的事件监听
  //   //调用防抖动函数
  //   const refresh = debounce(this.$refs.scroll.refresh, 500);
  //   // 监听item中图片加载完成,监听事件总线中的itemImageLoad事件
  //   this.itemImgListener = () =>{
  //     refresh();
  //   }
  //   this.$bus.$on("itemImageLoad", this.itemImgListener);
  // },
  methods: {
    // 事件监听
    //1.当前页面是['流行','新款','精选']哪个
    tabClick(index) {    
      //记录三个页面的scroll的y
      switch (this.index){
        case 0:
          this.popY = this.$refs.scroll.getScrollY()
          if(this.popY === 0){
            this.popY = -440
          }
          break;
        case 1:
          this.newY = this.$refs.scroll.getScrollY()
          break;
        case 2:
          this.sellY = this.$refs.scroll.getScrollY()
          break;
      }
      switch (index) {
        case 0:
          this.$refs.scroll.refresh()
          this.$refs.scroll.scrollTo(0, this.popY, 0)
          this.currentType = "pop";
          break;
        case 1:
          this.$refs.scroll.refresh()
          this.$refs.scroll.scrollTo(0, this.newY, 0)
          this.currentType = "new";
          break;
        case 2:
          this.$refs.scroll.refresh()
          this.$refs.scroll.scrollTo(0, this.sellY, 0)
          this.currentType = "sell";
          break;        
      }
      this.index = index;
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    //2.回到顶部
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    //3.监听scroll的滚动
    contentScroll(position) {
      //是否展示backtop按钮
      this.isShowBackTop = -position.y > 1000;
      //决定tabControl是否吸顶
      this.isTabFixed = -position.y > this.tabOffsetTop;
      //this.isTabFixed = (-position.y) < this.tabOffsetTop;
    },
    //4.下拉加载图片
    loadMore() {
      this._getHomeGoods(this.currentType);
    },
    //5.监听轮播图中图片加载完成
    swipperImageLoad() {
      //获取tabControl的offsetTop(组件没有offsetTop，只能获取组件中div的offsetTop)
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    // 网络请求
    _getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page + 1;
        //完成加载更多
        this.$refs.scroll.finishPullUp();
      });
    },
    _getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    }
  }
};
</script>
<style scoped>
#home {
  position: relative;
  height: 100vh;
}
.home-nav {
  background-color: #75c82b;
  color: white;
}
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-control {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>