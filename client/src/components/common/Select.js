import React from 'react';
import { Field, ErrorMessage } from 'formik';
import TextError from './TextError';
import '../../styles/common/FormikComponents.css';

function Select(props) {
  const { label, name, options, ...rest } = props;
  return (
    <div className='form-control'>
      <label className='label' htmlFor={name}>
        {label}
      </label>
      <br />
      <Field
        style={{ margin: '7px 0' }}
        as='select'
        id={name}
        name={name}
        {...rest}
      >
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.key}
            </option>
          );
        })}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}

export default Select;
