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

// Missing <figure> handler
export const options = {
  inlineStyles: {
    TITLE: { attributes: { class: 'article-heading' } },
    RED: { attributes: { class: 'article-red' } },
    ORANGE: { attributes: { class: 'article-orange' } },
    YELLOW: { attributes: { class: 'article-yellow' } },
    GREEN: { attributes: { class: 'article-green' } },
    BLUE: { attributes: { class: 'article-blue' } },
    PURPLE: { attributes: { class: 'article-purple' } },
    BLACK: { attributes: { class: 'article-black' } },
    GRAY: { attributes: { class: 'article-gray' } },
    WHITE: { attributes: { class: 'article-white' } }
  },
  entityStyleFn: entity => {
    const entityType = entity.get('type').toLowerCase();
    if (entityType === 'image') {
      return {
        element: 'img',
        attributes: {
          src: entity.getData().src,
          class: 'article-image'
        }
      };
    }
  }
};
