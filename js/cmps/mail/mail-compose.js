import mailService from '../../service/mail-service/mail.service.js'

export default {
    template: `
    <section class="mail-compose">
        <h1>Compose mail</h1>    
        <form >
            <label>
                <input type="text" placeholder="Type mail..." v-model="content">
            </label>
            <button @click.prevent="sendMail()">Send</button>
        </form>
    </section>
    `,
    data() {
        return {
            content: null,
            date: null,
            newMail: null
        }
    },
    methods: {
        sendMail() {
            mailService.generateNewMail(this.content, this.date)
            console.log('newMail:', this.newMail);
            
            this.$emit('new-mail', this.newMail)
        }
    }
}