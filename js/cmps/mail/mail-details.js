export default {
    props: ['mail'],
    template: `
    <section class="mail-details">
        <article class="message is-info">
            <div class="message-header">
                <p>mail details</p>
                <button class="delete" @click="close">X</button>
            </div>
            <div class="message-body">
                <p class="content">Sent at {{sentDate}}</p>
                <h3 class="title is-4">Subject: {{mail.subject}}</h3>
                <hr>
                <h5 class="subtitle">Mail content:</h5>
                <p>{{mail.content}}</p>
            </div>
        </article>
        <button class="button is-rounded" @click="reply">Reply</button>
        <button class="button is-rounded" @click.stop="markAsUnread(mail)" 
        :disabled="mail.unread">Mark as unread</button>
    </section>
    `,
    computed: {
        sentDate() {
            return moment(this.mail.date).format('MMMM Do YYYY, h:mm:ss a')
        }
    },
    methods: {
        close() {
            this.$emit('close')
        },
        reply() {
            this.$emit('reply', this.mail.subject)
        },
        markAsUnread(mail) {
            this.$emit('markAsUnread', this.mail)
        }
    }
}