import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import Axios from 'axios';

function Notes() {
  const params = useParams();
  const [notesList, setNotesList] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:3001/notes/get/${params.id}`).then(
      (response) => {
        setNotesList(response.data);
      }
    );
  });

  const deleteNote = (title) => {
    Axios.delete(`http://localhost:3001/notes/delete/${params.id}/${title}`);
  };

  const navigate = useNavigate();

  const navigateToNotesListAdd = () => {
    navigate(`/dashboard/${params.id}/notes/add`);
  };

  const navigateToNotesListView = (title, content) => {
    navigate(`/dashboard/${params.id}/notes/view/${title}/${content}`);
  };

  if (notesList.length === 0) {
    return (
      <div>
        <h3>🗒️ Welcome to your quick notes app, {params.id}</h3>
        <hr />
        <br />
        <span>Use this template to quickly jote down ideas</span>
        <span>
          Click New Note + to create a new note directly on this board.
        </span>
        <br />
        <Button onClick={navigateToNotesListAdd} variant='secondary'>
          New Task +
        </Button>
        <br />
        <hr />
        <span>You currently have 0 notes</span>
      </div>
    );
  } else {
    return (
      <div>
        <h3>🗒️ Welcome to your quick notes app, {params.id}</h3>
        <hr />
        <br />
        <span>Use this template to quickly jote down ideas</span>
        <span>
          Click New Note + to create a new note directly on this board.
        </span>
        <br />
        <Button onClick={navigateToNotesListAdd} variant='secondary'>
          New Task +
        </Button>
        <br />
        <hr />

        <Table className='table table-striped'>
          <thead>
            <tr>
              <th scope='col'>Title</th>
              <th scope='col'></th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {notesList.map((note) => (
              <tr>
                <th scope='row'>{note.title}</th>
                <td>
                  <Button
                    onClick={() => {
                      navigateToNotesListView(note.title, note.content);
                    }}
                    variant='primary'
                  >
                    View
                  </Button>
                </td>
                <td>
                  <Button
                    onClick={() => {
                      deleteNote(note.title);
                    }}
                    variant='danger'
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Notes;
