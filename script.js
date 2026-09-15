const mainControls = document.querySelector('#main-controls');
const formView = document.querySelector('#form-view');
const addCardBtn = document.querySelector('#addCardBtn');
const closeBtn = document.querySelector('#closeBtn');
const noteForm = document.querySelector('#noteForm');
const cardStack = document.querySelector('#cardStack');
const upBtn = document.querySelector('#upBtn');
const downBtn = document.querySelector('#downBtn');
const deleteBtn = document.querySelector('#deleteBtn');
const headingInput = document.querySelector('#headingInput');
const notesInput = document.querySelector('#notesInput');



let notes = [];
let savedData = localStorage.getItem('notesApp_data');
if (savedData !== null) {
    notes = JSON.parse(savedData);
} 
else {
    notes = [];
}

function saveAndShow() {
    localStorage.setItem('notesApp_data', JSON.stringify(notes));
    showStack();
}

// Show Form
addCardBtn.addEventListener('click', () => {
    mainControls.classList.add('hidden');
    formView.classList.remove('hidden');
});

// Close Form
closeBtn.addEventListener('click', () => {
    formView.classList.add('hidden');
    mainControls.classList.remove('hidden');
    noteForm.reset();
});

// Save Note
noteForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const heading = headingInput.value.trim();
    const content = notesInput.value.trim();

    if (heading && content) {
        notes.unshift({ heading, content });
        noteForm.reset();
        formView.classList.add('hidden');
        mainControls.classList.remove('hidden');
        saveAndShow();
    }
});

// show stack
function showStack() {
    cardStack.innerHTML = '';

    if (notes.length === 0) {
        cardStack.innerHTML = `
            <div class="note-card empty-card">
                <p>No notes yet. Click 'Add'!</p>
            </div>
        `;
        return;
    }

    const visibleCount = Math.min(notes.length, 4);

    for (let i = visibleCount - 1; i >= 0; i--) {
        const note = notes[i];
        const cardElement = document.createElement('div');
        cardElement.classList.add('note-card');

        cardElement.style.transform = `translateY(${i * 10}px) scale(${1 - i * 0.05})`;
        cardElement.style.zIndex = visibleCount - i;
        cardElement.style.opacity = `${1 - i * 0.2}`;

        cardElement.innerHTML = `
            <h3>${note.heading}</h3>
            <p>${note.content}</p>
        `;

        cardStack.appendChild(cardElement);
    }
}

// up
upBtn.addEventListener('click', () => {
    if (notes.length > 1) {
        const topNote = notes.shift();
        notes.push(topNote);
        saveAndShow();
    }
});

// down
downBtn.addEventListener('click', () => {
    if (notes.length > 1) {
        const bottomNote = notes.pop();
        notes.unshift(bottomNote);
        saveAndShow();
    }
});

// delete
deleteBtn.addEventListener('click', () => {
    if (notes.length > 0) {
        notes.shift(); 
        saveAndShow(); 
    }
});

showStack();