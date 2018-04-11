import utilService from '../util.service.js'

var mailsDB = [];
var nextId = 1;


function generateMails() {
    var mails = [];
    for (var i=0;i<10;i++) {
        mails.push(generateNewMail())
    }
    mailsDB = mails
    return mailsDB
}

function generateNewMail() {
    return {
        id: nextId++,
        content: utilService.lorem(5,10),
        date: new Date() ,
        unread: true
    }
}

export default {
    generateMails
}