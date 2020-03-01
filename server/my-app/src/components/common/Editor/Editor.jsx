import React, { useState, useCallback } from 'react';
import { stateToHTML } from 'draft-js-export-html';
import { RichTextEditor } from './RichText';

const options = {
  inlineStyles: {
    TITLE: { style: { fontSize: '1.5em' } }
  }
};

const Editor = () => {
  const [content, setContent] = useState();
  const [shouldClear, setShouldClear] = useState();

  const changeContent = useCallback(newContent => {
    setContent(newContent);
    setShouldClear(false);
  }, []);

  const saveContent = () => {
    const markup = stateToHTML(content, options);
    console.log('markup', markup);
  };

  const clearContent = () => setShouldClear(true);

  return (
    <>
      <RichTextEditor changeContent={changeContent} shouldClear={shouldClear} />
      <button type='button' onClick={clearContent}>
        Clear me
      </button>
      <button type='button' onClick={saveContent}>
        Save
      </button>
    </>
  );
};

export default Editor;
