import mailService from '../../service/mail-service/mail.service.js'

export default {
    template: `
    <section class="mail-compose">
        <h1>Compose mail</h1>    
        <form >
            <label>
                <input type="text" placeholder="Type mail..." v-model="newMail.content">
            </label>
            <button @click.prevent="sendMail()">Send</button>
        </form>
    </section>
    `,
    data() {
        return {
            newMail: {
                content: null,
                date: null,
            }
        }
    },
    methods: {
        sendMail() {
            console.log('content:', this.newMail.content)
            this.newMail = mailService.generateNewMail(this.newMail.content, Date.now());
            mailService.addMail(this.newMail);
            
            this.$emit('new-mail', this.newMail)
            this.newMail = {
                content: null,
                date: null,
            }
        }
    }
}