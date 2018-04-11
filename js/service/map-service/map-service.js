import { GoogleMapsApi } from './gmaps.class.js';

const GEOCODE_KEY = 'AIzaSyBLTGWuNv67ZQBPz4eFJLo2cr-4qUCwW9o'

var map;
var marker;

function initMap(lat = 32.0749831, lng = 34.9120554 , domEl) {

    console.log('InitMap');

    const gmapApi = new GoogleMapsApi();
    return gmapApi.load().then(() => {
        map = new google.maps.Map(
            domEl, {
                center: { lat, lng },
                zoom: 11
            })
    });


}

function repositionMap(loc){
    map.setCenter(loc)
}


function addMarker(loc) {
    marker = new google.maps.Marker({
        position: loc,
        map: map,
        animation: google.maps.Animation.DROP,
        title: ''
    });
    marker.setIcon('./images/map-marker.png');
}

function autocomplete() {
    var input = document.querySelector('.search-bar input');
    var autocomplete = new google.maps.places.Autocomplete(input);
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
        setTimeout(() => {
            document.querySelector(".search-form button").click();       
        },200)
    })
    google.maps.event.addDomListener(window, 'load', autocomplete);
}



export default {
    initMap,
    addMarker,
    repositionMap,
}

