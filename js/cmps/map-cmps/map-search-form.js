import mapService from '../../service/map-service/map-service.js'
export default {
    template: `
      <form @submit.prevent="redirect" class="map-search-form">
         <label>
             <input type="text" id="map-search-input">
         </label>
         <button class="map-search-btn" type="submit">Save</button>
      </form>
    `,
    data() {
        return {
           
        }
    },
    created() {
        
    },
    methods:{
        redirect(){
            this.$router.push('/map/edit');
            mapService.getNewPlace()
        }
    },
   
}