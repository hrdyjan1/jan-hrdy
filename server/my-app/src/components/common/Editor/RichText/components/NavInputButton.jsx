import React from 'react';
import { IconButton } from '@material-ui/core';

const NavUploadImageButton = ({ children, onClick, accept = 'image/*', id = 'upload-photo' }) => {
  return (
    <div>
      <input
        onChange={onClick}
        accept={accept}
        style={{ display: 'none' }}
        id={id}
        name={id}
        type='file'
      />
      <label htmlFor={id} style={{ cursor: 'inherit', lineHeight: 0 }}>
        <IconButton variant='raised' component='span'>
          {children}
        </IconButton>
      </label>
    </div>
  );
};

export default NavUploadImageButton;
