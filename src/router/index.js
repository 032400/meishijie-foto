import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Home from '@/views/home/Home.vue'

import edit from '@/views/user-space/edit.vue'
import space from '@/views/user-space/space.vue'
import MenuList from '@/views/user-space/menu-list.vue'
import fans from '@/views/user-space/fans.vue'

const router = new Router({
    mode:"history",
    routes:[{
        path:'/',
        name:"Home",
        components:Home
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

export default router;
