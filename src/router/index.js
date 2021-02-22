import Vue from 'vue'
import VueRouter from 'vue-router'
// 路由懒加载
const Login = () => import( /* webpackChunkName: "login" */ '../components/Login.vue')

import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import User from '../components/user/User.vue'
import Role from '../components/role/Role.vue'
import GoodsCate from '../components/goods/GoodsCate.vue'
import '../assets/css/global.css'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [{
        path: '/welcome',
        component: Welcome
      },
      {
        path: '/system/user',
        component: User
      },
      {
        path: '/system/roleList',
        component: Role
      },
      {
        path: '/good/cate',
        component: GoodsCate
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next()
  } else {
    const tokenStr = window.localStorage.getItem('token')
    if (!tokenStr) {
      return next('/login')
    }
    next()
  }
})

export default router
