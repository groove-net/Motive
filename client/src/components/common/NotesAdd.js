import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import Axios from 'axios';
import * as Yup from 'yup';
import FormikControl from './FormikControl';

function NotesAdd() {
  const params = useParams();
  const [currentNotes, setCurrentNotes] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:3001/notes/get/currentNotes/${params.id}`).then(
      (response) => {
        setCurrentNotes(response.data);
      }
    );
  }, [params.id]);

  const navigate = useNavigate();

  const navigateToNotesList = () => {
    navigate(`/dashboard/${params.id}/notes`);
  };

  const initialValues = {
    title: '',
    content: '',
  };
  const validationSchema = Yup.object({
    title: Yup.string()
      .required('Required')
      .max(30, 'Cannot be more than 30 characters')
      .notOneOf(currentNotes, 'A note with this title already exists'),
    content: Yup.string()
      .required('Required')
      .max(1000, 'Cannot be more than 1000 characters'),
  });

  const onSubmit = (values) => {
    Axios.post(`http://localhost:3001/notes/post/${params.id}`, {
      title: values.title,
      content: values.content,
    });
    navigateToNotesList();
  };

  return (
    <div>
      <h3>Welcome to your quick notes app, {params.id}</h3>
      <hr />
      <br />
      <span>Use this template to quickly jote down ideas</span>
      <span>Click New Note + to create a new note directly on this board.</span>
      <br />
      <hr />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form style={{ margin: '0', border: '0' }}>
            <FormikControl
              control='input'
              type='text'
              label='Title:'
              name='title'
              placeholder='Enter title...'
            />
            <FormikControl
              control='textarea'
              label='Content:'
              name='content'
              placeholder='Notes...'
            />
            <br />
            <button
              style={{ float: 'right', display: 'inline' }}
              type='submit'
              disabled={!formik.isValid}
            >
              Add Notes
            </button>
            <br />
            <br />
            <button
              style={{
                float: 'left',
                display: 'inline',
                marginTop: '-48px',
                backgroundColor: '#ef4747',
              }}
              onClick={navigateToNotesList}
            >
              Cancel
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default NotesAdd;
