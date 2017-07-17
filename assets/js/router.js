import Vue from 'vue'
import Router from 'vue-router'

import Index from '@pages/Index.vue'
import Login from '@pages/Login.vue'
import Register from '@pages/Register.vue'
import VerifyCode from '@pages/VerifyCode.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/verifyCode',
      component: VerifyCode
    }
  ]
})
