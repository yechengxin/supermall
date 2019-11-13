<!--  -->
<template>
  <div>
    <h2>本周流行</h2>
  <div class="feature">
    <div v-for="(item,index) in features" :key="index" class="feature-item">
      <img :src="item.image" />
      <div>{{item.title}}</div>
    </div>
  </div>
  </div>
  
</template>

<script>
export default {
  name: "FeatureView",
  props: {
    features: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>
<style scoped>
.feature {
  display: flex;
  text-align: center;
  font-size: 12px;
  padding: 5px 0 20px 0;
  border-bottom: 8px solid #eee;
  width: 100%;
  flex-wrap: wrap;
}
h2 {
  text-align: center;
  margin-top: 10px;
}
.feature-item {
  flex: 1;
  width: 25%;
}
.feature-item img {
  width: 70%;
  height: 70%;
  margin-top: 10px;
}
</style>