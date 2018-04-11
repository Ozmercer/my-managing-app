import { GoogleMapsApi } from './gmaps.class.js';

const GEOCODE_KEY = 'AIzaSyBLTGWuNv67ZQBPz4eFJLo2cr-4qUCwW9o'

var placesDB = [
    {
        placeId:1,
        name: 'Jerusalem',
        loc: {lat : 32.0749831, lng : 34.9120554}
        
    },
    {
        placeId:2,
        name: 'Australia',
        loc: {lat: -34.397, lng: 150.644}
    },
    {
        placeId:3,
        name: 'Jerusalem',
        loc: {lat : 32.0749831, lng : 34.9120554}
    },
    {
        placeId:4,
        name: 'Jerusalem',
        loc: {lat : 32.0749831, lng : 34.9120554}
        
    },
    {
        placeId:5,
        name: 'Jerusalem',
        loc: {lat : 32.0749831, lng : 34.9120554}
        
    }
]

var map;
var marker;

function initMap(lat = 32.0749831, lng = 34.9120554, domEl) {

    console.log('InitMap');

    const gmapApi = new GoogleMapsApi();
    return gmapApi.load().then(() => {
        map = new google.maps.Map(
            domEl, {
                center: { lat, lng },
                zoom: 11
            })
    });

    return Promise.resolve()
}

function repositionMap(loc) {
    map.setCenter(loc)
}


function addMarker(loc) {
    marker = new google.maps.Marker({
        position: loc,
        map: map,
        animation: google.maps.Animation.DROP,
        title: ''
    });
}

function addMarkers(){
    placesDB.forEach(place => {
        addMarker(place.loc)
    });
}

// function autocomplete() {
//     var input = document.querySelector('.search-bar input');
//     var autocomplete = new google.maps.places.Autocomplete(input);
//     google.maps.event.addListener(autocomplete, 'place_changed', () => {
//         setTimeout(() => {
//             document.querySelector(".search-form button").click();       
//         },200)
//     })
// }
// google.maps.event.addDomListener(window, 'load', autocomplete);


function deletePlace(placeId){
    var idx = placesDB.findIndex((place) => place.placeId === placeId);
    placesDB.splice(idx,1);
    return Promise.resolve()
}

function query(){
    return placesDB;
}



export default {
    initMap,
    addMarker,
    repositionMap,
    query,
    addMarkers,
    deletePlace
    
}

