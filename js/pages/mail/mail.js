import mailService from '../../service/mail-service/mail.service.js'
import mailDetails from '../../cmps/mail/mail-details.js'
import mailCompose from '../../cmps/mail/mail-compose.js'
import mailFilter from '../../cmps/mail/mail.filter.js'

export default {
    template: `
    <section class="mail">
        <h1>Welcome To My Mail</h1>
        <h2>You have {{totUnread}} unread messeges</h2>
        <mail-filter :mails="mails" @filter="setFilter"></mail-filter>
        <ul>
            <li v-for="mail in mails" @click="openMail(mail)" class="mail" :class="{unread: mail.unread}">
                {{mail.content | substr50}} | {{(mail.unread)? 'unread mail |':''}}
                {{mail.date | timeAgo}} 
                <button @click.stop="markAsUnread(mail)">Mark as unread</button>
            </li>
        </ul>
        <button @click="composeMail()">Compose new mail</button>
        <mail-compose v-if="compose" ></mail-compose>
        <mail-details :mail="currMail" v-if="currMail" @close-details="closeDetails()"></mail-details>
    </section>
    `,
    data() {
        return {
            mails: null,
            totUnread: null,
            currMail: null,
            compose: false,
            filter: null
        }
    },
    created() {
        mailService.generateMails().then(mailsDB => {
            this.mails = mailsDB;
            var count = 0;
            this.mails.forEach(mail => {
                if (mail.unread) count++
            })
            this.totUnread = count;
                console.log(this.totUnread);
        })
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
        setFilter(filters) {
            this.filter = filters
            console.log(this.filter);
        },
    },
    components: {
        mailDetails,
        mailCompose,
        mailFilter
    },

}