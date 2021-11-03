<template>
  <el-row class="menu-card" type="flex" justify="start">
    <el-col
      style="flex:none;" 
      :style="{'margin-left':marginLeft+'px'}"
      v-for="item in info" 
      :key='item._id'
    >
      <el-card :body-style="{ padding: '0px' }">
        <router-link :to="{name:'detail',query:{menuId:item.menuId}}">
          <img :src="item.product_pic_url" class="image" style="width: 232px;height: 232px;">
          <div style="padding: 14px;" class="menu-card-detail">
            <strong>菜品名称 {{item.title}}</strong>
            <span>{{item.comments_len}} 评论</span>
            <router-link :to="{name:'space',query:{userId:item.userId}}" tag="em">
            作者 {{item.name}}
            </router-link>
            <el-button class="add" @click="add(item)">添加购物车</el-button>
          </div>
        </router-link> 
      </el-card>
    </el-col>
  </el-row>
</template>
<script>

export default {
  name: 'menu-card',
  props:{
    marginLeft: {
      type: Number,
      default: 22
    },
    info:{
      type: Array,
      default:() => []
    }
  },
  methods:{
    add(val){
      console.log(val)
      this.$store.commit('add',val)
    },
  },
  mounted(){
    // console.log(this.info);
    this.$store.dispatch('nashuju') // 每个页面都需要调用一下避免数据会刷掉
  }
}
</script>

<style lang="stylus">
.menu-card 
  flex-wrap wrap
  .el-col-24
    width auto
    margin-bottom 20px
    margin-left: 22px
    
  .menu-card-detail
    > *
      display block
    .add
      margin-left 130px
      margin-top: -50px
    strong 
      height 24px
      line-height 24px
      font-size 14px
      font-weight bold
      color #333
    span 
      height 26px
      line-height 26px
      font-size 12px
      color #999
    em 
      height 23px
      line-height 23px
      font-size 12px
      color #ff3232
</style>

