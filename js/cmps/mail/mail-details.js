export default {
    props: ['mail'],
    template: `
    <section class="mail-details">
        <button @click="close">X</button>
        <h1>mail details</h1>
        <p>Mail content:</p>
        <p>{{mail.content}}</p>
        <p>Sent at {{sentDate}}</p>
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
        }
    }
}