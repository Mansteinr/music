<template>
  <div ref="wrapper" class="op">
    <slot></slot>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    props: {
      // 监听滚动事件类型，比如慢速滚动 快速滚动
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      data: { // 必传 当数据填充时 可以重新渲染
        type: Array,
        default: () => []
      },
      listenScroll: { // scroll组件要不要监听滚动事件
        type: Boolean,
        default: false
      },
      pullup: { // 是否开启上拉刷新
        type: Boolean,
        default: false
      },
      beforeScroll: {
        type: Boolean,
        default: false
      },
      // 有些组件引用scroll 会有些动画 这些动画完成不是瞬间的
      // 有可能在20ms完成不了 这个是hisCroll组件计算的高度会不对
      refreshDalay: {
        type: Number,
        default: 20
      }
    },
    methods: {
      initScroll() {
        if (!this.$refs.wrapper) return
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click
        })
        // 监听滚动事件 并将实时位置派发给父组件
        if (this.listenScroll) {
          this.scroll.on('scroll', (pos) => {
            this.$emit('scroll', pos)
          })
        }
        if (this.pullup) {
          // 滚动结束 只触发一次
          this.scroll.on('scrollEnd', () => {
            // 滚动底部
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              this.$emit('scrollToEnd')
            }
          })
        }
        if(this.beforeScroll) {
          // 监听beforeScroll事件 并向父组件派发事件
          this.scroll.on('beforeScroll', () => {
            this.$emit('beforeScroll')
          })
        }
      },
      enable() {
        this.scroll && this.scroll.enable()
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    mounted() {
      setTimeout(() => {
        this.initScroll()
      }, this.refreshDalay)
      // 用nextTick 无法监听到 scroll滚动事件
      // this.$nextTick(() => {
      //   this.initScroll()
      // })
    },
    watch: {
      data() {
        this.$nextTick(() => {
          this.refresh()
        })
      }
    }
  }
</script>


<style lang="stylus" scoped>

</style>

