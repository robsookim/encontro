import React from 'react';

import '../meeting.css';

const Notes = ({currentNote, handleChange}) => (
  <section className="notes">
    <input className="notes__input notes__input--title"
           type="text"
           name="title"
           onChange={handleChange}
           value={currentNote.title} />
    <textarea className="notes__input notes__input--text"
              name="text"
              value={currentNote.text}
              onChange={handleChange} />
  </section>
);

export default Notes;