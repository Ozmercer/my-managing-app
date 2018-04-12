
export default {
    props:['places'],
    template: `
        <section class="place-preview ">
            <h1>My places</h1>
          <ul v-for= "place in places" >
              <li>{{place.name}} <button @click="emitDelete(place.placeId)">X</button></li>
          </ul>
        </section>
    `,
    data() {
        return {
            
        }
    },
    created() {
      
    },
    methods: {
        emitDelete(id){
            this.$emit('delete',id);
        }
    },
    
    components: {
        
    }
}