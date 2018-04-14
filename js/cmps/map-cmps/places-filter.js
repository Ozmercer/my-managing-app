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
            <form>
                <div class="label">
                    Filter by Name:
                    <input class="input" type="text" v-model="filter.byName" @input="emitFilter" />
                </div> 
                <!-- <div class="label">
                    Filter by Tag:
                    <input class="input" type="number" v-model="filter.byTag" @input="emitFilter" />
                </div>           -->
                <button class="button is-rounded is-success filter-btn">Filter </button>
            </form>
        </section>
            `
    };