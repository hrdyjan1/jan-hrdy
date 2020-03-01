import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';

import { RTEContainer, customStyleMap } from './styles';
import RichTextMenu from './RichTextMenu';

const emptyState = EditorState.createEmpty();

function useTraceUpdate(props) {
  const prev = useRef(props);
  useEffect(() => {
    const changedProps = Object.entries(props).reduce((ps, [k, v]) => {
      if (prev.current[k] !== v) {
        ps[k] = [prev.current[k], v];
      }
      return ps;
    }, {});
    if (Object.keys(changedProps).length > 0) {
      console.log('Changed props:', changedProps);
    }
    prev.current = props;
  });
}

export default function RichTextEditor({ changeContent, shouldClear }) {
  useTraceUpdate({ changeContent, shouldClear });
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

  return (
    <>
      <RichTextMenu setStyle={setStyle} />
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
