import createImagePlugin from 'draft-js-image-plugin';
import { EditorState } from 'draft-js';

const imagePlugin = createImagePlugin();

export const plugins = [imagePlugin];
export const emptyState = EditorState.createEmpty();

export const myBlockStyleFn = contentBlock => {
  const type = contentBlock.getType();
  if (type === 'atomic') {
    return 'imageWrapper';
  }
};
