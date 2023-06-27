import React from 'react';
import '../../styles/common/FormikComponents.css';

function TextError(props) {
  return (
    <div className='error' style={{ color: 'red', fontSize: '0.9em' }}>
      {props.children}
    </div>
  );
}

export default TextError;
