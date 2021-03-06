import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import {userInfo} from '@/service/api'
import Store from '@/store'

import Home from '@/views/home/Home.vue'
import index from '@/views/user-login/index.vue'
import login from '@/views/user-login/login.vue'
import edit from '@/views/user-space/edit.vue'
import recipe from '@/views/recipe/recipe.vue'
import space from '@/views/user-space/space.vue'
import MenuList from '@/views/user-space/menu-list.vue'
import fans from '@/views/user-space/fans.vue'
import Create from '@/views/create/create.vue'
import detail from '@/views/detail/detail.vue'
import cart from '@/views/cart/cart.vue'

const router = new Router({
    mode:"history",
    routes:[
        {
        path:'/',
        name:"Home",
        component:Home
    },
    {
        path:'/cart',
        name:'cart',
        component:cart
    },
    {
        path:'/detail',
        name:"detail",
        component:detail
    },
    {
        path:'/index',
        name:"index",
        component:index
    },
    {
        path:'/login',
        name:"login",
        component:login
    },
    {
        path:'/recipe',
        name:"recipe",
        component:recipe
    },
    {
        path:'/create',
        name:"create",
        component:Create
    },
    {
        path:'/edit',
        name:"edit",
        component:edit,
        meta:{
            login:true
        }

    },
    {
        path:'/space',
        name:"space",
        component:space,
        redirect:{
            name:'works'
        },
        meta:{
            login:true
        },
        children:[
            {
                path:"works",
                name:'works',
                component:MenuList,
                meta:{
                    login:true
                }
            },
            {
                path:"following",
                name:'following',
                component:fans,
                meta:{
                    login:true
                }
            },
            {
                path:"fans",
                name:'fans',
                component:fans,
                meta:{
                    login:true
                }
            },
            {
                path:"collection",
                name:'collection',
                component:MenuList,
                meta:{
                    login:true
                }
            },
        ]
    },
]
});
// ????????????
router.beforeEach(async (to,from,next)=>{

    const token = localStorage.getItem('token')
    const isLogin = !!token ; // ??????????????????????????????
    const data = await userInfo() ;
    // console.log(data)
    Store.commit('chageUserInfo',data.data)
// ???????????????????????????????????????token?????????????????????

    if(to.matched.some(item => item.meta.login)){ // ????????????
        console.log('????????????')
        if(isLogin){
            if(data.error === 400){ // ?????????????????????????????????
                next({name:'login'})
                localStorage.removeItem('token');
                return;
            }
            if (to.name === 'login') {
                next({name:'Home'})
            }else{
                next();
            }
            return;
        }
        if(!isLogin && to.name === 'login') {
            next();
        }
        if(!isLogin && to.name !=='login'){
            next({name:'login'})
        }
    }else{
        next();
    }
})
export default router;
