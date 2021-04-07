// 防抖函数
export function debounce(func,delay) {
  let timer = null;
  return function (...args) {
    if(timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this,args);
    },delay)
  }
}

// 日期格式化函数：Data对象的toLocalDateString（）
// 正则表达式：字符串匹配利器，规则太多
export function formatDate(date, fmt) {
  // 1.获取年份
  // +表示一个或者多个
  // *0个或者多个
  // ？0个或者1个
  // 全局对象RegExp
  // substr截取
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero (str) {
  // 不足2位，00+4=004->04 截取掉一位
  return ('00' + str).substr(str.length);
};