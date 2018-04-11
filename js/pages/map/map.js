import mapCanvas from '../../cmps/map-cmps/map-canvas.js'
import placesList  from '../../cmps/map-cmps/places-list.js'

export default {
    template: `
        <section class="map-app">
            <h1>My Maps</h1>
            <map-canvas></map-canvas>
            <places-list :places="places"></places-list>
        </section>
    `,
    data() {
        return {
            places:[]
        }
    },
    created() {
        
    },

    components: {
        mapCanvas,
        placesList
    }
}