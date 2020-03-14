import Vue from 'vue'
import VueRouter from 'vue-router'
import Questions from '../components/Questions.vue'

Vue.use(VueRouter)

export const routes = [
	{
		path: '/Questions',
		component: Questions
	}
]

const router = new VueRouter({
	mode: 'history',
	routes
 })

export default router