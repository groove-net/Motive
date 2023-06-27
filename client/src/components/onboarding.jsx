import React from 'react';
import '../styles/onboarding.css';
import FormikContainer from './common/OnboardingFormikContainer';
import { Link } from 'react-router-dom';

function Onboarding(props) {
  const { email } = props;
  return (
    <React.Fragment>
      <Link to='/'>
        <img
          style={{ height: '50px', margin: '10px' }}
          src={require('../motive-logo.jpg')}
          alt='logo'
        />
      </Link>
      <div className='onboarding'>
        <FormikContainer email={email} />
      </div>
    </React.Fragment>
  );
}

export default Onboarding;
