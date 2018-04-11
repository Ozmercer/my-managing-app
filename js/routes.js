import home from "./pages/home.js";
import mail from "./pages/mail/mail.js";

const routes = [
    {path: '/', component: home},
    {path: '/mail', component: mail},
]

Vue.use(VueRouter);
var myRouter = new VueRouter({routes})

export default myRouter;