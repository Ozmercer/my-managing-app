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
            storageService.store(MAIL_KEY, mailsDB).then(mails => mailsDB)
        }    
        return Promise.resolve(mailsDB)
    })
}

function generateNewMail(subject, content, date) {
    return {
        id: Date.now(),
        subject: subject || utilService.lorem(1,3).toUpperCase(),
        content: content || utilService.lorem(20,60),
        date: date || utilService.randomDate(new Date(2017, 5, 1), new Date()).valueOf(),
        unread: true
    }
}

function addMail(mail) {
    mailsDB.unshift(mail);
    updateMail(mail)
}
function deleteMail(mailToDel) {
    var idxToDel = mailsDB.findIndex((mail)=>{
        return mail === mailToDel
    });
    mailsDB.splice(idxToDel,1)
    updateMail(mailsDB)
}

function updateMail(mail) {
    storageService.store(MAIL_KEY, mailsDB)
}

function sortBySubject() {
    var isAscending = '▼';
    var sorted = mailsDB.slice()
    sorted.sort(compareSubject);
    if (JSON.stringify(sorted) === JSON.stringify(mailsDB)) {
        sorted.reverse();
        isAscending = '▲';
    } 
    mailsDB = sorted;
    return {mailsDB, isAscending}
}
function compareSubject(a,b) {
    if (a.subject > b.subject) return 1;
    if (a.subject < b.subject) return -1;
    else return 0;
}
function sortByDate() {
    var isAscending = '▼';
    var sorted = mailsDB.slice()
    sorted.sort(compareDate);
    if (JSON.stringify(sorted) === JSON.stringify(mailsDB)) {
        sorted.reverse();
        isAscending = '▲';
    } 
    mailsDB = sorted;
    return {mailsDB, isAscending}
}
function compareDate(a,b) {
    return b.date-a.date;
}

export default {
    generateMails,
    generateNewMail,
    addMail,
    updateMail,
    sortBySubject,
    sortByDate,
    deleteMail
}