import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
//重复路由的报错
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
	return routerPush.call(this, location).catch(error => error)
}
const routes = [{
		path: '/',
		redirect: '/Layout'
	}, {
		path: '/Login',
		name: "登录",
		component: () => import('@views/Login/index.vue')
	},
	{
		path: '*',
		name: "404",
		component: () => import('@views/404/index.vue')
	},
	{
		path: "/Layout",
		component: () => import('@com/Layout/index.vue'),
		name: "Home",
		redirect: '/Home',
		meta: { title: "首页"},
		children: [{
				path: "/Home",
				name: "HomePage",
				component: () => import('@views/Home/index.vue'),
				meta: { title: "个人主页"}
			},
			{
				path: "/About",
				name: "AboutPage",
				component: () => import('@views/About/index.vue'),
				meta: { title: "关于我们"}
			}
		]
	}
]

const router = new VueRouter({
	// mode: 'history',
	routes
})

router.beforeEach((to, from, next) => {
	console.log(to);
	to.query.time = new Date().getTime();
	next();
})
export default router
