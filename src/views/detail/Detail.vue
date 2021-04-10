<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="navbar"/>
    <scroll class="content" 
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll">
      <!-- html不区分大小写 所以属性：topImages 传入值：top-images -->
      <detail-swiper :top-images="topImages" ref="swiper"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imgload="imgload"/>
      <detail-params-info :param-info="paramInfo" ref="param"></detail-params-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <detail-recommend-list :recommend-list="recommendList" ref="recommend"></detail-recommend-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamsInfo from './childComps/DetailParamsInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailRecommendList from './childComps/DetailRecommendList'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import Scroll from 'components/common/scroll/Scroll'

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail"
  import {debounce} from 'common/utils'
  import {backTopMixin} from 'common/mixin'


  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamsInfo,
      DetailCommentInfo,
      DetailRecommendList,
      Scroll,
      DetailBottomBar
    },
    mixins: [backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommendList: [],
        themeTopsY: [],
        getTitleTopY: "",
        currentIndex: 0
      }
    },
    created() {
      // 1.保存传入的iid
      this.iid = this.$route.params.iid

      // 2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // 1.获取顶部的图片轮播数据
        console.log(res);
        const data = res.result;
        this.topImages = data.itemInfo.topImages

        // 2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        // 3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)

        // 4.保存商品的详情数据
        this.detailInfo = data.detailInfo;

        // 5.获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        // 6.获取评论信息
        if(data.rate.list) {
          this.commentInfo = data.rate.list[0]
        }
      })

      // 3.保存推荐信息
      getRecommend().then((res) => {
        this.recommendList = res.data.list
      })

      // 4.获取不同组件的offsetTop,进行防抖，在渲染完成后获取
      this.getTitleTopsY = debounce(() => {
        this.$nextTick(() => {
          this.themeTopsY.push(0)
          this.themeTopsY.push(this.$refs.param.$el.offsetTop-44)
          this.themeTopsY.push(this.$refs.comment.$el.offsetTop-44)
          this.themeTopsY.push(this.$refs.recommend.$el.offsetTop-44)
          this.themeTopsY.push(Number.MAX_VALUE)
          console.log(this.themeTopsY)
        })
      },50)
    },
    mounted() {
      // 解决better-scroll滑动问题，每次加载完图片refresh
      const refresh = debounce(this.$refs.scroll.refresh,50)
      this.$bus.$on('goodsimgload', () => {
        refresh();
      })
    },
    methods: {
      // 点击滑动到相应的主题
      titleClick(index) {
        this.$refs.scroll.scrollTo(0,-this.themeTopsY[index],200)
      },
      // 获取主题y值
      imgload() {
        this.getTitleTopsY()
      },
      // 滑动导航栏变化
      contentScroll(position) {
        // 1.判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000;

        // 2.获取y值
        const positionY = -position.y
        const length = this.themeTopsY.length
        // 3.positionY和详情页主题值比较
        for(let i = 0; i < length-1; i++) {
          if(positionY >= this.themeTopsY[i] && positionY < this.themeTopsY[i+1]){
            if(this.currentIndex !== i){
              this.currentIndex = i
            }
            break;
          }
        }
        this.$refs.navbar.currentIndex = this.currentIndex
      },
      addToCart() {
        // 1.获取购物车要展示的信息
        const product = {}
        product.iid = this.iid
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.newPrice = this.goods.newPrice
        // 2.添加到Store中
        this.$store.commit('addCart', product)
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px - 58px);
  }
</style>
