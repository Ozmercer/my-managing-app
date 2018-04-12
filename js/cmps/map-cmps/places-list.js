import mapService from '../../service/map-service/map-service.js'
import placePreview from './place-preview.js';
import placeDetails from './places-details.js'


export default {
    template: `
        <section class="places-list">
            <place-preview :places="places" @selected="selected" @delete ="deletePlace"></place-preview>
        </section>
    `,
    data() {
        return {
            places: [],
        }
    },
    created() {
        mapService.query()
            .then((places) => this.places = places)
    },
    methods: {
        deletePlace(id) {
            mapService.deletePlace(id)
                .then(() =>{
                    mapService.query()
                        .then((places) => this.places = places)
                    this.$router.push('/map')
                })
        },
        selected(placesId) {
            this.$router.push('/map/' + placesId);
        },
    },
    components: {
        placePreview,
        placeDetails
    }
}