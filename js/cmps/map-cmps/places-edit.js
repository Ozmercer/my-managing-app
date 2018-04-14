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
                        <span>{{tag}} <button @click="removeTag(idx)" type="button">x</button> </span>
                    </span>
                    <div v-if="addingTag">
                        <input type="text" v-model="tag" placeholder="add tag"/>
                        <button @click="addTag" type="button">add tag</button>
                     </div>
                     <button @click="addingTag = !addingTag" v-if="!addingTag" type="button" >add tag</button>

            </div>
            <div class="edit-photos" v-if="place.photos.length"  v-for="(photo,idx) in place.photos">
                    <button type="button" @click="deletePhoto(idx)">Delete photo</button>
                    <img :src="photo" alt=""/>
            </div>
            <div>
                <label v-if="addPhoto">
                    <input type="text" v-model="photoUrl" 
                          placeholder="Add photo url">
                    <button  @click="addPhotoUrl" type="button" >Add photo</button>      
                </label>
                <button v-if="!addPhoto" @click="addPhoto = !addPhoto"  type="button" >Add photo</button>
            </div>

                <button class=""  @click="cancel" type="button">Cancel</button>
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
            photoUrl: null,
            addingTag:false
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
            mapService.addPlace(this.place, this.place.placeId)
                .then(place => {
                    this.$router.push('/map')
                    mapService.triggerMarker()
                })
        },
        addPhotoUrl() {
            this.addPhoto = !this.addPhoto;
            this.place.photos.push(this.photoUrl)
            this.photoUrl = null;
        },
        deletePhoto(idx){
            this.place.photos.splice(idx,1)
        },
        addTag() {
            this.place.tags.push(this.tag)
            this.tag = null;
            this.addingTag = false;
        },
        removeTag(idx){
            this.place.tags.splice(idx,1)
        },
        cancel() {
            this.$router.push('/map')
            if( !this.isUpdate) mapService.removeMarker()
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