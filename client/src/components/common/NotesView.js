import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function NotesView() {
  const params = useParams();

  const navigate = useNavigate();

  const navigateToNotesList = () => {
    navigate(`/dashboard/${params.id}/notes`);
  };

  return (
    <div>
      <Button onClick={navigateToNotesList} variant='secondary'>
        Return to Notes
      </Button>
      <br />
      <br />
      <h1>
        <b>{params.title}</b>
      </h1>
      <hr />
      <p style={{ marginLeft: '3px' }}>{params.content}</p>
    </div>
  );
}

export default NotesView;
