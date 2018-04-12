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
        </section>
    `,
    data() {
        return {
            place: {}
        }
    },
    methods: {
        deletePlace(id) {
            mapService.deletePlace(id)
                .then(() => {
                    console.log('delete')
                    this.$router.push('/map') 
                })
        }
    },
    components: {


    },
    watch: {
        $route: {
            immediate: true,
            handler() {
                const placeId = +this.$route.params.placeId;
                mapService.getById(placeId)
                    .then(place => {
                        this.place = place;
                        mapService.repositionMap(place.loc)
                    })
            }
        }

    }
}


// placeId: 2,
// name: 'Australia',
// loc: { lat: -34.397, lng: 150.644 },
// description: 'place description Australia',
// photos: [],
// tag: []