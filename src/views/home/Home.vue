<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']" 
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="tab-control"
                 v-show="isTabFixed"
                 @click.native="tabBackClick"></tab-control>    
    <!-- :probe-type传入具体类型，不加冒号会传入字符串 -->
    <scroll class="content" 
            ref="scroll" 
            :probe-type="3"
            :pull-up-load="true"
            @scroll="contentScroll"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" 
                   @tabClick="tabClick"
                   ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView';

  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'
  import TabControl from 'components/content/tabcontrol/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import BackTop from 'components/content/backtop/BackTop'

  import {getHomeMultidata, getHomeGoods} from "network/home";
  import {debounce} from 'common/utils'

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false
      }
    },
   
    created() {
      // 1.请求多个数据
      this.getHomeMultidata()

      // 2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted() {
      // 1.监听item中图片加载完成
      //  防抖操作
      const refresh = debounce(this.$refs.scroll.refresh,50);
      // 事件总线接受事件（孙子传给爷爷）
      this.$bus.$on('itemImageLoad', () => {
        refresh();
        // 在闭包内，不会被销毁
      })
    },
    methods: {
      /** 事件监听相关方法 */
      tabClick(index) {
        switch(index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break;
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      // 返回顶部
      backClick() {
        this.$refs.scroll.scrollTo(0,0)
      },
      // 返回类型顶部
      tabBackClick() {
        this.$refs.scroll.scrollTo(0,-this.tabOffsetTop,0)
      },
      contentScroll(position) {
        // 1.判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000;

        // 2.决定tabControl是否吸顶（position: fixed）
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore() {
        // 加载更多
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad() {
        // 获取tabControl的offsetTop
        // 所有的组件都有一个属性$el：用于获取组件中的元素
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      },
      

      /** 网络请求相关方法 **/
      getHomeMultidata() {
        getHomeMultidata().then(res => {
        // this.result = res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page +1
        getHomeGoods(type,page).then(res => {
          // 解构数组
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;
          // 完成上拉加载更多
          this.$refs.scroll.finishPullUp()
        })
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    
  }
</script>

<style scoped>
  #home {
    /* padding-top: 44px; */
    /* vh:viewport heigh视口高度 */
    height: 100vh;
    position: relative;
  }

  .home-nav {
    color: #fff;
    background: var(--color-tint);
    font-size: 18px;
    /* 在使用浏览器原生滚动时固定导航栏 */
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }

  .tab-control {
    position: relative;
    z-index: 9;
    top:-1px;
  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  /* .content {
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */
</style>