import React from "react";
import "../App.css";

function Sidebar(props) {
  const noteElements = props.notes.map((note, index) => (
    <div key={note.id}>
      <div
        className={`title ${
          note.id === props.currentNote.id ? "selected-note" : ""
        }`}
        onClick={() => props.setCurrentNoteID(note.id)}
      >
        <h4 className="text-snippet">{note.body.split("\n")[0]}</h4>
      </div>
    </div>
  ));

  return (
    <section className="pane sidebar">
      <div className="sidebar--header">
        <h3>Notes</h3>
        <button onClick={props.newNote}>+</button>
      </div>
      {noteElements}
    </section>
  );
}

export default Sidebar;
