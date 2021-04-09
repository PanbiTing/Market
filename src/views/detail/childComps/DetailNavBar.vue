<template>
  <div>
    <nav-bar >
      <div slot="left" class="back">
        <img src="~assets/img/common/back.svg" alt="" @click="backClick">
      </div>
      <div slot="center" class="title">
        <div v-for="(item, index) in titles" 
             :key="index" 
             class="title-item"
             :class="{active: index === currentIndex}"
             @click="itemClick(index)">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'


export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data() {
    return {
      titles: ['商品','参数','评论','推荐'],
      currentIndex: 0,
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit('titleClick',index)
    },
    backClick() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>

  .title {
    display: flex;
    justify-content: space-around;
    font-size: 13px;
  }

  .title-item {
    flex: 1;
  }
  .back img{
   margin-top: 10px;
  }

  .active {
    color: var(--color-high-text);
  }

</style>