import "./App.css";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import { useEffect, useState } from "react";
import Split from "react-split";
import { nanoid } from "nanoid";

function App() {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || []
  );
  const [currentNoteID, setCurrentNoteID] = useState(
    (notes[0] && notes[0].id) || ""
  );

  function updateNote(text) {
    setNotes((oldNotes) =>
      oldNotes.map((oldNote) => {
        return oldNote.id === currentNoteID
          ? { ...oldNote, body: text }
          : oldNote;
      })
    );
  }

  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here",
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setCurrentNoteID(newNote.id);
  }

  const findCurrentNote = () => {
    return (
      notes.find((note) => {
        return note.id === currentNoteID;
      }) || notes[0]
    );
  };

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[25, 75]} direction="horizontal" className="split">
          <Sidebar
            notes={notes}
            currentNote={findCurrentNote()}
            setCurrentNoteId={setCurrentNoteID}
            newNote={createNewNote}
          />
          {currentNoteID && notes.length > 0 && (
            <Editor currentNote={findCurrentNote()} updateNote={updateNote} />
          )}
        </Split>
      ) : (
        <div className="no-notes">
          <h1>You have no notes</h1>
          <button className="first-note" onClick={createNewNote}>
            Create one now
          </button>
        </div>
      )}
    </main>
  );
}

export default App;
