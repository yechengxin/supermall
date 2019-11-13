<!--  -->
<template>
  <div id="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list :cart-list="cartList" />
    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

import { mapGetters } from 'vuex' //为了使getters中的函数转成计算属性

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  data() {
    return {
      
    };
  },
  computed: {
    //getters内容转为计算属性
    ...mapGetters(['cartLength','cartList']),
    //第二种方式
    // ...mapGetters({
    //   length: 'cartLength',
    //   list: 'cartList'
    // })
  },
};
</script>
<style scoped>
#cart{
  height: 100vh;
  position: relative;
}
.nav-bar{
  background-color: var(--color-high-text);
  color: #fff;
}
</style>