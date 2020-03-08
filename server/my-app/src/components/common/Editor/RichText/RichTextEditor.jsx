import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Editor, EditorState, RichUtils, AtomicBlockUtils } from 'draft-js';
// import createImagePlugin from 'draft-js-image-plugin';

import { RTEContainer, customStyleMap } from './styles';
import RichTextMenu from './RichTextMenu';

const emptyState = EditorState.createEmpty();
// const imagePlugin = createImagePlugin();
// const plugins = [imagePlugin];

export default function RichTextEditor({ changeContent, shouldClear }) {
  const rte = useRef(null);
  const [editorState, setEditorState] = useState(emptyState);

  const onChange = useCallback(
    editorState => {
      setEditorState(editorState);
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
        src: medium
      });
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      const newEditorState = EditorState.set(editorState, {
        currentContent: contentStateWithEntity
      });
      setEditorState(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '));
    },
    [editorState]
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
        <Editor ref={rte} {...{ editorState, onChange, customStyleMap }} />
      </RTEContainer>
    </>
  );
}
