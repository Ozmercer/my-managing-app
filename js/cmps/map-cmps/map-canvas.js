import mapService from '../../service/map-service/map-service.js'
import mapSearchForm from '../../cmps/map-cmps/map-search-form.js'


export default {
    template: `
        <section class="map-canvas">
            <map-search-form></map-search-form>
            <div id="map" style="width: 99vw; height:100vh" ref="map"></div>  
        </section>
    `,
    data() {
        return {
           
        }
    },
    mounted() {
        mapService.init(this.$refs.map) 
    },
    created(){
     
    },
    components: {
        mapSearchForm
    }
}