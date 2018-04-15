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
                <img src="./img/mma-logo.png" alt="logo" class="logo-img">
                <hr>
                <mail-filter :mails="mails" @filter="setFilter"></mail-filter>
                <div class="label flex space-between">
                    Sort by:
                    <div class="btns">
                        <button class="button is-outlined is-small is-rounded" 
                        @click.stop="sortBy('subject')">
                        Subject {{subjectAscending}}
                    </button>
                        <button class="button is-small is-rounded" @click.stop="sortBy('date')">
                            Date {{dateAscending}}
                        </button>
                    </div>
                </div>
                <button class="button is-rounded is-danger center" @click="composeMail()">
                    Compose new mail
                </button>
            </div>
            <ul >
                <li v-for="mail in mailsToShow" @click="openMail(mail)" 
                    class="mail" :class="{unread: mail.unread}">
                    <div class="preview-top flex space-between">
                        <span class="subject">{{mail.subject | substr20}}</span>
                        <span class="date">{{mail.date | timeAgo}}</span>
                    </div>
                    <div class="preview-bottom flex space-between">
                        <span class="content">{{mail.content | substr30}}</span>
                        <a  @click.stop="markAsRead(mail)" v-if="mail.unread" >
                            <i class="far fa-envelope-open" title="mark as read"></i>
                        </a>
                        <a  @click.stop="markAsUnread(mail)" v-else>
                            <i class="far fa-envelope" title="mark as unread"></i>
                        </a>
                    </div>
                </li>
            </ul>
        </section>
        <section class="details resp-hide">
            <div class="default-area" v-if="!currMail && !compose">
                <h1 class="title is-2">Welcome To My Mail App</h1>
                <p></p>
                <h2 class="subtitle">You have <b>{{totUnread}}</b> unread messages</h2>
                <h2 class="subtitle">Out of a total of <b>{{mails.length}}</b> messages</h2>
                <div class="prog">
                    <p class="percent">{{unreadMails}}% unread</p>
                    <progress class="progress is-success" :value="unreadMails" max="100"></progress>
                </div>
                <hr>
                <div class="sorry">
                    <p><strong>SORRY!</strong></p>
                    <p>Due to technical difficulties, you can currently only recieve E-Mails 
                        from yourself
                    </p>
                    <img src="./img/construction.png" alt="Sorry" class="construction">
                </div>
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
            },
            subjectAscending: '▼',
            dateAscending: '▼'
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
                return ((mail.subject.toLowerCase().includes(this.filter.byName) ||
                         mail.content.toLowerCase().includes(this.filter.byName)) &&
                        (this.filter.byRead === 'all' || mail.unread === this.filter.byRead))
            })
            return toShow
        },
        unreadMails() {
            var percent = this.totUnread / this.mails.length * 100
            return parseInt(percent) || 0
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
            this.showDetails()
        },
        markAsUnread(mail) {
            mail.unread = true;
            this.totUnread++;
            mailService.updateMail(mail)
        },
        markAsRead(mail) {
            mail.unread = false;
            this.totUnread--;
            mailService.updateMail(mail)
        },
        closeDetails() {
            this.currMail = null;
            this.hideDetails();
        },
        closeCompose() {
            this.compose = false;
            this.hideDetails();
        },
        reply(subject) {
            this.newSubject = 'Re: ' + subject;
            this.compose = true;
            this.closeDetails()
            this.showDetails()
        },
        composeMail() {
            this.compose = true;
            this.closeDetails()
            this.newSubject = '';
            this.showDetails()
        },
        hideDetails() {
            document.querySelector('.mail .navbar').classList.remove('resp-hide');
            document.querySelector('.mail .details').classList.add('resp-hide');
        },
        showDetails() {
            document.querySelector('.mail .navbar').classList.add('resp-hide');
            document.querySelector('.mail .details').classList.remove('resp-hide');
        },
        deleteMail(mail) {
            mailService.deleteMail(mail)
        },
        setFilter(filters) {
            this.filter = filters
        },
        sortBy(sortBy) {
            if (sortBy === 'subject') {
                var a = mailService.sortBySubject()
                this.mails = a.mailsDB
                this.subjectAscending = a.isAscending
                
            }
            else if (sortBy === 'date') {
                var a = mailService.sortByDate()
                this.mails = a.mailsDB
                this.dateAscending = a.isAscending;
                
            } 
            
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