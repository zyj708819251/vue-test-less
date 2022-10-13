import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
//重复路由的报错
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
	return routerPush.call(this, location).catch(error => error)
}
const routes = [{
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
		path: "/",
		component: () => import('@com/Layout/index.vue'),
		name: "Layout",
		redirect: '/Home',
		meta: {
			title: "首页"
		},
		children: [{
				path: "Home",
				name: "Home",
				component: () => import('@views/Home/index.vue'),
				meta: {
					title: "个人主页"
				}
			},
			{
				path: "About",
				name: "About",
				component: () => import('@views/About/index.vue'),
				meta: {
					title: "关于我们"
				},
				redirect:'/About/About2-1',
				children: [{
					path: "About2-1",
					name: "About2-1",
					component: () => import('@views/About/two-1.vue'),
					meta: {
						title: "关于二级1"
					},
					redirect:'/About/About2-1/About2-1-1',
					children: [{
						path: "About2-1-1",
						name: "About2-1-1",
						component: () => import('@views/About/three-1.vue'),
						meta: {
							title: "About2-1-1"
						}
					}]
				},
				{
					path: "About2-2",
					name: "About2-2",
					component: () => import('@views/About/two-2.vue'),
					meta: {
						title: "关于二级2"
					},
					redirect:'/About/About2-2/About2-2-1',
					children: [{
						path: "About2-2-1",
						name: "About2-2-1",
						component: () => import('@views/About/three-2.vue'),
						meta: {
							title: "About2-2-1"
						}
					}]
				}]
			}
		]
	}
]

const router = new VueRouter({
	// mode: 'history',
	routes
})

router.beforeEach((to, from, next) => {
	// console.log(to);
	to.query.time = new Date().getTime();
	next();
})
export default router
