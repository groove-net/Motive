import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Axios from 'axios';
import FormikControl from './FormikControl';
import '../../styles/common/FormikComponents.css';

function FormikContainer(props) {
  const { email } = props;
  const [usernames, setUsername] = useState([]);

  const navigate = useNavigate();

  const navigateToDashboard = (id) => {
    // 👇️ navigate to /dashboard
    navigate(`/dashboard/${id}`);
  };

  useEffect(() => {
    Axios.get('http://localhost:3001/get/currentUsers').then((response) => {
      setUsername(response.data);
    });
  }, []);

  // for selection
  const accountTypeOptions = [
    { key: 'Select an option', value: '' },
    { key: 'Student', value: 'student' },
    { key: 'Professional', value: 'professional' },
    { key: 'Personal', value: 'personal' },
  ];

  // for checkbox
  const checkboxOptions = [{ key: 'Yes', value: 'yes' }];

  const initialValues = {
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
    accountType: '',
    description: '',
    checkboxOption: [],
  };

  const validationSchema = Yup.object({
    firstname: Yup.string()
      .required('Required')
      .max(20, 'Cannot exceed 20 charcters'),
    lastname: Yup.string()
      .required('Required')
      .max(20, 'Cannot exceed 20 charcters'),
    username: Yup.string()
      .required('Required')
      .max(20, 'Cannot exceed 20 charcters')
      .notOneOf(usernames, 'Already taken'),
    password: Yup.string()
      .required('This field is required')
      .min(8, 'Pasword must be 8 or more characters')
      .matches(
        /(?=.*[a-z])(?=.*[A-Z])\w+/,
        'Password ahould contain at least one uppercase and lowercase character'
      )
      .matches(/\d/, 'Password should contain at least one number')
      .matches(
        /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/,
        'Password should contain at least one special character'
      ),
    confirmPassword: Yup.string()
      .required('Please confirm your password')
      .oneOf([Yup.ref('password')], 'Passwords do not match'),
    birthDate: Yup.string().required('Required'),
    accountType: Yup.string().required('Please select an option'),
    description: Yup.string()
      .min(20, 'Must be at least 20 charcters')
      .max(200, 'Cannot exceed 200 characters'),
    checkboxOption: Yup.array().min(1, 'Required'),
  });

  const onSubmit = (values) => {
    Axios.post('http://localhost:3001/register', {
      username: values.username,
      password: values.password,
      email: email,
      firstname: values.firstname,
      lastname: values.lastname,
      accountType: values.accountType,
      about: values.description,
    });
    navigateToDashboard(values.username);
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
            <h1 className='form-heading'>Sign up.</h1>
            <br />
            <FormikControl
              control='input'
              type='text'
              label='Firstname'
              name='firstname'
              placeholder='Enter your firstname...'
            />
            <FormikControl
              control='input'
              type='text'
              label='Lastname'
              name='lastname'
              placeholder='Enter your lastname...'
            />
            <FormikControl
              control='input'
              type='text'
              label='What would you like to be called'
              name='username'
              placeholder='Enter username...'
            />
            <FormikControl
              control='input'
              type='password'
              label='Password'
              name='password'
              placeholder='Enter password...'
            />
            <FormikControl
              control='input'
              type='password'
              label='Confirm Password'
              name='confirmPassword'
              placeholder='Confirm password...'
            />
            <FormikControl control='date' label='Birth date' name='birthDate' />
            <FormikControl
              control='select'
              label='Select account type:'
              name='accountType'
              options={accountTypeOptions}
            />
            <FormikControl
              control='textarea'
              label='Feel free to tell us a bit about yourself (Optional)'
              name='description'
            />
            <FormikControl
              control='checkbox'
              label='Do you agree to the Motive Inc Terms and Conditions?'
              name='checkboxOption'
              options={checkboxOptions}
            />
            <br />
            <button type='submit' disabled={!formik.isValid}>
              Launch Motive
            </button>
          </Form>
        )}
      </Formik>
      <p style={{ textAlign: 'center' }}>
        Already have an account?{' '}
        <Link to='/login' style={{ textDecoration: 'none' }}>
          log in
        </Link>
      </p>
    </React.Fragment>
  );
}

export default FormikContainer;
