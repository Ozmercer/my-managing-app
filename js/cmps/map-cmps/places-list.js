import mapService from '../../service/map-service/map-service.js'
import placePreview from './place-preview.js';


export default {
    template: `
        <section class="places-list">
            <place-preview :places="places" @delete ="deletePlace"></place-preview>
        </section>
    `,
    data() {
        return {
            places: []
        }
    },
    created() {
        this.places = mapService.query()
        console.log(this.places)
    },
    methods: {
        deletePlace(idx){
            mapService.deletePlace(this.places[idx].id)
            .then(()=>console.log('delete'))
        }
    },
    components: {
        placePreview
    }
}