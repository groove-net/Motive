import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import FormikControl from './common/FormikControl';
import '../styles/register.css';
import Onboarding from './onboarding';

function CheckCode(props) {
  const { authCode, email } = props;
  const [Authenticated, setAuthenticated] = useState(false);

  const checkCode = (auth, input) => {
    if (auth == input) {
      setAuthenticated(true);
    } else {
      alert('Wrong code. Try again.');
    }
  };

  const initialValues = {
    inputCode: '',
  };
  const validationSchema = Yup.object({
    inputCode: Yup.string()
      .required('Required')
      .matches(/^[0-9]+$/, 'Must be only digits')
      .min(5, 'Must be exactly 5 digits')
      .max(5, 'Must be exactly 5 digits'),
  });

  const onSubmit = (values) => checkCode(authCode, values.inputCode);
  if (!Authenticated) {
    return (
      <React.Fragment>
        <Link to='/'>
          <img
            style={{ height: '50px', margin: '10px' }}
            src={require('../motive-logo.jpg')}
            alt='logo'
          />
        </Link>
        <div style={{ marginTop: '110px' }} className='auth'>
          <h1 className='form-heading'>Let's make sure it's you.</h1>
          <span>We just sent you a temporary login code.</span>
          <span>Please check your junk or spam.</span>
          <br />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => (
              <Form>
                <FormikControl
                  control='input'
                  type='number'
                  label=''
                  name='inputCode'
                  placeholder='Enter your 5-digit code...'
                />
                <br />
                <button type='submit' disabled={!formik.isValid}>
                  Continue with code
                </button>
              </Form>
            )}
          </Formik>
          <br />
          <p style={{ textAlign: 'center' }}>
            Already have an account?{' '}
            <Link to='/login' style={{ textDecoration: 'none' }}>
              log in
            </Link>
          </p>
        </div>
      </React.Fragment>
    );
  } else {
    return <Onboarding email={email} />;
  }
}

export default CheckCode;
