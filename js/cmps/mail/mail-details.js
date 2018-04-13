export default {
    props: ['mail'],
    template: `
    <section class="mail-details">
        <button @click="close">X</button>
        <h1>mail details</h1>
        <p>Subject: {{mail.subject}} </p>
        <p>Mail content:</p>
        <p>{{mail.content}}</p>
        <p>Sent at {{sentDate}}</p>
        <button @click="reply">Reply</button>
        <button @click.stop="markAsUnread(mail)">Mark as unread</button>
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