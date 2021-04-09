<template>
  <swiper>
    <swiper-item v-for="(item,id) in banners" :key="id">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'
export default {
  name: "HomeSwiper",
  data() {
    return {
      isLoad: false
    }
  },
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    Swiper, 
    SwiperItem 
  },
  methods: {
    imageLoad() {
      // 只获取一个值
      if(!this.isLoad){
        // 轮播图加载完毕后获取tabControl的offsetTop
        this.$emit('swiperImageLoad');
        this.isLoad = true;
      }
      
    }
  }
}
</script>

<style scoped>

</style>