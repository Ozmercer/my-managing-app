export default {
    template: `
    <section class="sort">
        <h1>Sort E-Mails</h1>
        <label>
        Sort by: 
        <select v-model="sortType">
            <option value="Sort by...">Sort by</option>
            <option value="title" @select="sortBy()">Title</option>
            <option value="date" @select="sortBy()">Date</option>
        </select>
        </label>    
        {{sortType}}
    </section>
    `,
    data() {
        return {
            sortType: 'Sort by',
        }
    },
    computed: {
        sortBy() {

        }
    }
}