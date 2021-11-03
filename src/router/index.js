import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import {userInfo} from '@/service/api'
import Store from '@/store'

import Home from '@/views/home/Home.vue'
import index from '@/views/user-login/index.vue'
import login from '@/views/user-login/login.vue'
import edit from '@/views/user-space/edit.vue'
import space from '@/views/user-space/space.vue'
import MenuList from '@/views/user-space/menu-list.vue'
import fans from '@/views/user-space/fans.vue'

const router = new Router({
    mode:"history",
    routes:[{
        path:'/',
        name:"Home",
        component:Home
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
// 路由守卫
router.beforeEach(async (to,from,next)=>{

    const token = localStorage.getItem('token')
    const isLogin = !!token ; // 两个感叹号转为布尔值
    const data = await userInfo() ;
    // console.log(data)
    Store.commit('chageUserInfo',data.data)
// 进入路由的时候，向后端发送token，验证是否合法

    if(to.matched.some(item => item.meta.login)){ // 需要登录
        console.log('需要登录')
        if(isLogin){
            if(data.error === 400){ // 后端告诉你，登录不成功
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
