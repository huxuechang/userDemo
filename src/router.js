import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/login/login'
import Home from './views/home/Home'
//临时
import About from './views/About'
import HelloWorld from './components/HelloWorld'
import UserList from './views/user/userList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
       hidden: true
    },
    {
      path: '/',
      name: '用户管理',
      label:'用户管理',
      component: Home,
      iconCls: 'el-icon-message',
      redirect:'/home/HelloWorld',
      children: [
          { path: '/home/HelloWorld', component: HelloWorld, name: '主页',label:'主页'},
          { path: '/home/UserList', component: UserList, name: '用户列表' ,label:'用户列表'}
        ]
     },
      {
          path: '/',
          name: '部门管理',
          label:'部门管理',
          component: Home,
          iconCls: 'el-icon-message',
          children: [
              { path: '/home/Dept', component: Login, name: '部门列表',label:'部门列表'},

          ]
      },
      {
          path: '/404',
          component: About,
          name: '404',
          hidden: true
      },
    {
          path: '*',
          hidden: true,
          redirect: { path: '/404' }
    }

    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
