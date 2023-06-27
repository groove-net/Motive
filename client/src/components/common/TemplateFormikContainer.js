import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from './FormikControl';
import '../../styles/common/FormikComponents.css';

function FormikContainer() {
  const usernames = ['gabriel', 'gabe'];

  // for checkbox
  const checkboxOptions = [
    { key: 'Option 1', value: 'coption1' },
    { key: 'Option 2', value: 'coption2' },
    { key: 'Option 3', value: 'coption3' },
  ];

  // for radio
  const radioOptions = [
    { key: 'Option 1', value: 'roption1' },
    { key: 'Option 2', value: 'roption2' },
    { key: 'Option 3', value: 'roption3' },
  ];

  // for selection
  const accountTypeOptions = [
    { key: 'Select an option', value: '' },
    { key: 'Student', value: 'student' },
    { key: 'Professional', value: 'professional' },
    { key: 'Personal', value: 'personal' },
  ];
  const initialValues = {
    email: '',
    username: '',
    description: '',
    accountType: '',
    radioOption: '',
    checkboxOption: [],
    birthDate: '',
  };
  const validationSchema = Yup.object({
    email: Yup.string().required('Required').email('Invalid email address'),
    username: Yup.string()
      .required('Required')
      .max(20, 'Cannot exceed 20 charcters')
      .notOneOf(usernames, 'Already taken'),
    description: Yup.string()
      .min(20, 'Must be at least 20 charcters')
      .max(200, 'Cannot exceed 200 characters'),
    accountType: Yup.string().required('Please select an option'),
    radioOption: Yup.string().required('Required'),
    checkboxOption: Yup.array().min(1, 'Required'),
    birthDate: Yup.string().required('Required'),
  });

  const onSubmit = (values) => console.log('Form data', values);
  return (
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
            placeholder='Enter email...'
          />
          <FormikControl
            control='input'
            type='text'
            label='Username:'
            name='username'
            placeholder='Enter username...'
          />
          <FormikControl
            control='textarea'
            label='Feel free to tell us a bit about yourself (Optional)'
            name='description'
          />
          <FormikControl
            control='select'
            label='Select account type:'
            name='accountType'
            options={accountTypeOptions}
          />
          <FormikControl
            control='radio'
            label='Radio Topic:'
            name='radioOption'
            options={radioOptions}
          />
          <FormikControl
            control='checkbox'
            label='Checkbox Topic:'
            name='checkboxOption'
            options={checkboxOptions}
          />
          <FormikControl control='date' label='Pick a date:' name='birthDate' />
          <br />
          <button type='submit' disabled={!formik.isValid}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default FormikContainer;
