import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
//重复路由的报错
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}
const routes = [{
    path: "/",
    component: () => import('@com/Layout/index.vue'),
    redirect: '/Home',
    children: [{
        path: "/Home",
        name: "首页",
        component: () => import('@views/Home/index.vue'),
      },
      {
        path: "/About",
        name: "关于我们",
        component: () => import('@views/About/index.vue'),
      }
    ]
  }

]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  to.query.time = new Date().getTime();
  next();
})
export default router