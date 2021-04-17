<template>
  <div id="cart">
    <nav-bar class="cart-nav">
      <div slot="center">购物车({{cartList.length}})</div>
    </nav-bar>
    <cart-list class="cart-list" :cart-list="cartList"></cart-list>
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import CartList from './childComps/CartList'
import BottomBar from './childComps/BottomBar'
export default {
  name: "Shopcart",
  components: {
    NavBar,
    Scroll,
    CartList,
    BottomBar
  },
  computed: {
		cartList() {
		  return this.$store.getters.cartList
    },
    cartCount() {
	    return this.$store.getters.cartCount
    }   
  }
}
    
</script>

<style>
  #cart {
    /*position: relative;*/
    height: 100vh;
  }

  .cart-nav {
    color: #fff;
    background: var(--color-tint);
    font-size: 18px;
  }

  .cart-list {
    position: absolute;
    top: 44px;
    bottom: 49px;
    width: 100%;
  }
</style>