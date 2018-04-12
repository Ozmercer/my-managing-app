import utilService from '../util.service.js'
import storageService from '../storage.service.js'

var mailsDB = [];
var nextId = 1;
var MAIL_KEY = 'e-mails'


function generateMails() {
    return storageService.load(MAIL_KEY)
    .then(inStorage => {
        if (inStorage) mailsDB = inStorage;
        else {
            var mails = [];
            for (var i=0;i<10;i++) {
                mails.push(generateNewMail())
            }
            mailsDB = mails
        }    
        storageService.store(MAIL_KEY, mailsDB).then(mails => mailsDB)
        return Promise.resolve(mailsDB)
    })
}

function generateNewMail(content, date) {
    return {
        id: nextId++,
        content: content || utilService.lorem(20,60),
        date: date || utilService.randomDate(new Date(2017, 5, 1), new Date()).valueOf(),
        unread: true
    }
}

function addMail(mail) {
    mailsDB.unshift(mail);
    storageService.store(MAIL_KEY, mailsDB)
}

function editMail(mail) {

}

export default {
    generateMails,
    generateNewMail,
    addMail
}