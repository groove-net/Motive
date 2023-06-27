import React, { useState, useEffect } from 'react';
import '../styles/register.css';
import { useFormik } from 'formik';
import auth from './auth';
import CheckCode from './checkcode';
import { Link } from 'react-router-dom';
import Axios from 'axios';

function Register() {
  const [authCode, setAuthCode] = useState('');
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  // get emails from db
  const [emails, setCurrentEmails] = useState([]);

  function codeGenerator() {
    return Math.floor(Math.random() * 90000) + 10000;
  }

  useEffect(() => {
    Axios.get('http://localhost:3001/get/currentEmails').then((response) => {
      setCurrentEmails(response.data);
    });
  }, []);

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = 'Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    } else if (values.email.length > 45) {
      errors.email = 'Email cannot be more than 45 characters';
    } else if (emails.includes(values.email)) {
      errors.email = 'Email is already exists. Try logging in';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validate,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      const generatedCode = codeGenerator();
      setAuthCode(`${generatedCode}`);
      setEmail(values.email);
      auth.sendEmail(
        'Motive Authention Code',
        values.email,
        `Here is the Authentication code you need to register your new Motive account: ${generatedCode}`
      );
      setEmailSent(true);
      alert(generatedCode);
    },
  });

  if (!emailSent) {
    return (
      <React.Fragment>
        <Link to='/'>
          <img
            style={{ height: '50px', margin: '10px' }}
            src={require('../motive-logo.jpg')}
            alt='logo'
          />
        </Link>
        <div style={{ marginTop: '110px' }} className='register'>
          <h1 className='form-heading'>Let's make sure it's you.</h1>
          <form onSubmit={formik.handleSubmit}>
            <div className='form'>
              <label for='email'>Enter email</label>
              <input
                type='email'
                name='email'
                id='email'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                placeholder='Enter your email address...'
              />
              {formik.touched.email && formik.errors.email && (
                <span>{formik.errors.email}</span>
              )}
              <button
                style={{
                  width: '200px',
                  marginTop: '25px',
                  marginLeft: '0',
                }}
                type='submit'
              >
                Continue with email
              </button>
            </div>
          </form>
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
    return <CheckCode authCode={authCode} email={email} />;
  }
}

export default Register;
