
export default {
    template: `
      <form @submit.prevent="searchLoc" class="map-search-form">
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
}