
export default {
    template: `
      <form @submit.prevent="redirect" class="map-search-form">
         <label>
             <input type="text" class="map-search-input">
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
        }
    },
    components: {
       
    }
}