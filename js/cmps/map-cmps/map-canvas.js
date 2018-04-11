import mapService from '../../service/map-service/map-service.js'


export default {
    template: `
           <div id="map" style="width: 100vw; height:100vh" ref="map"></div>  
    `,
    data() {
        return {
           
        }
    },
    mounted() {
        mapService.initMap(undefined,undefined,this.$refs.map)
    },
    created(){
     
    }
}