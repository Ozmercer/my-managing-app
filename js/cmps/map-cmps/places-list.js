import mapService from '../../service/map-service/map-service.js'
import placePreview from './place-preview.js';
import placeDetails from './places-details.js';
import eventBus from "../../service/eventBus.js";


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

    },
    methods: {
        deletePlace(ev) {
            console.log('ev',ev)
            mapService.deletePlace(ev.id,ev.idx)
                .then(() => {
                    mapService.query()
                        .then((places) => this.places = places)
                    this.$router.push('/map')
                })
        },
        selected(placeId,idx) {
            this.$router.push('/map/details/' + placeId);
            mapService.triggerMarker(idx)
        },
    },
    components: {
        placePreview,
        placeDetails
    },
    watch: {
        $route: {
            immediate: true,
            handler() {
                mapService.query()
                    .then((places) => this.places = places)
            }
        }
    },
}