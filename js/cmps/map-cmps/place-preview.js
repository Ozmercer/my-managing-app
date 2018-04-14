
export default {
    props: ['places'],
    template: `
        <section class="place-preview ">
            <h1 class="title is-3">My places</h1>
          <ul>
              <li v-for= "(place,idx) in places" @click="emitSelected(place.placeId,idx)">
                  {{place.name}}
                    <button class="delete" @click.stop="emitDelete(place.placeId,idx)">
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