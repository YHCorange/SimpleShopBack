import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/style.scss'
import router from './routes'

Vue.use(ElementUI)

router.beforeEach((to, from, next) => {
	let userId = sessionStorage.getItem('userId')
	if (!userId && to.path !== '/login') {
		next({
			path: '/login'
		})
	} else {
		next()
	}
})

new Vue({
	el: '#app',
	router,
	render: h => h(App)
}).$mount('#app')
