<!--  -->
<template>
  <div id="detail">
    <detail-nav-bar @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="param" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop" /><!-- 给组件添加点击事件必须加上native -->
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from './childComps/DetailBottomBar'

import GoodsList from "components/content/goods/GoodsList";

import Scroll from "components/common/scroll/Scroll";


import { itemImgListenerMixin, backTopMixin } from "common/mixin";

import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam
} from "network/detail";


import { debounce } from "common/utils";

//为了将vuex的actions中的方法映射进该组件而需要的方法
import {mapActions} from 'vuex'

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    Scroll,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
  },
  mixins: [itemImgListenerMixin, backTopMixin],
  data() {
    return {
      iid: "",
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      goodsList: [],
      themeTops: [],
      currentIndex: 0,
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
    };
  },
  created() {
    //1.获取商品id
    this.iid = this.$route.params.iid;
    // 2.发送商品请求
    this._getDetail(this.iid);
    // 3.请求推荐请求
    this._getRecommend();
    // 4.给getThemeTopY赋值（对给this.themeTopYs赋值的操作进行防抖）
    this.getThemeTopY = debounce(() => {
      //计算商品 参数 评论 推荐的高度
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(-this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(-this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(-this.$refs.recommend.$el.offsetTop);
    }, 100);
  },
  //mounted() {
  //   //用mixin混入替换了
  //   //调用防抖动函数
  //   const refresh = debounce(this.$refs.scroll.refresh, 500);
  //   this.itemImgListener = () =>{
  //     refresh();
  //   }
  //   this.$bus.$on("itemImageLoad", this.itemImgListener);
  //},
  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  methods: {
    //将vuex的actions中的addCart方法映射进该组件
    ...mapActions({
        addCart: 'addCart'
      }),
    //网络请求 获取数据
    _getDetail(iid) {
      getDetail(iid).then(res => {
        // 1.获取数据
        const data = res.result;

        // 2.获取顶部的图片数据
        this.topImages = data.itemInfo.topImages;

        //3.获取商品信息
        this.goods = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );

        // 4.获取店铺信息
        this.shop = new Shop(data.shopInfo);

        // // 5.获取商品详细信息
        this.detailInfo = data.detailInfo;

        // // 6.保存参数信息
        this.paramInfo = new GoodsParam(
          data.itemParams.info,
          data.itemParams.rule
        );

        // // 7.保存评论数据
        if (data.rate.list) {
          this.commentInfo = data.rate.list[0];
        }
      });
    },
    //请求推荐数据
    _getRecommend() {
      getRecommend().then(res => {
        this.recommends = res.data.list;
      });
    },
    //监听商品详细信息中的图片是否加载完成
    imageLoad() {
      this.$refs.scroll.refresh();

      this.getThemeTopY();
    },
    //点击title滚动到相应的地方
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, this.themeTopYs[index], 100);
    },
    //监听滚动
    contentScroll(position) {
      //回到顶部
      this.isShowBackTop = -position.y > 1000;
      //滚动内容对应标题
      const positionY = position.y;
      let length = this.themeTopYs.length;
      for (let i = 0; i < this.themeTopYs.length; i++) {
        if (
          this.currentIndex !== i &&
          ((i < length - 1 &&
            positionY <= this.themeTopYs[i] &&
            positionY > this.themeTopYs[i + 1]) ||
            (i === length - 1 && positionY <= this.themeTopYs[i]))
        ) {
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
    },
    //监听点击加入购物车的事件
    addToCart() {
      //获取购物车需要展示的数据
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid
    

      this.addCart(product).then(res => {
	        this.$toastMessage({message: res, time: 1000})
        })

      // this.$store.dispatch('addCart', product).then(res=>{
      //   console.log(res);
      // })

	  },
  }
};
</script>
<style scoped>
#detail {
  height: 100vh;
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  position: absolute;
  top: 44px;
  bottom: 58px;
  left: 0;
  right: 0;
}
</style>
