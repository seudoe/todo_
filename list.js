import { updateLocalStorage } from "./home.js";
export class List {
    id;
    note;
    time;
    constructor(id, note, time){
        this.id = id;
        this.note = note;
        this.time = time;
    }
}

export let notes = [];
export let doneNotes = [];
// export function loadNotes(){
//     notes = JSON.parse(localStorage.getItem('notes'));
//     notes = notes.map((note, index) => {
//         return new List(note.id, note.note, dayjs(note.time));
//     })
// }

// export function loadUndoneNotes(){
//     doneNotes = JSON.parse(localStorage.getItem('doneNotes'));
//     doneNotes = doneNotes.map((note, index) => {
//         return new List(note.id, note.note, dayjs(note.time));
//     })
// }


// loadNotes();
// loadUndoneNotes();

// /*
notes = [
    {
        id : '0001',
        note : 'Eat Eggs Perfect',
        date : dayjs()
    },
    {
        id : '0002',
        note : 'Do the Laundary',
        date : dayjs()
    },
    {
        id : '0003',
        note : 'Do the homework',
        date : dayjs()
    },
    {
        id : '0004',
        note : 'Complleter Something',
        date : dayjs()
    },
    {
        id : '0005',
        note : 'Very long note',
        date : dayjs()
    },
    {
        id : '0006',
        note : 'somethinngs wrong Bro',
        date : dayjs()
    },
    {
        id : '0007',
        note : 'Notes are lil wierd here',
        date : dayjs()
    },
    {
        id : '0008',
        note : 'Eat Eggs Perfect',
        date : dayjs()
    }
].map((note, index) => {
    return new List(note.id, note.note, dayjs(note.time));
});

doneNotes = [
    {   
        id : '00003',
        note : 'Done note 1',
        time : dayjs()
    }, 
    {
        id : '8932',
        note : 'Done note 2',
        time : dayjs()
    }
].map((doneNote, index) => {
    return new List(doneNote.id, doneNote.note, dayjs(doneNote.time));
});

// */

updateLocalStorage();





