<template>
  <div class="param-info" v-if="Object.keys(paramInfo).length !== 0">
    <table class="info-size"
           v-for="(table,index) in paramInfo.sizes"
           :key="index">
      <tr v-for="(tr, indey) in table" :key="indey">
        <td v-for="(td,indez) in tr" :key="indez">{{td}}</td>
      </tr>
    </table>
    <table class="info-param">
      <tr v-for="(item, index) in paramInfo.infos" :key="index">
        <td class="info-param-key">{{item.key}}</td>
        <td class="info-param-value">{{item.value}}</td>
      </tr>
    </table>
    <div class="info-img" v-if="paramInfo.image.length !== 0">
      <img :src="paramInfo.image" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailParamsInfo",
  props: {
    paramInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.param-info {
  padding: 25px 12px;
  border-bottom: 5px solid  rgba(221, 220, 220, 0.8);
}

.param-info table {
  border-collapse: collapse;
  width: 100%;
  font-size: 14px;
}
.info-size {
  border-bottom: 2px solid  rgba(221, 220, 220, 0.8);
}

.info-size td {
  padding: 14px 0;
  text-align: left;
  border-bottom: 1px solid  rgba(221, 220, 220, 0.8);
}

.info-param td {
  padding: 14px 0;
  text-align: left;
  border-bottom: 1px solid  rgba(221, 220, 220, 0.8);
}
.info-param .info-param-key {
  width: 95px;
}
.info-param .info-param-value {
  color: var(--color-high-text);
}

.info-img img{
  width: 100%;
}
</style>