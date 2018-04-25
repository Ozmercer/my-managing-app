export default {
    template: `
    <section class="home container">
        <h1 class="title is-1">Welcome To My Managing App</h1>    
        <h3 class="title is-3">Where would you like to go?</h3>
        <div class="applications logo">
            <a class="title is-2 my block"><router-link to='/mail'>My Mail</router-link></a>
            <a class="title is-2 managing block"><router-link to='/map'>My Map</router-link></a>
            <a class="title is-2 app block"><router-link to='/keep'>My Arranger</router-link></a>
        </div>
    </section>
    `
}