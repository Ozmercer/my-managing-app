import mapService from '../../service/map-service/map-service.js'



export default {
    template: `
        <section class="places-details">
            <h1><strong>Name:</strong> {{place.name}}</h1>
            <p><strong>description:</strong> {{place.description}}</p>
            <p><strong>tag:</strong>
                <span v-for="tag in place.tags">
                    <span class="tag is-success" >{{tag}}</span>,
                </span>
            <p>
            <div class="photos block" v-for="photo in place.photos">
                <img :src="photo" alt="">
            </div>
            <div class="block">
                <button class="button is-warning" @click="edit">Edit</button>
                <button class="button is-danger" @click="">Delete</button>
            </div>
       
        </section>
    `,
    data() {
        return {
            place: {},
            urlInput: null,
            placeId: null,
            // isInValid: true

        }
    },
    methods: {
        deletePlace(id) {
            mapService.deletePlace(id)
                .then(() => {
                    this.$router.push('/map')
                })
        },
        edit(){
            this.$router.push('/map/edit/'+ this.place.placeId)
        }
      
    },
    components: {
        isInValid() {

        }

    },
    watch: {
        $route: {
            immediate: true,
            handler() {
                const id = +this.$route.params.placeId;
                this.placeId = id
                mapService.getById(id)
                    .then(place => {
                        this.place = place;
                        // mapService.addMarker(place)
                        mapService.repositionMap(place.loc)
                        mapService.triggerMarker(id)
                    })
            }
        },
        

    }
}

