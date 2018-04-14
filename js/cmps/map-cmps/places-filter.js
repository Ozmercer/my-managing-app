import eventBus, {FILTER_PLACES} from "../../service/eventBus.js"

export default {
    created(){
        this.emitFilter();
    },
    data(){
        return {
            filter: {
            byName:'',
            // byTag:''
        }
        }
    },
    methods: {
        emitFilter(){
            console.log('Emitting Filter!');
            eventBus.$emit(FILTER_PLACES,this.filter);
        }
    },
    template: `
        <section class="place-filter">
            <button class="clear-btn filter-btn">Filter </button>
            <label>
                By Name
                <input type="text" v-model="filter.byName" @input="emitFilter" />
            </label> 
            <!-- <label>
                By Tag
                <input type="text" v-model="filter.byTag" @input="emitFilter" />
            </label>           -->
        </section>
            `
    };