import mapCanvas from '../../cmps/map-cmps/map-canvas.js'
import placesList  from '../../cmps/map-cmps/places-list.js'

export default {
    template: `
        <section class="map-app flex justify-center container1">
            <div class="info-container flex flex-column pace-between">
                <places-list></places-list>
                <router-view></router-view>
            </div>
            <map-canvas></map-canvas>
        </section>
    `,
    data() {
        return {
            
        }
    },
    created() {
        
    },

    components: {
        mapCanvas,
        placesList,
    }
    
}