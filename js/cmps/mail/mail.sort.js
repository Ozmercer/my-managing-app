export default {
    template: `
    <section class="sort">
        <h1>Sort E-Mails</h1>
        <label>
        Sort by: 
        <select v-model="sortType" @change="sortBy()">
            <option value=""></option>
            <option value="subject">subject</option>
            <option value="date">Date</option>
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
    methods: {
        sortBy() {
            this.$emit('sorted',this.sortType)
        }
    }
}