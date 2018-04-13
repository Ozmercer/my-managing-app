export default {
    props: ['mails'],
    template: `
    <section class="mail-filter">
        <form>
            <label class="label">
                Filter e-mails by name:
                <input type="search" v-model="filter.byName" @input.prevent="setFilter" class="input is-rounded">
            </label>
            <label class="label">
                filter by:
                <div class="select is-rounded">
                    <select class="select is-rounded" v-model="filter.byRead" @change="setFilter">
                        <option value="all">All</option>
                        <option value="unread">Unread</option>
                        <option value="read">Read</option>
                    </select>
                </div>
            </label>
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