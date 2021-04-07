<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: "Scroll",
  data() {
    return {
      scroll: null
    }
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    // 1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })

    // 默认情况下BScroll不能监听滚动位置
    // probeType：侦测 
    // 0和1不侦测，
    // 2：在手指滚动过程侦测，手指离开后的惯性滚动过程中不侦测；
    // 3：只要滚动就侦测

    // 2.监听滚动的位置
    if(this.probeType === 2 || this.probeType === 3){
      this.scroll.on('scroll', (position) => {
        this.$emit('scroll',position)
      })
    }


    // 3.监听滚动到底部的上拉加载更多
    if(this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp')
      // 1.发送网络请求，请求更多页的数据
      // 2.等数据请求完成后，并将新的数据展示出来后，使用finishPullUp
     })
    }
  },
  methods: {
    // 回到顶部
    scrollTo(x,y,time=300) {
      this.scroll && this.scroll.scrollTo(x,y,time);
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
      // console.log("----");
    }
  }
}
</script>

<style scoped>
</style>