import mapService from '../../service/map-service/map-service.js'


export default {
    template: `
        <section class="map-canvas">
            <!-- <input type="text" ref="mapSearchInput"> -->
            <div id="map" style="width: 99vw; height:100vh" ref="map"></div>  
        </section>
    `,
    data() {
        return {
           
        }
    },
    mounted() {
        mapService.init(this.$refs.map,this.$refs.mapSearchInput) 
    },
    created(){
     
    }
}