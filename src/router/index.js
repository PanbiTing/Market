import Vue from 'vue'
import VueRouter from 'vue-router'

// 懒加载
const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Shopcart = () => import('views/shopcart/Shopcart')
const Profile = () => import('views/profile/Profile')
const Detail = () => import('views/detail/Detail')

// import Home from 'views/home/Home'
// import Category from 'views/category/Category'
// import Shopcart from 'views/shopcart/Shopcart'
// import Profile from 'views/profile/Profile'

// 1.安装插件
Vue.use(VueRouter)

// 2.创建路由对象
const routes = [
  {
    path: '',
    // redirect重定向
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/shopcart',
    component: Shopcart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail/:iid',
    component: Detail
  }
]
const router = new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'active'
})

// 3.导出router
export default router