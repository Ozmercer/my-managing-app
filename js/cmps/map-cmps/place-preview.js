import placeFilter from './places-filter.js'

export default {
    props: ['places'],
    template: `
        <section class="place-preview flex align-center">
            <img src="../../../img/mma-logo.png" alt="" class="logo-img">
            <hr>
            <div class="pages">
                <h1 class="title is-3">My places</h1>
                <place-filter></place-filter>
              <ul>
                  <li v-for= "(place,idx) in places" @click="emitSelected(place.placeId,idx)">
                      {{place.name}}
                        <button class="delete" @click.stop="emitDelete(place.placeId,idx)">
                        </button>
                     </li>
              </ul>
            </div>
        </section>
    `,
    data() {
        return {

        }
    },
    created() {

    },
    methods: {
        emitDelete(placeId,idx) {
            this.$emit('delete', {placeId,idx});
        },
        emitSelected(placeId,idx) {         
            this.$emit('selected', {placeId,idx})
        },
    },

    components: {
        placeFilter
    }
}