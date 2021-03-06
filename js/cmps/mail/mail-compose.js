import mailService from '../../service/mail-service/mail.service.js'

export default {
    props: ['subject'],
    template: `
    <section class="mail-compose">
        <div class="compose-top flex space-between">
            <h1 class="subtitle">Compose mail</h1>
            <button class="delete" @click="close"></button>
        </div>
        <form >
            <div class="field">
                <label class="label">
                    <input class="input" type="text" placeholder="Subject..." v-model="newMail.subject"><br>
                </label>
            </div>
            <div class="field">
                <label class="label">
                    <input class="input" type="text" value="TO: myself" disabled>
                </label>
            </div>
            <div class="field">
                <p class="control">
                    <textarea class="textarea" rows="5" placeholder="Type mail..." v-model="newMail.content">
                    </textarea>   
                </p>
            </div>
                <div class="right">
                    <button @click.prevent="sendMail()" class="button is-success is-large">Send</button>
                </div>
        </form>
    </section>
    `,
    data() {
        return {
            newMail: {
                subject: null,
                content: null,
                date: null,
            }
        }
    },
    create() {
        
    },
    methods: {
        sendMail() {
            console.log('content:', this.newMail.content)
            this.newMail = mailService.generateNewMail(this.newMail.subject, this.newMail.content, Date.now());
            mailService.addMail(this.newMail);
            
            this.newMail = {
                subject: null,
                content: null,
                date: null
            }
            this.close()
        },
        close() {
            this.$emit('close')
        }
    },
    watch:{
        newMail: {
            immediate:true,
            handler() {
                this.newMail.subject = this.subject
            this.newMail.subject = this.subject
            }
        }
    }
}