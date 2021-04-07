import {request} from './request'

export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

export function getRecommend() {
  return request({
    url:'/recommend',
  })
}

export class Goods {
  constructor(itemInfo, columns,services) {
    this.title = itemInfo.title //商品标题
    this.desc = itemInfo.desc //商品介绍
    this.newPrice = itemInfo.price //商品现价
    this.oldPrice = itemInfo.oldPrice //商品旧价
    this.discount = itemInfo.discountDesc //商品折扣
    this.services = services //商品售后服务
    this.realPrice = itemInfo.lowNowPrice //商品最低价
    this.columns = columns //商品销量、收藏、发货信息
  }
}

export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo //店铺logo
    this.name = shopInfo.name //店铺名字
    this.fans =shopInfo.cFans //店铺人气
    this.sells = shopInfo.cSells //店铺总销量
    this.score = shopInfo.score //店铺评价
    this.goodsCount = shopInfo.cGoods //店铺宝贝
  }
}

export class GoodsParam {
  constructor(info, rule) {
    // images可能没有值，需要判断
    this.image = info.images ? info.images[0] : '', //商品图片
    this.infos = info.set; //商品信息
    this.sizes = rule.tables; //尺码表
  }
}