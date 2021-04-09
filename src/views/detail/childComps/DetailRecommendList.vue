<template>
  <div class="recommend-list">
    <div class="list-header">热门推荐</div>
    <div class="list-content">
      <detail-goods-list-item v-for="(item, index) in recommendList"
                              :key="index"
                              :goods-item="item">
      </detail-goods-list-item> 
    </div> 
  </div>
</template>

<script>
import DetailGoodsListItem from './DetailGoodsListItem.vue'
export default {
  name: "DetailRecommendList",
  props: {
    recommendList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    DetailGoodsListItem
  }
}
</script>

<style scoped>
.recommend-list {
  padding: 5px 8px;
  color: #333;
}
.list-header {
  font-size: 15px;
  height: 50px;
  line-height: 50px;
}
.list-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
</style>