import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Home from '@/views/home/Home.vue'

const router = new Router({
    mode:"history",
    routes:[{
        path:'/',
        name:"Home",
        components:Home
    }]
});

export default router;
