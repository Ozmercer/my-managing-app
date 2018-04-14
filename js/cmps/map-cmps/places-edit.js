import mapService from '../../service/map-service/map-service.js';
import eventBus, { GOOGLE_AUTOCOMPLETE } from '../../service/eventBus.js'

export default {
    template: `
        <form @submit.prevent="savePlace" class="places-edit">
            <div class="block">
                <label class="label">
                    Name: 
                    <input   type="text" v-model="place.name" class="input-name input">   
                </label>
            </div>  
            <div class="block">
                <label class="label">
                    Description: 
                    <textarea type="text" class="input-desc input"  v-model="place.description" placeholder=" Add your here"/>
                </label>
            </div>
            <div class="edit-tags block" >
                tags:
                    <span v-for="(tag,idx) in place.tags">
                        <span class="tag"><b>{{tag}}</b> <button @click="removeTag(idx)" class="delete" type="button">x</button> </span>
                    </span>
                    <div v-if="addingTag ">
                        <input class="input" type="text" v-model="tag" placeholder="add tag"/>
                        <button class="button is-success" @click="addTag" type="button" > Add tag </button>
                     </div>
                     <button class="button  is-success" @click="addingTag = !addingTag" v-if="!addingTag" type="button" >Add tag</button>

            </div>
            <div class="edit-photos" v-if="place.photos.length"  v-for="(photo,idx) in place.photos">
                    <button type="button" @click="deletePhoto(idx)" class="delete" >Delete photo</button>
                    <img :src="photo" alt=""/>
            </div>
            <div class="block">
                <label v-if="addPhoto">
                    <input class="input" type="text" v-model="photoUrl" 
                          placeholder="Add photo url">
                    <button class="button  is-success"  @click="addPhotoUrl" type="button" >Add photo</button>      
                </label>
                <button class="button  is-success" v-if="!addPhoto" @click="addPhoto = !addPhoto"  type="button" >Add photo</button>
            </div>

                <button class="button is-danger"  @click="cancel" type="button">Cancel</button>
                <button class="button is-success" type="submit">Save</button>
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
                        })
                }
            }
        },

    }


}