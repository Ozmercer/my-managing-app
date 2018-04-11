import mailService from '../../service/mail-service/mail.service.js'

export default {
    template: `
    <section class="mail">
        <h1>Welcome To My Mail</h1>
        <h2>You have {{unread}} unread messeges</h2>
        <ul>
            <li v-for="mail in mails" @click="openMail(mail)" class="mail" :class="{unread: mail.unread}">
                {{mail.content}} | unread | {{mail.date}} 
                <button @click.stop="markAsUnread(mail)">Mark as unread</button>
            </li>
        </ul>
    </section>
    `,
    data() {
        return {
            mails: mailService.generateMails(),
            unread: mailService.generateMails().length
        }
    },
    created() {
        console.log(this.unread);
    },
    methods: {
        openMail(mail) {
            if (mail.unread) {
                mail.unread = false;
                this.unread--
            }
        },
        markAsUnread(mail) {
            mail.unread = true;
            this.unread++
        }
    }

}