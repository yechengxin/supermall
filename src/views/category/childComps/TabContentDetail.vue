<template>
  <grid-view>
    <goods-list-item v-for="(item, index) in categoryDetail" :goods-item="item" :key="index"></goods-list-item>
  </grid-view>
</template>

<script>
  import GridView from 'common/gridView/GridView'
  import GoodsListItem from 'views/home/childComps/GoodsListItem'

  export default {
    name: "TabContentDetail",
    components: {
      GridView,
      GoodsListItem
    },
    props: {
      categoryDetail: {
        type: Array,
        default() {
          return []
        }
      }
    },
    mounted() {
      console.log(categoryDetail)
    }
  }
</script>

<style scoped>

</style>
