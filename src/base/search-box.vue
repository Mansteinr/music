<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input ref="queryInput" class="box" v-model="query" :placeholder="placeholder"/>
    <i v-show="query" class="icon-dismiss" @click="clear"></i>
  </div>
</template>

<script>
import { debounce } from '@/common/js/utils'
export default {
  data() {
    return {
      query: ''
    }
  },
  props: {
    placeholder: {
      type: String,
      default: '搜索歌曲、歌手'
    }
  },
  methods: {
    clear() {
      this.query = ''
    },
    setQuery(value) {
      this.query = value
    },
    blur() {
      this.$refs.queryInput.blur()
    }
  },
  created() {
    // 监听搜索值 并派发出去
    // 为什么不直接用用watch?
    this.$watch('query', debounce((value) => {
      this.$emit('query', value)
    }, 200))
  }
}
</script>


<style lang="stylus" scoped>
  @import '../common/stylus/variable'
  .search-box
    display flex
    align-items center
    box-sizing border-box
    width 100%
    padding 0 6px
    height 40px
    background $color-highlight-background
    border-radius 6px
    .icon-search
      font-size 24px
      color $color-background
    .box
      flex 1
      margin 0 5px
      line-height 18px
      background $color-highlight-background
      color $color-text
      font-size $font-size-medium
      height 100%
      &::placeholder
        color $color-text-d
    .icon-dismiss
      font-size 16px
      color $color-background 
</style>

