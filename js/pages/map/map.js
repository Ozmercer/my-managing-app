import mapCanvas from '../../cmps/map-cmps/map-canvas.js'
import placesList  from '../../cmps/map-cmps/places-list.js'

export default {
    template: `
        <section class="map-app flex justify-center ">
            <map-canvas></map-canvas>
            <div class="info-container flex column pace-between">
                <places-list :places="places"></places-list>
                <router-view></router-view>
            </div>
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
    }
}