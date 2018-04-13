export default {
    template: `
    <section class="sort">
        <label class="label">
        Sort by: 
                <button @click="sortBy('subject')" v-model="sortType">Subject</button>
                <button @click="sortBy('date')" v-model="sortType">Date</button>
        <!-- <div class="select is-rounded">
            <select v-model="sortType" @change="sortBy()">
                <option value="Sort by"></option>
                <option value="subject">subject</option>
                <option value="date">Date</option>
            </select>
        </div> -->
        </label>    
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