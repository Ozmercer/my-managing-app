import router from './routes.js'

Vue.filter('substr50', function (value) {
    if (!value) return ''
    return value.substring(0,50)
  })
  

new Vue({
    el: '#app',
    router,
})