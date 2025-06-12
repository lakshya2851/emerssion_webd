    function addNote() {
      const note = document.createElement('div');
      note.className = 'note';
      note.contentEditable = true;
      note.innerText = 'New Note';
      note.ondblclick = () => note.remove();
      const container = document.getElementById('notesContainer');
      container.insertBefore(note, container.querySelector('.add'));
    }