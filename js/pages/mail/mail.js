import mailService from '../../service/mail-service/mail.service.js'
import mailDetails from '../../cmps/mail/mail-details.js'
import mailCompose from '../../cmps/mail/mail-compose.js'
import mailFilter from '../../cmps/mail/mail.filter.js'
import mailSort from '../../cmps/mail/mail.sort.js'

export default {
    template: `
    <section class="mail flex no-wrap container1">
        <section class="navbar flex column">
            <div class="nav-head">
                <h1>Welcome To My Mail</h1>
                <mail-filter :mails="mails" @filter="setFilter"></mail-filter>
                <!-- <mail-sort @sorted="sortBy"></mail-sort> -->
                <div class="label">
                    Sort by:
                    <button @click.stop="sortBy('subject')">Subject</button>
                    <button @click.stop="sortBy('date')">Date</button>
                </div>
                <button @click="composeMail()">Compose new mail</button>
            </div>
            <ul >
                <li v-for="mail in mailsToShow" @click="openMail(mail)" 
                class="mail" :class="{unread: mail.unread}">
                <div class="preview-top flex space-between">
                    <span class="subject">{{mail.subject}}</span>
                    <span class="date">{{mail.date | timeAgo}}</span>
                </div>
                <div class="preview-bottom flex space-between">
                    <span class="content">{{mail.content | substr20}}</span>
                    <a class="delete" @click.stop="deleteMail(mail)"></a>
                </div>
            </li>
        </ul>
    </section>
    <section class="details">
        <div class="default-area" v-if="!currMail && !compose">
            <h2>You have <b>{{totUnread}}</b> unread messeges</h2>
            <h2>You have a total of <b>{{mails.length}}</b> messegaes</h2>
            </div>
            <mail-compose v-if="compose" :subject="newSubject" @close="closeCompose"></mail-compose>
            <mail-details :mail="currMail" v-if="currMail" @markAsUnread="markAsUnread"
                @close="closeDetails()" @reply="reply"></mail-details>
        </section>
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
        closeCompose() {
            this.compose = false;
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
        deleteMail(mail) {
            mailService.deleteMail(mail)
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