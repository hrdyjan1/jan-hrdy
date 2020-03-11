import React, { useState, useCallback } from 'react';
import { stateToHTML } from 'draft-js-export-html';

import { RichTextEditor } from './RichText';
import { options } from './RichText/helpers';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo';

const UPLOAD_ARTICLE_MUTATION = gql`
  mutation CreateArticle($header: String!, $subHeader: String!, $logo: Upload!, $hashtags: [String]!) {
    createArticle(header: $header, subHeader: $subHeader, logo: $logo, hashtags: $hashtags) {
      id
    }
  }
`;


const Editor = () => {
  const [logo, setLogo] = useState();
  const [header, setHeader] = useState();
  const [content, setContent] = useState();
  const [shouldClear, setShouldClear] = useState();
  const [createArticle, { data }] = useMutation(UPLOAD_ARTICLE_MUTATION);

  const clearContent = () => setShouldClear(true);
  const changeContent = useCallback(newContent => {
    setContent(newContent);
    setShouldClear(false);
  }, []);

  const saveContent = () => {
    if (!content) {
      return;
    }
    const markup = stateToHTML(content, options);
    console.log('markup', markup);
    console.log('logo', logo);
    console.log('header', header);
  };

  // Logo
  const handleLogoChange = event => {
    setLogo(event.target.files[0]);
  };
  // Header
  const handleHeaderChange = event => {
    setHeader(event.target.value);
  };

  // Article
  const saveArticle = async () => {
      console.log('logo', logo)
      createArticle({variables: { logo: logo, header: 'Header', subHeader: 'subHeader', hashtags: ['abc', 'def'] }})
  }

  return (
    <>
      <label>
        Header:
        <input type='text' name='name' value={header} onChange={handleHeaderChange} />
      </label>
      <label>
        Logo:
        <input
          type='file'
          id='logo'
          name='logo'
          accept='image/png, image/jpeg'
          onChange={handleLogoChange}
        />
      </label>
      <RichTextEditor changeContent={changeContent} shouldClear={shouldClear} />
      <button type='button' onClick={clearContent}>
        Clear me
      </button>
      <button type='button' onClick={saveContent}>
        Save
      </button>
      <button type='button' onClick={saveArticle}>
        Save Article
      </button>
    </>
  );
};

export default Editor;
