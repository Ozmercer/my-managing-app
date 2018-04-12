import mailService from '../../service/mail-service/mail.service.js'

export default {
    props: ['subject'],
    template: `
    <section class="mail-compose">
        <h1>Compose mail</h1>
        <form >
            <label>
                <input type="text" placeholder="Subject..." v-model="newMail.subject">
                <textarea cols="80" rows="5" placeholder="Type mail..." v-model="newMail.content">
                </textarea>   
            </label>
            <button @click.prevent="sendMail()">Send</button>
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
            
            // this.$emit('new-mail', this.newMail)
            this.newMail = {
                subject: null,
                content: null,
                date: null
            }
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