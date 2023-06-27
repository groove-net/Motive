import React from 'react';
import { Field, ErrorMessage } from 'formik';
import TextError from './TextError';
import '../../styles/common/FormikComponents.css';

function TextArea(props) {
  const { label, name, ...rest } = props;
  return (
    <div className='form-control'>
      <label className='label' htmlFor={name}>
        {label}
      </label>
      <br />
      <Field
        style={{ margin: '7px 0' }}
        className='textarea'
        as='textarea'
        id={name}
        name={name}
        {...rest}
      />
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}

export default TextArea;
