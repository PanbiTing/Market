<template>
  <div id="hy-swiper">
    <div class="swiper" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
      <slot></slot>
    </div>
    <slot name="indicator"></slot>
    <div class="indicator">
      <slot name="indicator" v-if="showIndicator && slideCount > 1">
        <div v-for="(item,index) in slideCount" :key="index" class="indi-item" :class="{active: index === currentIndex-1}"></div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Swiper",
  props: {
    // 定时数据
    interval : {
      type: Number,
      default: 3000
    },
    // 延时数据
    animDuration: {
      type: Number,
      default: 300
    },
    moveRatio: {
      type: Number,
      default: 0.25
    },
    showIndicator: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      slideCount: 0, //元素个数
      totalWidth:0, //swiper的宽度
      swiperStyle: {}, //swiper的样式
      currentIndex: 1, //当前的index
      scrolling: false, //是否正在滚动
    }
  },
  mounted(){
    // 1.操作DOM，在前后添加SwiperItem
    setTimeout(() => {
      this.handleDom();
      // 2.开启定时器
      this.startTimer();
    }, 3000)
    // 2.开启定时器
  },
  methods: {
    // 1. 定时器操作
    startTimer() {
      this.playTimer = window.setInterval(() => {
        this.currentIndex++;
        this.scrollContent(-this.currentIndex * this.totalWidth);
      }, this.interval)
    },
    stopTimer() {
      window.clearInterval(this.playTimer);
    },

    // 2. 滚动到正确的位置
    scrollContent(currenPosition) {
      // 2.1 设置正在滚动
      this.scrolling = true;
      // 2.2 开始滚动动画
      this.swiperStyle.transition = 'transform ' + this.animDuration + 'ms';
      this.setTransform(currenPosition);
      // 2.3 判断滚动到的位置
      this.checkPosition();
      // 2.4 滚动完成
      this.scrolling = false;
    },

    // 3. 校验正确的位置
    checkPosition() {
      window.setTimeout(() => {
        // 3.1 校验正确的位置
        this.swiperStyle.transition = '0ms';
        if(this.currentIndex >= this.slideCount + 1){
          this.currentIndex = 1;
          this.setTransform(-this.currentIndex * this.totalWidth);
        }else if(this.currentIndex <= 0) {
          this.currentIndex = this.slideCount;
          this.setTransform(-this.currentIndex * this.totalWidth);
        }

        // 3.2 结束移动后的回调
        this.$emit('transitionEnd',this.currentIndex-1);
      },this.animDuration)
    },

    // 4. 设置滚动的位置
    setTransform(position){
      // translate3d(tx, ty, tz)参数代表向量移动的长度
      this.swiperStyle.transform = `translate3d(${position}px,0,0)`;//模板字面量，${}取值
      this.swiperStyle['-webkit-transform'] = `translate3d(${position}px,0,0)`;
      this.swiperStyle['-ms-transform'] = `translate3d(${position}px,0,0)`;
    },

    // 5. 操作DOM，在DOM前后添加SwiperItem
    handleDom() {
      // 5.1 获取要操作的元素
      let swiperEl = document.querySelector('.swiper');//querySelector() 方法返回文档中匹配指定 CSS 选择器的一个元素
      let slidesEls = swiperEl.getElementsByClassName('slide');

      // 5.2 保存个数
      this.slideCount = slidesEls.length;

      // 5.3 如果大于1个，那么在前后分别添加一个SwiperItem
      if(this.slideCount > 1) {
        let cloneFirst = slidesEls[0].cloneNode(true);//拷贝一个列表项到另外一个列表
        let cloneLast = slidesEls[this.slideCount - 1].cloneNode(true);
        swiperEl.insertBefore(cloneLast,slidesEls[0]);//insertBefore() 方法在您指定的已有子节点之前插入新的子节点。
        swiperEl.appendChild(cloneFirst);// 方法向节点添加最后一个子节点
        this.totalWidth = swiperEl.offsetWidth;//只读属性，返回一个元素的布局宽度
        this.swiperStyle = swiperEl.style;
      }

      // 5.4 让swiper元素，显示第一个（目前是显示前面添加的最后一个元素）
      this.setTransform(-this.totalWidth);
    },

    // 6. 拖动事件的处理
    touchStart(e) {
      // 1.如果正在滚动，不可以拖动
      if(this.scrolling) return;

      // 2.停止定时器
      this.stopTimer();

      // 3.保存开始滚动的位置
      this.startX = e.touches[0].pageX;

    },

    touchMove(e) {
      // 1.计算出用户拖动的距离
      this.currentX = e.touches[0].pageX;
      this.distance = this.currentX - this.startX;
      let currentPosition = -this.currentIndex * this.totalWidth;
      let moveDistance = this.distance + currentPosition;

      // 2.设置当前的位置
      this.setTransform(moveDistance);

    },

    touchEnd(e) {
      // 1.获取移动的距离
      let currentMove = Math.abs(this.distance);

      // 2.判断最终的距离
      if(this.distance === 0) {
        return;
      } else if(this.distance > 0 && currentMove > this.totalWidth * this.moveRatio) { //右边移动超过0.25
        this.currentIndex--;
      } else if(this.distance < 0 && currentMove > this.totalWidth * this.moveRatio) { //左边移动超过0.25
        this.currentIndex++;
      }

      // 3.移动到正确的位置
      this.scrollContent(-this.currentIndex * this.totalWidth);

      // 4.移动完成后重新开启定时器
      this.startTimer();

    },

    // 7. 控制上一个，下一个
    previous() {
      this.changeItem(-1);
    },

    next() {
      this.changeItem(1);
    },

    changeItem(num) {
      // 1.移除定时器
      this.stopTimer();

      // 2.修改index和位置
      this.currentIndex += num;
      this.scrollContent(-this.currentIndex * this.totalWidth);

      // 3.添加定时器
      this.startTimer();

    }
  }
}
</script>

<style scoped>
#hy-swiper {
  overflow: hidden;
  position: relative;
}

.swiper {
  display: flex;
}

.indicator {
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;
  bottom: 8px;
}

.indi-item {
  box-sizing: border-box;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: #fff;
  line-height: 8px;
  text-align: center;
  font-size: 12px;
  margin: 0 5px;
}

.indi-item.active {
  background-color: rgba(212,62,46,1.0);
}

</style>