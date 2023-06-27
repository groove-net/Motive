import React from 'react';
import { Field, ErrorMessage } from 'formik';
import TextError from './TextError';
import '../../styles/common/FormikComponents.css';

function Radio(props) {
  const { label, name, options, ...rest } = props;
  return (
    <div className='form-control'>
      <label className='label'>{label}</label>
      <br />
      <Field name={name} {...rest}>
        {({ field }) => {
          return options.map((option) => {
            return (
              <div className='radio-options' key={option.key}>
                <input
                  type='radio'
                  id={option.value}
                  {...field}
                  value={option.value}
                  checked={field.value === option.value}
                />
                <label className='radio-labels' htmlFor={option.value}>
                  {option.key}
                </label>
              </div>
            );
          });
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}

export default Radio;
