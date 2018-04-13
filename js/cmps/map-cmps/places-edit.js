import mapService from '../../service/map-service/map-service.js';
import eventBus, { GOOGLE_AUTOCOMPLETE } from '../../service/eventBus.js'

export default {
    template: `
        <form @submit.prevent="savePlace" class="places-edit">
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
                    <div>
                        <input type="text" v-model="tag" placeholder="add tag"/>
                        <button @click.stop="addTag">add tag</button>
                     </div>
            </div>
            <div class="edit-photos" v-if="place.photos.length"  v-for="(photo,idx) in place.photos">
                    <!-- <button @click="delete-photo">X</button> -->
                    <img :src="photo" alt=""/>
            </div>
            <div>
                <label v-if="addPhoto">
                    <input type="text" v-model="photoUrl" required
                          placeholder="Add photo url">
                    <button  @click="addPhotoUrl" type="text" >Add photo</button>      
                </label>
                <button v-if="!addPhoto" @click="addPhoto = !addPhoto" >Add</button>
            </div>

                <button class="" type="submit">Save</button>
        </form>
    `,
    data() {
        return {
            place: {
                placeId: null,
                name: '',
                loc: { lat: null, lng: null },
                description: '',
                photos: [],
                tags: []
            },
            addPhoto: false,
            isUpdate: false,
            tag: null,
            photoUrl: null
        }
    },
    created() {
        eventBus.$on(GOOGLE_AUTOCOMPLETE, newPlace => {
            this.place.name = newPlace.name
            this.place.loc = newPlace.loc
        })
    },
    methods: {
        savePlace() {
            console.log('placeID', this.place.placeId)
            mapService.addPlace(this.place,this.place.placeId)
                .then(place =>{
                    this.$router.push('/map')
                    mapService.triggerMarker()
                } 
            )
        },
        addPhotoUrl() {
            this.addPhoto = !addPhoto;
            this.place.photos.push(this.tag)
            this.tag = null;
        },
        addTag() {
            this.place.tags.push(this.tag)
            this.tag = null;
        }

    },
    watch: {
        $route: {
            immediate: true,
            handler() {
                const id = +this.$route.params.placeId;
                if (id) {
                    this.isUpdate = true
                    mapService.getById(id)
                        .then(place => {
                            this.place = place;
                            console.log('here', this.place)

                        })
                }
            }
        },

    }


}