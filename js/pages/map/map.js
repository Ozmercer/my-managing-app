import mapCanvas from '../../cmps/map-cmps/map-canvas.js'
import placesList  from '../../cmps/map-cmps/places-list.js'
import mapSearchForm from '../../cmps/map-cmps/map-search-form.js'

export default {
    template: `
        <section class="map-app">
            <h1>My Maps</h1>
            <map-canvas></map-canvas>
            <map-search-form></map-search-form>
            <places-list :places="places"></places-list>
            <router-view></router-view>
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
        placesList,
        mapSearchForm
    }
}