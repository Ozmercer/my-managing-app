import bookService from '../../service/map-service/map-service.js'
export default {
    template: `
        <section class="places-list">
            <place-preview :places="places"></place-preview>
        </section>
    `,
    data() {
        return {
           places=[]
        }
    },
    created() {
        
    },
    methods: {
       
    },
    
    components: {
        
    }
}