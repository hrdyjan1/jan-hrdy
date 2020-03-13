import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo';

const CREATE_ARTICLE_MUTATION = gql`
  mutation(
    $body: String!
    $logo: Upload!
    $hashtags: [String]!
    $header: String!
    $subHeader: String!
  ) {
    uploadFile(
      body: $body
      logo: $logo
      hashtags: $hashtags
      header: $header
      subHeader: $subHeader
    ) {
      success
    }
  }
`;

const HomeView = () => {
  const [createArticle] = useMutation(CREATE_ARTICLE_MUTATION);
  const [logoFile, setLogoFile] = useState();

  const submit = () => {
    createArticle({
      variables: {
        body: 'Body',
        logo: logoFile,
        hashtags: ['abc'],
        header: 'Header',
        subHeader: 'SubHeader'
      }
    });
  };

  const onChange = ({
    target: {
      validity,
      files: [file]
    }
  }) => {
    validity.valid && setLogoFile(file);
  };

  return (
    <div>
      <label>
        Logo:
        <input
          required
          id='logo'
          type='file'
          name='logo'
          accept='image/png, image/jpeg, image/jpg'
          onChange={onChange}
        />
      </label>
      <button type='button' onClick={submit}>
        Logo Sent
      </button>
    </div>
  );
};

export default HomeView;
