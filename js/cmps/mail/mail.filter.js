export default {
    props: ['mails'],
    template: `
    <section class="mail-filter">
        <h1>filter</h1>
        <form @submit.prevent="setFilter">
            <label>
                Filter e-mails by name:
                <input type="search" v-model="filter.byName">
            </label>
            <label>
                filter by:
                <select v-model="filter.byRead">
                    <option value="all">All</option>
                    <option value="unread">Unread</option>
                    <option value="read">Read</option>
                </select>
            </label>
        </form>
    </section>
    `,
    data() {
        return {
            filter: {
                byName: '',
                byRead: null
            }
        }
    },
    methods: {
        setFilter() {
            this.$emit('filter',this.filter)
        }
    }
}