import React, { useState, useCallback } from 'react';
import { stateToHTML } from 'draft-js-export-html';

import { RichTextEditor } from './RichText';
import { options } from './RichText/helpers';

const Editor = () => {
  const [content, setContent] = useState();
  const [shouldClear, setShouldClear] = useState();

  const changeContent = useCallback(newContent => {
    setContent(newContent);
    setShouldClear(false);
  }, []);

  const saveContent = () => {
    if (!content) {
      return;
    }
    const markup = stateToHTML(content, options);
    console.log('markup');
    console.log(markup);
  };

  const addImage = () => {
    console.log('not yer');
  };
  const clearContent = () => setShouldClear(true);

  return (
    <>
      <RichTextEditor changeContent={changeContent} shouldClear={shouldClear} />
      <button type='button' onClick={clearContent}>
        Clear me
      </button>
      <button type='button' onClick={addImage}>
        Add image
      </button>
      <button type='button' onClick={saveContent}>
        Save
      </button>
    </>
  );
};

export default Editor;
