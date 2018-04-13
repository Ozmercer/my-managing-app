import router from './routes.js'
import utilsService from './service/util.service.js'

Vue.filter('substr30', function (value) {
    if (!value) return ''
    var suffix = '';
    if (value.length > 30) suffix = '...'
    return value.substring(0,30).trim() + suffix
  })
Vue.filter('timeAgo', function (value) {
    if (!value) return ''
    return utilsService.timeAgo(value)
  })

new Vue({
    el: '#app',
    router,
})