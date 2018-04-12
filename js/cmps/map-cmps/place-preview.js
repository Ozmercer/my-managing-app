
export default {
    props: ['places'],
    template: `
        <section class="place-preview ">
            <h1>My places</h1>
          <ul v-for= "place in places" >
              <li  @click="emitSelected(place.placeId)">
                  {{place.name}}
                    <button @click.stop="emitDelete(place.placeId)">
                        X
                    </button>
                 </li>
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
        emitDelete(placeId) {
            this.$emit('delete', placeId);
        },
        emitSelected(placeId) {
            this.$emit('selected', placeId)
        },
    },

    components: {

    }
}