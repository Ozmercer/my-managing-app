
export default {
    props: ['places'],
    template: `
        <section class="place-preview ">
            <h1>My places</h1>
          <ul v-for= "(place,idx) in places" >
              <li  @click="emitSelected(place.placeId,idx)">
                  {{place.name}}
                    <button @click.stop="emitDelete(place.placeId,idx)">
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
        emitDelete(placeId,idx) {
            this.$emit('delete', {placeId,idx});
        },
        emitSelected(placeId) {
            this.$emit('selected', placeId)
        },
    },

    components: {

    }
}