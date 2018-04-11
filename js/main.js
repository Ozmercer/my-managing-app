import router from './routes.js'

Vue.filter('substr50', function (value) {
    if (!value) return ''
    return value.substring(0,50)
  })
  

new Vue({
    el: '#app',
    router,
<<<<<<< HEAD
    
=======
>>>>>>> ebb8341a707e419b3429e716d75a491ee9449be9
})