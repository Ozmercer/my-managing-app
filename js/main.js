import router from './routes.js'
import utilsService from './service/util.service.js'

Vue.filter('substr50', function (value) {
    if (!value) return ''
    return value.substring(0,50).trim()
  })
Vue.filter('timeAgo', function (value) {
    if (!value) return ''
    return utilsService.timeAgo(value)
  })

new Vue({
    el: '#app',
    router,
})