export default {
    props: ['mail'],
    template: `
    <section class="mail-details">
        <h1>mail details</h1>
        <p>Mail content:</p>
        <p>{{mail.content}}</p>
    </section>

    `
}