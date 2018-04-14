import mapService from '../../service/map-service/map-service.js'
import placePreview from './place-preview.js';
import placeDetails from './places-details.js';
import eventBus, { FILTER_PLACES } from "../../service/eventBus.js"


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
        eventBus.$on(FILTER_PLACES, filter => {
            mapService.query(filter)
                    .then((places) => this.places = places)
        })
    },
    methods: {
        deletePlace(ev) {
            console.log('ev', ev)
            mapService.deletePlace(ev.id, ev.idx)
                .then(() => {
                    mapService.query()
                        .then((places) => this.places = places)
                    this.$router.push('/map')
                })
        },
        selected(ev) {
            this.$router.push('/map/details/' + ev.placeId);
            mapService.triggerMarker(ev.idx)
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