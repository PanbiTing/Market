<template>
  <div class="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "TabBar"
  }
</script>

<style scoped>
.tab-bar {
   display: flex;
   background-color: #f6f6f6;
   /* 放在页面底部 */
   position: fixed;
   left: 0;
   right: 0;
   bottom: 0;  
    /* 防在页面底部 */
    /* 给div添加阴影 */
  box-shadow: 0 -1px 1px rgba(145, 143, 143, 0.8);
}
</style>
