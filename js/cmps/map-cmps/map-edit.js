
export default {
    template: `
      <form @submit.prevent="searchLoc" class="map-edit">
         <label class="label">
              Name: 
             <input type="text" class="input-name">
         </label>
         <label class="label">
              Description: 
             <input type="text" class="input-desc" placeholder=" Add your here">
         </label>
         <!-- <label class="label">
              Add Photo 
             <input type="text" class="map-search-input" placeholder=" Add your here">
         </label> -->

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