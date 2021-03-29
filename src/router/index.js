import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '@/page/Index/index'
import Test from '@/page/Test'

const routes = [
	{ path: '/', component: Index },
	{ path: '/test', component: Test }
]

const router = createRouter({
	history: createWebHashHistory(),
	routes
})

export default router