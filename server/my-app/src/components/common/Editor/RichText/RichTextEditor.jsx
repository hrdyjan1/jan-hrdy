import React, { useState, useRef, useEffect, useCallback } from 'react';
import { EditorState, RichUtils, AtomicBlockUtils } from 'draft-js';
import Editor from 'draft-js-plugins-editor';

import RichTextMenu from './RichTextMenu';
import { RTEContainer, customStyleMap } from './styles';
import { emptyState, myBlockStyleFn, plugins } from './helpers';

export default function RichTextEditor({ changeContent, shouldClear }) {
  const rte = useRef(null);
  const [editorState, setEditorState] = useState(emptyState);

  const onChange = useCallback(
    editorState => {
      setEditorState(editorState);
      const content = editorState.getCurrentContent();
      console.log(content.getBlockMap());
      changeContent(editorState.getCurrentContent());
    },
    [changeContent]
  );

  useEffect(() => {
    if (shouldClear) {
      onChange(emptyState);
    }
  }, [onChange, shouldClear]);

  const setStyle = useCallback(style => onChange(RichUtils.toggleInlineStyle(editorState, style)), [
    editorState,
    onChange
  ]);

  const insertMedium = useCallback(
    (mediumType, medium) => {
      const contentState = editorState.getCurrentContent();
      const contentStateWithEntity = contentState.createEntity(mediumType, 'IMMUTABLE', {
        src: medium,
      });
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      const newEditorState = EditorState.set(editorState, {
        currentContent: contentStateWithEntity
      });
      onChange(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '));
    },
    [editorState, onChange]
  );

  return (
    <>
      <RichTextMenu setStyle={setStyle} insertMedium={insertMedium} editorState={editorState} />
      <RTEContainer
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          rte.current.editor.focus();
        }}
      >
        <Editor
          ref={rte}
          blockStyleFn={myBlockStyleFn}
          {...{ plugins, editorState, onChange, customStyleMap }}
        />
      </RTEContainer>
    </>
  );
}
