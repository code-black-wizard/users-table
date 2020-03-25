import Vue from 'vue'
import VueRouter from 'vue-router'
import Users from '../views/Users'
import User from '../views/User'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Users',
    component: Users
  },
  {
    path: '/user/:id',
    name: 'User',
    component: User,
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
