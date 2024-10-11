// Select elements
const button = document.querySelector(".button");
const notesContainer = document.querySelector(".notes-container");
let notes = [];


function addNote() {
    const noteHTML = `
      <p class="note" contenteditable="true">
        <img src="./img/delete.png" alt="delete">
      </p>`;
    notesContainer.insertAdjacentHTML("beforeend", noteHTML);
}

function saveNotesToLocalStorage() {
  const noteElements = document.querySelectorAll(".note");
  notes = Array.from(noteElements).map(note => note.textContent.trim());
  localStorage.setItem("notes", JSON.stringify(notes));
}

function loadNotesFromLocalStorage() {
  const savedNotes = JSON.parse(localStorage.getItem("notes") || "[]");
  notes = savedNotes;
  const notesHTML = savedNotes.map(note => `
    <p class="note" contenteditable="true">
      <img src="./img/delete.png" alt="delete">${note}
    </p>`).join("");
  notesContainer.insertAdjacentHTML("beforeend", notesHTML);
}

function handleNoteDeletion(event) {
  if (event.target.tagName === "IMG") {
    event.target.parentElement.remove();
    saveNotesToLocalStorage(); 
  }
}


button.addEventListener("click", addNote);
window.addEventListener("beforeunload", saveNotesToLocalStorage);
window.addEventListener("load", loadNotesFromLocalStorage);
notesContainer.addEventListener("click", handleNoteDeletion);
