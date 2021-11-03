<template>
  <div class="waterfall" ref="waterfall">
    <slot></slot>
    <div class="waterfall-loading" ref='loading' v-show="isLoading">
      <i class="el-icon-loading"></i>
    </div>
  </div>
</template>
<script>
import {throttle} from 'throttle-debounce'
export default {
  name: 'Waterfall',
  data(){
    return {
      isLoading:false,
    }
  },
  mounted() {
    this.scrollHanle = throttle('500',this.scroll.bind(this));
    window.addEventListener("scroll", this.scrollHanle);
  },
  destroyed() {
    window.addEventListener("scroll", this.scrollHanle);
  },
  methods: {
    scroll(){
        if(this.isLoading) return;
        if(this.$refs.waterfall.getBoundingClientRect().bottom<document.documentElement.clientHeight){
          this.isLoading=true;
          this.$emit('view');
          // console.log('已到达可视区');
        }
      }
  },
}
</script>
<style lang="stylus">
.waterfall-loading
  width 100%
  height 20px
  text-align center
</style>