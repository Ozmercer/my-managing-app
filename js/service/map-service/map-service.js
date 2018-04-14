import { GoogleMapsApi } from './gmaps.class.js';
import storageService from '../storage.service.js';
import eventbus, { GOOGLE_AUTOCOMPLETE } from '../eventBus.js';


const GEOCODE_KEY = 'AIzaSyBLTGWuNv67ZQBPz4eFJLo2cr-4qUCwW9o'
const PLACES_KEY = 'placesDB'

var prevMarker = null;
var currMarker = null;
var newPlace = {
    // id: null,
    name: null,
    loc: {
        lat: null,
        lng: null,
    }
};
var map;
var markers = [];




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



function init(domElMap, domElMapSearchInput) {
    initMap(undefined, undefined, domElMap).then(() => {
        var infoWindow = new google.maps.InfoWindow()
        google.maps.event.addDomListener(window, 'load', autocomplete)

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

function setPrevICon() {
    if (prevMarker) {
        prevMarker.setIcon(prevMarker.defaultIcon);
        prevMarker.infoWindow.close()
        // console.log('prevMarker', prevMarker)
    }
}



function addMarker(place) {
    var marker = new google.maps.Marker({
        position: place.loc,
        map: map,
        animation: google.maps.Animation.DROP,
        title: place.name,
    });
    var lat = (place.placeId) ? place.loc.lat : newPlace.loc.lat
    var lng = (place.placeId) ? place.loc.lag : newPlace.loc.lng
    var name = (place.placeId) ? place.name : newPlace.name
    console.log('place', marker.placeId)
    if (place.placeId) {
        markers.push(marker);
    } else {
        if (currMarker) currMarker.setMap(null);
        currMarker = marker;
        // triggerMarker()
    }
    marker.addListener('click', () => {
        var content = `
                <div id="content">
                <div id="siteNotice"></div>
                <h1 id="firstHeading" class="firstHeading">
                    <b>${place.name}</b>
                </h1>
                <div id="bodyContent">
                    <p>
                    <p>Description: <b>${place.description}</b></p>
                        <span>lat: ${place.loc.lat}</span>
                        <span>lng: ${place.loc.lng}</span>
                    </p>
                </div>
            `
        marker.infoWindow = new google.maps.InfoWindow()
        marker.infoWindow.setContent(content);
        marker.infoWindow.open(map, marker);
        setPrevICon();
        marker.defaultIcon = marker.getIcon();
        marker.setIcon('https://lh3.ggpht.com/Tr5sntMif9qOPrKV_UVl7K8A_V3xQDgA7Sw_qweLUFlg76d_vGFA7q1xIKZ6IcmeGqg=s64');
        prevMarker = marker;
    })
}

function addMarkers(placesDB) {
    placesDB.forEach(place => {
        console.log('place', place)
        addMarker(place)
    });
}

function triggerMarker(idx) {
    var triggerMaker;
    if (idx === 0 || idx ) {       
        console.log('markers[idx]',markers[0])
        triggerMaker = markers[idx]
    } else {
         triggerMaker = marker;
    }
    console.log('markers', markers)
    console.log('marker len', markers[length - 1])
    console.log('marker[0]', markers[0])

    new google.maps.event.trigger(triggerMaker, 'click');
}
function removeMarker() {
    currMarker.setMap(null)
}


function autocomplete() {
    var input = document.querySelector('#map-search-input');
    var autocomplete = new google.maps.places.Autocomplete(input);
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
        console.log('autocomplete', autocomplete.getPlace().formatted_address)
        newPlace.loc.lat = autocomplete.getPlace().geometry.location.lat()
        newPlace.loc.lng = autocomplete.getPlace().geometry.location.lng()
        newPlace.name = autocomplete.getPlace().formatted_address;

    })
}


function deletePlace(placeId, makerIdx) {
    return storageService.load(PLACES_KEY)
        .then(placesDB => {
            var idx = placesDB.findIndex((place) => place.placeId === placeId);
            placesDB.splice(idx, 1)
            markers[makerIdx].setMap(null);
            return storageService.store(PLACES_KEY, placesDB)
        })
}

function query(filterPrams = null) {
   return getPlaces()
        .then((places) => {
            if (filterPrams) {
                // filterPrams.byName.toLowerCase();
                // filterPrams.byTag.toLowerCase();
               return places.filter(place => {
                //    place.name.toLowerCase();
                //    place.tag.toLowerCase();
                    return (place.name.includes(filterPrams.byName) || filterPrams.byName === '') 
                });
            }
            return places
        })
}

function getById(id) {
    return storageService.load(PLACES_KEY)
        .then(place => {
            return place.find(place => place.placeId === id)
        })
}

function addPlace(place, placeId) {
    return storageService.load(PLACES_KEY)
        .then(places => {
            if (placeId) {
                var idx = places.findIndex(place => place.placeId === placeId)
                places.splice(idx, 1, place)
            } else {
                place.placeId = Date.now()
                places.push(place)
                currMarker.setMap(null);
                addMarker(place)
            }
            console.log("!!!!!!!!!!!!!!!!!!!", place)
            storageService.store(PLACES_KEY, places)
            return place
        })
}


function getNewPlace() {
    addMarker(newPlace);
    repositionMap(newPlace.loc);
    setTimeout(() => {
        eventbus.$emit(GOOGLE_AUTOCOMPLETE, newPlace)

    }, 500)
}

export default {
    init,
    addMarker,
    repositionMap,
    query,
    addMarkers,
    deletePlace,
    getById,
    repositionMap,
    addPlace,
    triggerMarker,
    getNewPlace,
    removeMarker,


}

