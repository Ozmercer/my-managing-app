import mailService from '../../service/mail-service/mail.service.js'
import mailDetails from '../../cmps/mail/mail-details.js'

export default {
    template: `
    <section class="mail">
        <h1>Welcome To My Mail</h1>
        <h2>You have {{totUnread}} unread messeges</h2>
        <ul>
            <li v-for="mail in mails" @click="openMail(mail)" class="mail" :class="{unread: mail.unread}">
                {{mail.content | substr50}} | {{(mail.unread)? 'unread mail |':''}} {{mail.date}} 
                <button @click.stop="markAsUnread(mail)">Mark as unread</button>
            </li>
        </ul>
        <mail-details :mail="currMail" v-if="currMail"></mail-details>
    </section>
    `,
    data() {
        return {
            mails: mailService.generateMails(),
            totUnread: mailService.generateMails().length,
            currMail: null
        }
    },
    created() {
        console.log(this.unread);
    },
    methods: {
        openMail(mail) {
            if (mail.unread) {
                mail.unread = false;
                this.totUnread--
            }
            this.currMail = mail
            console.log(this.currMail);
            
        },
        markAsUnread(mail) {
            mail.unread = true;
            this.totUnread++
        }
    },
    components: {
        mailDetails
    }

}