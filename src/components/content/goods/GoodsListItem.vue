<!--  -->
<template>
  <div class="goods-item" @click="itemClick">
    <!-- 监听图片加载完 -->
    <img :src="showImage" @load="imageload"/>
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    imageload() {
      // 发射一个事件到事件总线中
      this.$bus.$emit('itemImageLoad')
    },
    itemClick(){
      //推荐里是shop_id  但没有shop_id对应商品的详细数据
      if(this.goodsItem.iid != undefined ){
        this.$router.push('/detail/' + this.goodsItem.iid)
      }else{
        //this.$router.push('/detail/' + this.goodsItem.shop_id)
      }
      // this.$router.push({
      //   path: '/detail',
      //   query: {

      //   }
      // })
    }
  },
  computed: {
    showImage() {
      return this.goodsItem.image  || this.goodsItem.img || this.goodsItem.show.img
    }
  }
};
</script>
<style scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>