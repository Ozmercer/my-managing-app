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
    </section>
    `,
    computed: {
        sentDate() {
            return moment(this.mail.date).format('MMMM Do YYYY, h:mm:ss a')
        }
    },
    methods: {
        close() {
            this.$emit('close-details')
        },
        reply() {
            this.$emit('reply', this.mail.subject)
        }
    }
}