<template>
  <div class="shop-info">
    <div class="shop-top">
      <img :src="shop.logo" alt="">
      <span class="shop-name">{{shop.name}}</span>
    </div>
    <div class="shop-middle">
      <div class="shop-middle-item shop-middle-left"> 
        <div class="info-sells">
          <div class="sells-count">{{shop.sells | sellCountFilter}}</div>
          <div class="sells-text">总销量</div>
        </div>
        <div class="info-goods">
          <div class="goods-count">{{shop.goodsCount}}</div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>
      <div class="shop-middle-item shop-middle-right">
        <table>
          <tr v-for="(item,index) in shop.score" :key="index">
            <td>{{item.name}}</td>
            <td class="score" :class="{'score-better': item.isBetter}">{{item.score}}</td>
            <td class="better" :class="{'better-more': item.isBetter}">
              <span>{{item.isBetter ? '高':'低'}}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shop: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  filters: {
    // 过滤器，转换10000以上的数字（格式：value | 函数名）
    sellCountFilter: function(value) {
      if(value < 10000) return value;
      return (value/10000).toFixed(1) + '万'
    }
  }
}
</script>

<style scoped>

.shop-info {
  padding: 25px 8px;
  border-bottom: 5px solid  rgba(221, 220, 220, 0.8);
}
.shop-top{
  line-height: 45px;
  /* 让元素垂直中心对齐 */
  display: flex;
  align-items: center;
}
.shop-top img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 1px solid rgba(221, 220, 220, 0.8);
}
.shop-top .shop-name {
  margin-left: 10px;
  /* 垂直居中 */
  vertical-align: center; 
}

.shop-middle {
  padding: 10px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
}
.shop-middle-item {
  flex: 1;
}
.shop-middle-left {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-evenly;
  color: #333;
  text-align: center;
  border-right: 1px solid rgba(221, 220, 220, 0.8);
}
.sells-count, .goods-count {
    font-size: 18px;
}
.sells-text, .goods-text {
  margin-top: 10px;
  font-size: 12px;
}
.shop-middle-right {
  font-size: 13px;
  color: #333;
}
.shop-middle-right table {
  width: 120px;
  margin-left: 30px;
}
.shop-middle-right table td {
  padding: 5px 0;
}
.shop-middle-right .score {
  color: #5ea732;
}
.shop-middle-right .score-better {
  color: #f13e3a;
}
.shop-middle-right .better span {
  background-color: #5ea732;
  color: #fff;
  text-align: center;
}
.shop-middle-right .better-more span {
  background-color: #f13e3a;
}
.shop-bottom {
  text-align: center;
  margin-top: 10px;
}
.enter-shop {
  /* 父级元素设置text-align:center;,自身元素设置display: inline-block;即可水平居中 */
  display: inline-block;
  font-size: 14px;
  background-color: #f2f5f8;
  width: 150px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-radius: 10px;
  background-color: var(--color-tint);
  color: #fff;
}

</style>