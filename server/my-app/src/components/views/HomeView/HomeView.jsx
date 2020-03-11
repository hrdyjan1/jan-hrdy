import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo';

const MUTATION = gql`
  mutation($file: Upload!) {
    uploadFile(file: $file) {
        success
    }
  }
`;

const HomeView = () => {
  const [mutate] = useMutation(MUTATION);
  const onChange = ({
    target: {
      validity,
      files: [file]
    }
  }) => validity.valid && mutate({ variables: { file } });

  return <input type='file' required onChange={onChange} />;
};

export default HomeView;
