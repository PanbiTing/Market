<template>
  <!-- 在使用之前需要先判断数组是否存在, 
  而且需要注意的是需要我们在数组变量所在的外层div中做一个判断该数组是否未定义 -->
  <div class="base-info" v-if="Object.keys(goods).length !== 0 && goods.columns !== undefined">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span class="price-discount" v-if="goods.discount">{{goods.discount}}</span>
    </div>
    <div class="info-columns" >
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-services">
      <!-- 去掉最后一个 -->
      <span class="info-services-item" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon" alt="">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>

  .base-info {
    color: #999;
    margin-top: 15px;
    padding: 0 8px;
    border-bottom: 5px solid  rgba(221, 220, 220, 0.8);
  }

  .info-title {
    color:rgb(36, 35, 35);
    font-size: 16px;
    margin-bottom: 8px;
  }
  .info-price {
    margin-bottom: 28px;
  }
  .n-price {
    color: var(--color-high-text);
    font-size: 24px;
    margin-right: 8px;
  }
  .o-price {
    font-size: 12px;
    padding-top: 6px;
    text-decoration: line-through;
    margin-right: 8px;    
  }
  .price-discount {
    color: #fff;
    background-color: var(--color-tint);
    border-radius: 8px;
    font-size: 12px;
    padding: 2px 5px;
    
    /*让元素上浮一些: 使用相对定位即可*/
    position: relative;
    top: -8px;
  }
  .info-columns {
    display: flex;
    justify-content: space-between;
    height: 20px;
    font-size: 12px;
    margin-bottom: 28px;
    border-bottom: 1px solid rgba(221, 220, 220, 0.8);
  }
  .info-services {
    margin-bottom: 28px;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
  }

  .info-services-item {
    display: flex;
    flex-wrap: nowrap;
    font-size: 12px;
    color: rgb(36, 35, 35);
  }

  .info-services-item img {
    width: 14px;
    height: 14px;
  }


</style>