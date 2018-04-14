import home from "./pages/home.js";
import mail from "./pages/mail/mail.js";
import map from "./pages/map/map.js";
import placesDetails from "./cmps/map-cmps/places-details.js";
import placesEdit from "./cmps/map-cmps/places-edit.js";


const routes = [
    {path: '/', component: mail},
    {path: '/mail', component: mail,
        children: [
            {path: '/mail/details'},
            {path: '/mail/compose'},
            {path: '/mail/compose/:mailID?'}
        ]},
    {path: '/map', component: map,
        children: [
            {path: '/map/details/:placeId', component: placesDetails},
            {path: '/map/edit', component: placesEdit},
            {path: '/map/edit/:placeId', component: placesEdit}
        ]},
]

Vue.use(VueRouter);
var myRouter = new VueRouter({routes})

export default myRouter;