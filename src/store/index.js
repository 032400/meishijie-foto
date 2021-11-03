import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state:{
    userInfo: {},
    cartList:[], 
  },
  getters:{
    isLogin(state){
      return !!Object.keys(state.userInfo).length;
    },
    isActiveChecked(state){
      if (state.cartList.length==0) {
        return false
      }else{
        return state.cartList.every(ele=>ele.checked==true)
      }
    }
  },
  mutations:{
    chageUserInfo(state, data){
      state.userInfo = data;
      // console.log(data)
    },
    add(state,val){
      if (state.cartList.some(ele=>ele.menuId==val.menuId)) {
        localStorage.setItem('cartList',JSON.stringify(state.cartList))  // 存储cartList修改后的状态
        let item = state.cartList.find(ele=>ele.menuId==val.menuId)
        item.type++
      }else{
        var obj={
          product_pic_url:val.product_pic_url,
          title:val.title,
          menuId:val.menuId,
          name:val.name,
          type:1,
          checked:false
        }
        state.cartList.push(obj)
      }
      localStorage.setItem('cartList',JSON.stringify(state.cartList))  // 存储cartList修改后的状态
    },
    upt(state,val){
      if (val) {
        state.cartList.forEach(ele=>ele.checked=true)
      }else{
        state.cartList.forEach(ele=>ele.checked=false)
      }
      localStorage.setItem('cartList',JSON.stringify(state.cartList))// 存储cartList修改后的状态
    },
    remove(state,index){
      let item = state.cartList.find(ele=>ele.checked==true)
      if (item) {
        state.cartList.splice(index,1)
      }
      localStorage.setItem('cartList',JSON.stringify(state.cartList))// 存储cartList修改后的状态
    },
    removeChild(state){
      let total = state.cartList.every(ele=>ele.checked==true)

      var getItem=state.cartList.find(ele=>ele.menuId==ele.menuId)
      if (total) {
        // state.cartList = []
        state.cartList.splice(getItem)
      }
      localStorage.setItem('cartList',JSON.stringify(state.cartList))// 存储cartList修改后的状态
    },
    NA_SHU_JU(state,data){
      // 把获取cartList后的状态重新赋值给cartList
      // console.log(data,state.cartList);
      state.cartList = data
    }
  },
  actions:{
    nashuju({commit}){
      const cartList=JSON.parse(localStorage.getItem('cartList'))||[] // 定义一个变量来接收当前获取到的cartList的状态，如果没有获取到cartList,就给它一个空数组
      commit('NA_SHU_JU',cartList)
    }
  }
})

export default store;