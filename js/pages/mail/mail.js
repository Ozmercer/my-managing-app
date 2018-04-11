import mailService from '../../service/mail-service/mail.service.js'
import mailDetails from '../../cmps/mail/mail-details.js'
import mailCompose from '../../cmps/mail/mail-compose.js'

export default {
    template: `
    <section class="mail">
        <h1>Welcome To My Mail</h1>
        <h2>You have {{totUnread}} unread messeges</h2>
        <ul>
            <li v-for="mail in mails" @click="openMail(mail)" class="mail" :class="{unread: mail.unread}">
                {{mail.content | substr50}} | {{(mail.unread)? 'unread mail |':''}}
                {{mail.date | timeAgo}} 
                <button @click.stop="markAsUnread(mail)">Mark as unread</button>
            </li>
        </ul>
        <button @click="composeMail()">Compose new mail</button>
        <mail-compose v-if="compose" @new-mail="newMail"></mail-compose>
        <mail-details :mail="currMail" v-if="currMail" @close-details="closeDetails()"></mail-details>
    </section>
    `,
    data() {
        return {
            mails: null,
            totUnread: null,
            currMail: null,
            compose: false
        }
    },
    created() {
        this.mails = mailService.generateMails();
        this.totUnread = this.mails.length
    },
    methods: {
        openMail(mail) {
            if (mail.unread) {
                mail.unread = false;
                this.totUnread--
            }
            this.currMail = mail
        },
        markAsUnread(mail) {
            mail.unread = true;
            this.totUnread++
        },
        closeDetails() {
            this.currMail = null;
        },
        composeMail() {
            this.compose = true;
        },
        newMail(ev) {
            console.log(ev);
            
        }
    },
    components: {
        mailDetails,
        mailCompose
    }

}