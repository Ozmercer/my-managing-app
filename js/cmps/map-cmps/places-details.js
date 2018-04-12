import mapService from '../../service/map-service/map-service.js'



export default {
    template: `
        <section class="places-details">
            <h1>Name:{{place.name}}</h1>
            <p>description: {{place.description}}</p>
            <p> tag:
                <span v-for="tag in place.tags">
                    <span>{{tag}}</span>,
                </span>
            <p>
            <div class="photos" v-for="photo in place.photos">
                <img :src="photo" alt="">
            </div>
            <button @click="isAddingPhoto = !isAddingPhoto">Add Photos</button>
            <form @submit.prevent="addMyPhotos" v-if="isAddingPhoto">
                <label>
                    <input type="text" v-model="urlInput" required
                         placeholder="Add photo url">
                </label>
                <button @click="isAddingPhoto = !isAddingPhoto" type="submit">Add</button>
            </form> 
        </section>
    `,
    data() {
        return {
            place: {},
            isAddingPhoto: false,
            urlInput: null,
            placeId: null,
            // isInValid: true

        }
    },
    methods: {
        deletePlace(id) {
            mapService.deletePlace(id)
                .then(() => {
                    console.log('delete')
                    this.$router.push('/map')
                })
        },
        addMyPhotos() {
            console.log('placeID', this.placeId)
            mapService.addPhoto(this.placeId, this.urlInput)
                .then( place => this.place = place)
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
                        console.log('here', this.place)
                        this.place = place;
                        mapService.repositionMap(place.loc)
                        mapService.addMarker(place)
                    })
            }
        },
        // place:function () {
        //     mapService.getById(this.placeId)
        //         .then(place => {
        //             //   this.place = place

        //         })
        // }

    }
}


// placeId: 2,
// name: 'Australia',
// loc: { lat: -34.397, lng: 150.644 },
// description: 'place description Australia',
// photos: [],
// tag: []