import Vue from 'vue'
import VueRouter from 'vue-router'

import Configuration from '../components/Configuration.vue'
import Questions from '../components/Questions.vue'
import Result from '../components/Result.vue'
import Answers from '../components/Answers.vue'

Vue.use(VueRouter)

export const routes = [
	{
		path: '/Questions',
		component: Questions
	},
	{
		path: '/',
		component: Configuration
	},
	{
		path: '/Result',
		component: Result
	},
	{
		path: '/Answers',
		component: Answers
	}
]

const router = new VueRouter({
	mode: 'history',
	routes
})

export default router