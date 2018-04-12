import home from "./pages/home.js";
import mail from "./pages/mail/mail.js";
import map from "./pages/map/map.js";
import placesDetails from "./cmps/map-cmps/places-details.js";

const routes = [
    {path: '/', component: home},
    {path: '/mail', component: mail,
        children: [
            {path: '/mail/details'},
            {path: '/mail/compose'},
            {path: '/mail/compose/:mailID?'}
        ]},
    {path: '/map', component: map,
        children: [
            {path: '/map/:placeId', component: placesDetails}
        ]},
]

Vue.use(VueRouter);
var myRouter = new VueRouter({routes})

export default myRouter;