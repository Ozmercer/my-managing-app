import storageService from '../../service/storage.service.js'

var notesDB = []
var KEEP_KEY = 'notes'

function init() {
    return storageService.load(KEEP_KEY)
    .then(inStorage => {
        if (inStorage) notesDB = inStorage;
        else {
            for (let i=0; i<2; i++) {
                newNote('Text','Example note');
            }
            storageService.store(KEEP_KEY, notesDB).then(notes => notesDB)
        }    
        return Promise.resolve(notesDB)
    })
}

function newNote(noteType, content) {
    if (noteType === 'Text') {
        var note = {
            id: Date.now(),
            content: content,
            fontSize: 16,
            background: '#e7e41d'
        }
        notesDB.unshift(note)
        
    }
    else if (noteType === 'Photo') {
        var note = {
            url: content
        }
        notesDB.unshift(note)
    }
    storageService.store(KEEP_KEY, notesDB)
    return notesDB;
}

function update(notes) {
    notesDB = notes;
    storageService.store(KEEP_KEY, notesDB)
}

function ValidURL(str) {
    var pattern = new RegExp('^(https?:\/\/)');
    if (!pattern.test(str)) {
        // alert("Please enter a valid URL.");
        return false;
    } else {
        return true;
    }
    console.log('validated');

}

// function setFontSize(str) {
//     var fontSize;
//     var size = str.length;
//     if (size < 15) fontSize = '2em';
//     else if (size < 30) fontSize = '1.5em';
//     else fontSize = '1em';
//     return fontSize;
// }

function deleteNote(noteId) {
    var idxToRemove = notesDB.findIndex(note => {
        return note.id === noteId
    })
    notesDB.splice(idxToRemove, 1)
    storageService.store(KEEP_KEY, notesDB).then(notes => notesDB)
    return notesDB
}

export default {
    init,
    newNote,
    update,
    ValidURL,
    // setFontSize,
    deleteNote
}