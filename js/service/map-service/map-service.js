import { GoogleMapsApi } from './gmaps.class.js';
import storageService from '../storage.service.js';

const GEOCODE_KEY = 'AIzaSyBLTGWuNv67ZQBPz4eFJLo2cr-4qUCwW9o'
const PLACES_KEY = 'placesDB'

var placesItems = [
    {
        placeId: 1,
        name: 'Tel Aviv',
        loc: { lat: 32.0749831, lng: 34.9120554 },
        description: 'place description Tel Aviv',
        photos: ['https://wallpaperbrowse.com/media/images/how-photographers-photoshop-their-images-landscape-photography-peter-stewart-22b.jpg'],
        tags: ['Home', 'food']

    },
    {
        placeId: 2,
        name: 'Australia',
        loc: { lat: -34.397, lng: 150.644 },
        description: 'place description Australia',
        photos: ['https://www.nasa.gov/sites/default/files/styles/full_width_feature/public/thumbnails/image/sdo.jpg'],
        tags: ['sports',]
    },
    {
        placeId: 3,
        name: 'Jerusalem',
        loc: { lat: 31.768319, lng: 35.21370999999999 },
        description: 'place description Jerusalem',
        photos: [],
        tags: ['work', 'fun']
    },
    {
        placeId: 4,
        name: 'Petah Tikva, Israel',
        loc: { lat: 32.084041, lng: 34.887762000000066 },
        description: 'Petah Tikva,',
        photos: [],
        tags: ['games']

    }
]

var map;
var markers = [];


function init(domElMap, domElMapSearchInput) {
    initMap(undefined, undefined, domElMap).then(() => {
        // google.maps.event.addDomListener(window, 'load', autocomplete)
        getPlaces()
            .then((places) => addMarkers(places))
    }
    )
}

function initMap(lat = 32.0749831, lng = 34.9120554, domEl) {
    console.log('InitMap');
    const gmapApi = new GoogleMapsApi();
    return new Promise((resolve, reject) => {
        resolve(gmapApi.load().then(() => {
            map = new google.maps.Map(
                domEl, {
                    center: { lat, lng },
                    zoom: 11
                })
        }))
    })
}



function getPlaces() {
    console.log('get')
    var placesDB;
    return storageService.load(PLACES_KEY)
        .then((places) => {
            if (!places) {
                placesDB = placesItems;
                storageService.store(PLACES_KEY, placesDB)
                    .then(() => console.log('success'))
            } else {
                placesDB = places;
            }
            return Promise.resolve(placesDB);
        })
}

function repositionMap(loc) {
    map.setCenter(loc)
}


function addMarker(loc, placeId) {
    var marker = new google.maps.Marker({
        position: loc,
        map: map,
        animation: google.maps.Animation.DROP,
        title: '',
        placeId
    });
    markers.push(marker);
    
}

function addMarkers(placesDB) {
    placesDB.forEach(place => {
        addMarker(place.loc, place.placeId)
    });
}

function autocomplete() {
    var input = document.querySelector('.map-search-input');
    var autocomplete = new google.maps.places.Autocomplete(input);
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
        setTimeout(() => {
            document.querySelector(".map-search-btn").click();
        }, 200)
    })
}


function deletePlace(placeId) {
    return storageService.load(PLACES_KEY)
        .then(placesDB => {
            var idx = placesDB.findIndex((place) => place.placeId === placeId);
            placesDB.splice(idx, 1)
            return storageService.store(PLACES_KEY, placesDB)
        })
}

function query() {
    return getPlaces()
        .then((places) => {
            console.log(places)
            return places
        })
}

function getById(id) {
    return storageService.load(PLACES_KEY)
        .then(place => {
            return place.find(place => place.placeId === id)
        })
}



export default {
    init,
    addMarker,
    repositionMap,
    query,
    addMarkers,
    deletePlace,
    getById,
    repositionMap

}

