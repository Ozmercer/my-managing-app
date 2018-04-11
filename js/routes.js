import mail from "./pages/mail/mail.js";
import map from "./pages/map/map.js";
import note from "./pages/note/note.js";
import home from "./pages/home.js";

const routes = [
    {path: '/', component: home},
    {path: '/mail', component: mail},
    {path: '/map', component: map},
    {path: '/note', component: note},
]

Vue.use(VueRouter);
var myRouter = new VueRouter({routes})

export default myRouter;