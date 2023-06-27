import React from 'react';
import { Formik, Form } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import FormikControl from './FormikControl';
import '../../styles/common/FormikComponents.css';
import Axios from 'axios';

function FormikContainer() {
  const navigate = useNavigate();

  const navigateToDashboard = (id) => {
    // 👇️ navigate to /dashboard
    navigate(`/dashboard/${id}`);
  };

  const initialValues = {
    email: '',
    password: '',
  };
  const validationSchema = Yup.object({
    email: Yup.string().required('Required').email('Invalid email address'),
    password: Yup.string().required('This field is required'),
  });

  const onSubmit = (values) => {
    Axios.post('http://localhost:3001/login', {
      email: values.email,
      password: values.password,
    }).then((response) => {
      if (response.data.message) {
        alert(response.data.message);
      } else {
        navigateToDashboard(response.data[0].id);
      }
    });
  };
  return (
    <React.Fragment>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form>
            <h1 className='form-heading'>Log in.</h1>
            <br />
            <FormikControl
              control='input'
              type='email'
              label='Email:'
              name='email'
              placeholder='Enter your email address...'
            />
            <FormikControl
              control='input'
              type='password'
              label='Password:'
              name='password'
              placeholder='Enter your password...'
            />
            <br />
            <button
              style={{ marginLeft: '125px' }}
              type='submit'
              disabled={!formik.isValid}
            >
              Continue
            </button>
          </Form>
        )}
      </Formik>
      <br />
      <p style={{ textAlign: 'center' }}>
        Don't have an account?{' '}
        <Link to='/register' style={{ textDecoration: 'none' }}>
          sign up
        </Link>
      </p>
    </React.Fragment>
  );
}

export default FormikContainer;
