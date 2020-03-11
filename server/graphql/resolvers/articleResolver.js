import { getArticles, createArticle, uploadFile } from '../queries';

export default {
  Query: {
    getArticles,
  },
  Mutation: {
    uploadFile,
    createArticle,
  },
};
