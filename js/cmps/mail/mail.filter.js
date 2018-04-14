export default {
    props: ['mails'],
    template: `
    <section class="mail-filter">
        <form>
            <div class="flex space-between name-filter">
                <label class="label">Filter by name:</label>
                <input type="search" v-model="filter.byName" @input.prevent="setFilter"
                    class="input is-rounded is-small">
            </div>
            <div class="flex space-between">
                <label class="label">Show:</label>
                <div class="select is-rounded is-small">
                    <select class="select is-rounded" v-model="filter.byRead" @change="setFilter">
                        <option value="all">All</option>
                        <option value="unread">Unread</option>
                        <option value="read">Read</option>
                    </select>
                </div>
            </div>
        </form>
    </section>
    `,
    data() {
        return {
            filter: {
                byName: '',
                byRead: 'all'
            }
        }
    },
    methods: {
        setFilter() {
            if (this.filter.byRead === 'unread') this.filter.byRead = true;
            else if (this.filter.byRead === 'read') this.filter.byRead = false;
            
            this.filter.byName = this.filter.byName.toLowerCase();
            this.$emit('filter',this.filter)
        }
    }
}