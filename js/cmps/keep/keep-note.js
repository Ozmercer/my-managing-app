import keepService from '../../service/keep-service/keep.service.js'

export default {
    props: ['note'],
    template: `
        <section class="keep-note">
            <div class="note flex flex-column space-between" :style="{backgroundColor: note.background}">
                <div class="main">
                    <button class="delete" @click="deleteNote"></button>
                    <textarea class="edit-input" 
                    cols="15" rows="5" v-if="edit && note.content" v-model="note.content"/>
                    <img v-if="note.url" class="note-img" :src="note.url" alt="Faulty URL adress"><br>
                    <pre v-if="!edit" :style="{fontSize: note.fontSize + 'px'}">{{note.content}}</pre>
                </div>
                <div class="btns">
                    <input type="color" v-model="note.background" @change="update">
                    <template v-if="note.content">
                        <button @click="sizeUp" class="button"><i class="fas fa-font"></i></button>
                        <button @click="sizeDown" class="button is-small"><i class="fas fa-font"></i></button>
                    </template>
                    <button class="button edit-btn" @click="edit=!edit" ><i class="far fa-edit"></i></button>
                </div>
                <form v-if="edit && note.url" @submit.prevent>
                    <label>Add URL:</label>
                    <input type="text" v-model.lazy="note.url">
                    <button>Done</button>
                </form>
            </div>
        </section>
    `,
    data() {
        return {
            edit: false,
            toEdit: 'Edit',
            background: this.note.background
        }
    },
    methods: {
        deleteNote() {
            this.$emit('delete-note', this.note.id)
        },
        update() {
            this.$emit('update')
        },
        sizeUp() {
            this.note.fontSize *= 1.1
        },
        sizeDown() {
            this.note.fontSize /= 1.1
        }
    }
}