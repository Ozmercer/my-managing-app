import mapService from '../../service/map-service/map-service.js'
import placePreview from './place-preview.js';
import placeDetails from './places-details.js'


export default {
    template: `
        <section class="places-list">
            <place-preview :places="places"  @click.native="selected" @delete ="deletePlace"></place-preview>
            <place-details :place="selectedPlace" v-if="selectedPlace"> </place-details>
        </section>
    `,
    data() {
        return {
            places: [],
            selectedPlace:null,
        }
    },
    created() {
        this.places = mapService.query()
        console.log(this.places)
    },
    methods: {
        deletePlace(id){
            mapService.deletePlace(id)
            .then(()=>console.log('delete'))
        },
        selected(){

        },
    },
    components: {
        placePreview,
        placeDetails
    }
}