import React from 'react';
import { Field, ErrorMessage } from 'formik';
import TextError from './TextError';
import '../../styles/common/FormikComponents.css';

function Input(props) {
  const { label, name, placeholder, ...rest } = props;
  return (
    <div className='form-control'>
      <label className='label' htmlFor={name}>
        {label}
      </label>
      <Field
        className='input'
        id={name}
        name={name}
        {...rest}
        placeholder={placeholder}
      />
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}

export default Input;
