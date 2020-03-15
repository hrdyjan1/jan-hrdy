import React from 'react';
import { Label } from "semantic-ui-react";

const FileLabel = ({ shouldShowError, status }) =>
  shouldShowError ? (
    <Label basic color='red'>
      {status}
    </Label>
  ) : (
    <Label basic color='green'>
      {status}
    </Label>
  );
export default FileLabel;
