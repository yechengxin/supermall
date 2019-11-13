<template>
  <div id="shop-item">
    <div class="item-selector">
      <CheckButton @checkBtnClick="checkedChange" v-model="itemInfo.checked"></CheckButton>
    </div>
    <div class="item-img">
      <img :src="itemInfo.image" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">{{itemInfo.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{itemInfo.price}}</div>
        <button class="right btcut" @click="cut">-</button>
        <div class="item-count right">x{{itemInfo.count}}</div>
        <button class="right btadd" @click="add">+</button>  
      </div>
    </div>
  </div>
</template>

<script>

  import CheckButton from 'components/content/checkButton/CheckButton'

  export default {
    name: "ShopCartItem",
    props: {
      itemInfo: Object
    },
    components: {
      CheckButton
    },
    methods: {
      checkedChange: function () {
        this.itemInfo.checked = !this.itemInfo.checked;
      },
      cut() {
        if(this.itemInfo.count === 1){
          this.$toastMessage({message: "当前数量为1，不可再减少", time: 1000})
        }else{
          this.$store.dispatch('cutCount',this.itemInfo.iid)
        }
               
      },
      add() {
        this.$store.dispatch('addCount',this.itemInfo.iid)       
      },
    }
  }
</script>

<style scoped>
  #shop-item {
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }

  .item-selector {
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item-title, .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .item-img {
    padding: 5px;
    /*border: 1px solid #ccc;*/
  }

  .item-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }

  .item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }

  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }

  .info-bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }

  .btcut{
    margin-left: 5px;
  }

  .btadd{
    margin-right: 5px;
  }
  .info-bottom button{
    border-radius: 5px; 
    width: 17px;
    height: 19px;
    border: none;
    outline:none;
  }
  .info-bottom .item-price {
    color: orangered;
  }
</style>
