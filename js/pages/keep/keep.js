import keepNote from '../../cmps/keep/keep-note.js'
import validUrl from '../../service/keep-service/keep.service.js'
import keepService from '../../service/keep-service/keep.service.js';
export default {
    template: `
    <section class="keep flex container1">
        <nav>
            <div class="nav-head">
                <img src="./img/mma-logo.png" alt="logo" class="logo-img">
                <hr>
            </div>
            <h1 class="title is-4">Welcome To My Keeping App</h1>
            <div class="field">
                <div class="control">
                    <label class="label">Add:
                    <div class="select">
                        <select v-model="noteType">
                            <option></option>
                            <option>Text</option>
                            <option>Photo</option>
                        </select>
                        </div>
                    </label>
                </div>
            </div>
            <form v-if="noteType" @submit.prevent="newNote()">
                <label>Enter <span v-if="noteType === 'Text'">text</span>
                             <span v-else-if="noteType === 'Photo'">URL</span>:</label>
                <input type="text" v-model="content">
                <button>Done</button>
                <div class="invalid" v-if="invalid">Please enter a valid URL.</div>
            </form>
        </nav>
        <div class="details">
            <ul class="flex flex-wrap">
                <li v-for="note in notes">
                    <keep-note :note="note" @delete-note="deleteNote" @update="update"></keep-note>
                </li>
            </ul>
        </div>
    </section>
    `,
    data() {
        return {
            notes: [],
            noteType: '',
            content: '',
            invalid: false
        }
    },
    created() {
        keepService.init().then(notesDB => {
            this.notes = notesDB;
            console.log('Notes on create:', notesDB);
            
        } )
        
    },
    methods: {
        newNote() {
            if (this.noteType === 'Text') {
                this.notes = keepService.newNote(this.noteType,this.content)
                console.log(this.notes);
                
            }
            if (this.noteType === 'Photo') {
                if(keepService.ValidURL(this.content)) {
                    this.notes = keepService.newNote(this.noteType,this.content)
                }
                else this.invalidUrl()
            }
        },
        invalidUrl() {
            this.invalid = true;
            setTimeout(()=>{
                this.invalid = false;
            },3000)
        },
        deleteNote(id) {
            keepService.deleteNote(id)
        },
        update() {
            keepService.update(this.notes)
        }
    },
    components: {
        keepNote
    }
}