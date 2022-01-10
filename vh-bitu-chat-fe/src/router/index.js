import Vue from 'vue'
import VueRouter from 'vue-router'
// import _ from 'lodash'
import TokenService from '../helpers/token'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'Home',
    component: () => import(/* webpackChunkName: "chat" */ '../views/Chat.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },
  {
    path: '/chat',
    name: 'chat',
    component: () => import(/* webpackChunkName: "chat" */ '../views/Chat.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/customer',
    name: 'customer',
    component: () => import(/* webpackChunkName: "customer" */ '../views/Customer.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/404',
    name: '404',
    component: NotFound
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import(/* webpackChunkName: "setting" */ '../views/Setting.vue'),
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.VUE_APP_BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  // const isPublic = _.get(to.meta, 'public', false)
  // const onlyWhenLoggedOut = _.get(to.meta, 'onlyWhenLoggedOut', false)
  const loggedIn = !!TokenService.getToken()
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (loggedIn) {
      next()
    } else {
      next({ name: 'Login' })
    }
  } else {
    next()
  }
  
})

export default router
