<template>
  <div class="cart">
      <!-- <div class="top-to">
           <a>购物车</a>
      </div> -->
      <div class="cart-list" v-if="cartList.length!=0">
          <el-col
            style="flex:none;" 
            :style="{'margin-left':marginLeft+'px'}"
            v-for="(item,index) in cartList" 
            :key='index'
         >
      <el-card :body-style="{ padding: '0px' }">
          <el-checkbox v-model="item.checked" name="type"></el-checkbox>
          <router-link class="cartPart" :to="{name:'cart',query:{menuId:item.menuId}}">
          <img :src="item.product_pic_url" class="image" style="width: 232px;height: 232px;">
          <div style="padding: 14px;" class="menu-cardPs">
            <strong> 名称 {{item.title}}</strong>
            <router-link :to="{name:'space',query:{userId:item.userId}}" tag="em">
             作者 {{item.name}}
            </router-link>
          </div>
          <div class="right">
              <el-button type="danger" plain  @click="jia(item)">+</el-button>
              <!-- <span class="span" @click="jia(item)">+</span> -->
              <!-- <span class="span">{{item.type}}</span> -->
              <el-button type="danger" plain>{{item.type}}</el-button>
              <!-- <span @click="jian(item)">-</span> -->
              <el-button type="danger" plain  @click="jian(item)">-</el-button>
              <!-- <span @click="remove(index)">操作</span> -->
              <el-button type="danger" @click="remove(index)" plain>操作</el-button>
          </div>
        </router-link> 
      </el-card>
    </el-col>
    <p class="bottom">
        <span><el-checkbox v-model="isActiveChecked" name="type"></el-checkbox><el-button type="danger" plain>全选</el-button></span>
        <span></span>
        <span @click="removeChild()"><el-button type="danger" plain>删除</el-button></span>
    </p>
      </div>
      <div v-else>
          <h1 class="cart-h1" >你还没有添加商品到购物车,快去添加商品吧！</h1>
      </div>
  </div>
</template>

<script>
export default {
    props:{
        marginLeft:{
            type: Number,
            default: 0
        }
    },
    computed:{
        cartList(){
            return this.$store.state.cartList
        },
        isActiveChecked:{
            get(){
                return this.$store.getters.isActiveChecked
            },
            set(val){
                // val 是当前input框选中的状态 true  还是  false
                console.log(val);
                this.$store.commit('upt',val)
            }
        }
    },
    created(){
        // localStorage.getItem('cartList',JSON.stringify(this.cartList))
        // console.log(token);
    },
    methods:{
        remove(index){
            // console.log(index)
            this.$store.commit('remove',index)
        },
        jia(val){
            // console.log(val);
            val.type++
            localStorage.setItem('cartList',JSON.stringify(this.cartList))
        },
        jian(val){
            if (val.type>1) {
                val.type--
            }
            localStorage.setItem('cartList',JSON.stringify(this.cartList))
        },
        removeChild(){
            this.$store.commit('removeChild')
        }
    },
    mounted(){
        // console.log(this.cartList);
        this.$store.dispatch('nashuju')
    }
}
</script>

<style lang='stylus'>
    .cart
        width 100%
        height 100%
        color: #ccc

        .cartPart
            display: flex
            justify-content: space-between
            position relative
            .menu-cardPs
                display: flex
                flex-direction: column
                align-items: center
                margin-top: 40px
            .right
                display: flex
                justify-self unset
                margin-right: 100px
                margin-top: 50px
                height: 40px;
                line-height: 30px;
                .span
                    margin 0 10px
        .bottom
            display: flex
            justify-content: space-between
            width: 100%;
            color: #333;
            background-color: #fff
        .cart-h1
            font-size:20px;
            color:#333;
            text-align:center;
</style>