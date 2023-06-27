import React from 'react';
import '../styles/login.css';
import FormikContainer from './common/LoginFormikContainer';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <React.Fragment>
      <Link to='/'>
        <img
          style={{ height: '50px', margin: '10px' }}
          src={require('../motive-logo.jpg')}
          alt='logo'
        />
      </Link>
      <div style={{ marginTop: '110px' }} className='login'>
        <FormikContainer />
      </div>
    </React.Fragment>
  );
}

export default Login;
