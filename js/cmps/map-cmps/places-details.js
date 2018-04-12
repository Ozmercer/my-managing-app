import mapService from '../../service/map-service/map-service.js'



export default {
    props:['place'],
    template: `
        <section class="places-details">
            <h1>{{place}}</h1>
        </section>
    `,
    data() {
        return {
           
        }
    },
    created() {
       
    },
    methods: {
        deletePlace(id){
            mapService.deletePlace(id)
            .then(()=>console.log('delete'))
        }
    },
    components: {
        
      
    }
}