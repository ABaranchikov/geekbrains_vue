import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from '../views/Dashboard'
import About from '../views/About'
import NotFound from '../views/NotFound'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/dashboard',
            component: Dashboard,
            name: 'dashboard'
        },
        {
            path: '/',
            component: Dashboard,
            name: 'dashboard'
        },
        {
            path: '/about',
            component: About,
            name: 'about'
        },
        //  {
        //      path: '/notfound',
        //     component: NotFound,
        //      name: 'NotFound'
        //   },
        {
            path: '*',
            component: NotFound,
        }
    ],

})