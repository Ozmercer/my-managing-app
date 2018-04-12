import mailService from '../../service/mail-service/mail.service.js'
import mailDetails from '../../cmps/mail/mail-details.js'
import mailCompose from '../../cmps/mail/mail-compose.js'
import mailFilter from '../../cmps/mail/mail.filter.js'
import mailSort from '../../cmps/mail/mail.sort.js'

export default {
    template: `
    <section class="mail">
        <h1>Welcome To My Mail</h1>
        <h2>You have {{totUnread}} unread messeges</h2>
        <mail-filter :mails="mails" @filter="setFilter"></mail-filter>
        <mail-sort @sorted="sortBy"></mail-sort>
        <ul>
            <li v-for="mail in mailsToShow" @click="openMail(mail)" class="mail" :class="{unread: mail.unread}">
                {{mail.subject}} | {{mail.content | substr20}} | {{(mail.unread)? 'unread mail |':''}}
                {{mail.date | timeAgo}} 
                <button @click.stop="markAsUnread(mail)">Mark as unread</button>
            </li>
        </ul>
        <button @click="composeMail()">Compose new mail</button>
        <!-- <view-router></view-router> -->
        <mail-compose v-if="compose" :subject="newSubject" ></mail-compose>
        <mail-details :mail="currMail" v-if="currMail"
            @close-details="closeDetails()" @reply="reply"></mail-details>
    </section>
    `,
    data() {
        return {
            mails: [],
            totUnread: null,
            currMail: null,
            compose: false,
            newSubject: '',
            filter: {
                byName: '',
                byRead: 'all'
            }
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
    computed: {
        mailsToShow() {
            var toShow = this.mails.filter(mail => {
                return (mail.content.includes(this.filter.byName) &&
                        (this.filter.byRead === 'all' || mail.unread === this.filter.byRead))
            })
            return toShow
        }
    },
    methods: {
        openMail(mail) {
            if (mail.unread) {
                mail.unread = false;
                this.totUnread--
            }
            this.currMail = mail
            mailService.updateMail(mail)
            this.compose = false
        },
        markAsUnread(mail) {
            mail.unread = true;
            this.totUnread++;
            mailService.updateMail(mail)
        },
        closeDetails() {
            this.currMail = null;
        },
        reply(subject) {
            this.newSubject = 'Re: ' + subject;
            this.compose = true;
            this.closeDetails()
        },
        composeMail() {
            this.compose = true;
            this.closeDetails()
            this.newSubject = ''
        },
        setFilter(filters) {
            this.filter = filters
        },
        sortBy(sortBy) {
            if (sortBy === 'subject') this.mails = mailService.sortBySubject()
            else if (sortBy === 'date') this.mails = mailService.sortByDate()
            
            mailService.updateMail(this.mail)
        }
    },
    components: {
        mailDetails,
        mailCompose,
        mailFilter,
        mailSort
    },

}