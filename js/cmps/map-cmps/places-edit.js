import mapService from '../../service/map-service/map-service.js';
export default {
    template: `
        <form @submit.prevent="" class="places-edit">
            <div class="">
                <label class="label">
                    Name: 
                    <input type="text" v-model="place.name" class="input-name">
                </label>
            </div>
            <div>
                <label class="label">
                    Description: 
                    <textarea type="text" class="input-desc"  v-model="place.description" placeholder=" Add your here"/>
                </label>
            </div>
            <div class="edit-tags" >
                tags:
                    <span v-for="(tag,idx) in place.tags">
                        <!-- <button @click="delete-photo">X</button> -->
                        <span>{{tag}} </span>
                    </span>
            </div>
            <div class="edit-photos" v-if="place.photos.length"  v-for="(photo,idx) in place.photos">
                    <!-- <button @click="delete-photo">X</button> -->
                    <img :src="photo" alt=""/>
            </div>
            <div>
                <label v-if="addPhoto">
                    <input type="text" v-model="urlInput" required
                          placeholder="Add photo url">
                    <button  @click="addPhotoUrl" >Add photo</button>      
                </label>
                <button v-if="!addPhoto" @click="addPhoto = !addPhoto" >Add</button>
            </div>

                <button class="" type="submit">Save</button>
        </form>
    `,
    data() {
        return {
            place: {
                placeId: Date.now,
                name: '',
                loc: { lat: null, lng: null },
                description: '',
                photos: [],
                tags: []
            },
            urlInput: '',
            addPhoto: false
        }
    },

    created() {
        mapService.query()
            .then((places) => this.places = places)
    },
    methods: {
        deletePlace(id) {
            mapService.deletePlace(id)
                .then(() => {
                    mapService.query()
                        .then((places) => this.places = places)
                    this.$router.push('/map')
                })
        },
        addPlace() {
            console.log('placeID', this.placeId)
            mapService.addPhoto(this.placeId, this.urlInput)
                .then(place => this.place = place)
        },
        addPhotoUrl() {
            this.addPhoto = !addPhoto;
        }
    },
    watch: {
        $route: {
            immediate: true,
            handler() {
                const id = +this.$route.params.placeId;
                if (id) {
                    mapService.getById(id)
                        .then(place => {
                            console.log('here', this.place)
                            this.place = place;

                        })
                }
            }
        },

    }


}