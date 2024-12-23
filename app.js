// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


// Initialize Firebase
const app = initializeApp(firebaseConfig); // define firebase config through security
console.log(app);


const NoteInputArea = document.getElementById("textArea");
const NoteSidebar   = document.getElementById("textSidebar");


const notesList = [ {id: 0, title: "Test 1", content: "test note 1"} , 
                    {id: 1, title: "Test 2", content:  "test note 2"} ];
const notesMap = new Map(Object.entries(notesList));
let currentNotesIndex = 0;
console.log(notesMap);



function setNoteContext(){
    console.log("notesId: ", currentNotesIndex, notesMap.get(`${currentNotesIndex}`).content);
    NoteInputArea.value = notesMap.get(`${currentNotesIndex}`).content;
    // NoteInputArea.innerText = notesMap.get(`${currentNotesIndex}`).content;
}

// poplate notesidebar list
function poplateNotesList(){
    NoteSidebar.innerHTML = ``;
    notesMap.forEach((note)=>{
        console.log(note);
        const NoteListElement = document.createElement("span");
        NoteListElement.classList.add("noteListItem");
        NoteListElement.setAttribute("id", `NoteListItem-${note.id}`);
        NoteListElement.innerText = `${note.title}`;  
        NoteListElement.addEventListener("click",(e)=>{
            currentNotesIndex = note.id;
            setNoteContext(currentNotesIndex);
        });
        NoteSidebar.appendChild(NoteListElement);
    })
}


// Textarea hack to accept tab input
NoteInputArea.addEventListener("keydown", function(e){
    console.log("Keydown")
    if (e.key == 'Tab') {
      e.preventDefault();
      var start = this.selectionStart;
      var end = this.selectionEnd;
  
      // set textarea value to: text before caret + tab + text after caret
      this.value = this.value.substring(0, start) +
        "\t" + this.value.substring(end);
  
      // put caret at right position again
      this.selectionStart =
        this.selectionEnd = start + 1;
    }
})

NoteInputArea.addEventListener('input', function(e) {
    console.log(`${currentNotesIndex}`, e.target.value);
    notesMap.get(`${currentNotesIndex}`).content = e.target.value;

    console.log(notesMap);
});



// Init methods
poplateNotesList();
setNoteContext();
