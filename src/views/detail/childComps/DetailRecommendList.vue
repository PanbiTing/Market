<template>
  <div class="recommend-list">
    <div class="list-header">热门推荐</div>
    <grid-view>
      <goods-list-item v-for="(item, index) in recommendList"
                       :key="index"
                       :goods-item="item">
      </goods-list-item>
    </grid-view>
    
  </div>
</template>

<script>
import GridView from 'components/common/GridView/GridView'
import GoodsListItem from 'components/content/goods/GoodsListItem'
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
    GridView,
    GoodsListItem
  }
}
</script>

<style scoped>
.recommend-list {
  padding: 5px 12px;
  color: #333;
}
.list-header {
  font-size: 15px;
  height: 50px;
  line-height: 50px;
}
</style>