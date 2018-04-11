import router from './routes.js'
console.log('mm')
new Vue({
    el: '#app',
    data: {
        msg: 'bla'
    },
    router,
    created(){
        console.log('elad')
    }
})