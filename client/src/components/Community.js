import React, { useState } from 'react';
import PendingRequests from './common/PendingRequests';
import Friends from './common/Friends';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import Axios from 'axios';
import * as Yup from 'yup';
import FormikControl from './common/FormikControl';

function Community() {
  const params = useParams();
  const [requestNotif, setRequestNotif] = useState('');

  const navigate = useNavigate();

  const refresh = () => {
    navigate(`/dashboard/${params.id}/community`);
  };

  const initialValues = {
    username: '',
  };
  const validationSchema = Yup.object({
    username: Yup.string()
      .required('Required')
      .max(20, 'Cannot be more than 20 characters')
      .notOneOf(
        [`${params.id}`],
        'You cannot send a friend request to yourself'
      ),
  });

  const onSubmit = (values) => {
    Axios.post(`http://localhost:3001/friendRequest/${params.id}`, {
      username: values.username,
    }).then((response) => {
      setRequestNotif(response.data.message);
    });

    refresh();
  };
  return (
    <div>
      <h3>🧑🏽‍🤝‍🧑🏽 Make friends in the community, {params.id}</h3>
      <br />
      <span>Use this tab to send friend request to people you know.</span>
      <span>Type a username in the search bar to send a friend request.</span>
      <span>
        You can see what your friends are up to by viewing their profile.
      </span>
      <br />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form style={{ margin: '0', marginLeft: '-25px', border: '0' }}>
            <FormikControl
              control='input'
              type='text'
              label=''
              name='username'
              placeholder='Enter username...'
            />
            <span style={{ color: 'red', fontSize: '0.9em' }}>
              {requestNotif}
            </span>
            <br />
            <button
              style={{ width: '180px' }}
              type='submit'
              disabled={!formik.isValid}
            >
              Send Friend Request
            </button>
          </Form>
        )}
      </Formik>
      <PendingRequests id={params.id} />
      <hr />
      <Friends id={params.id} />
    </div>
  );
}

export default Community;
