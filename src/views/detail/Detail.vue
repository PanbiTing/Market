<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick"/>
    <scroll class="content" 
            ref="scroll"
            :probe-type="3">
      <!-- html不区分大小写 所以属性：topImages 传入值：top-images -->
      <detail-swiper :top-images="topImages" @DSimgLoad="DSimgLoad"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-params-info :param-info="paramInfo" ref="param"></detail-params-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <detail-recommend-list :recommend-list="recommendList" ref="recommend"></detail-recommend-list>
    </scroll>
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


  import Scroll from 'components/common/scroll/Scroll'

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail";
  import {debounce} from 'common/utils'


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
      Scroll
    },
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
          this.commentInfo = data.rate.list[0];
        }
      })

      // 保存推荐信息
      getRecommend().then((res) => {
        this.recommendList = res.data.list;
      })

      // 获取不同组件的offsetTop,进行防抖，在渲染完成后获取
      this.getTitleTopY = debounce(() => {
        this.$nextTick(() => {
          this.themeTopsY.push(0);
          this.themeTopsY.push(this.$refs.param.$el.offsetTop-44);
          this.themeTopsY.push(this.$refs.comment.$el.offsetTop-44);
          this.themeTopsY.push(this.$refs.recommend.$el.offsetTop-44);
          console.log(this.themeTopsY);
        })
      },50)
    },
    mounted() {
      const refresh = debounce(this.$refs.scroll.refresh,50);
      this.$bus.$on('goodsimgload', () => {
        refresh();
      })
    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh()
        this.getTitleTopY();
      },
      DSimgLoad() {
        const newrefrash = debounce(this.$refs.scroll.refresh,50);
        newrefrash();
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0,-this.themeTopsY[index],200);
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
    overflow: hidden;
    height: calc(100% - 44px);
  }
</style>
