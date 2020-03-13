import { gql } from 'apollo-server';

export default gql`
  enum Role {
    ADMIN
    USER
  }
  #   type Logo {
  #     path: String!
  #     filename: String!
  #   }
  
  type Article {
    id: String!
    # filename: String!
    # path: String!
    header: String!
    subHeader: String!
    hashtags: [String]!
    createdAt: String
  }
  type User {
    id: String
    email: String
    token: String
    role: Role
    username: String
    createdAt: String
  }
  type Mind {
    id: String
    head: String
    body: String
    userId: String
    createdAt: String
    comments: [Comment]!
    likes: [Like]!
    commentCount: Int!
    likeCount: Int!
  }
  type Comment {
    id: String!
    body: String!
    createdAt: String!
    userId: String!
  }
  type Like {
    id: String!
    createdAt: String!
    userId: String!
  }
  type Status {
      success: String
  }
  # INPUTS
  input RegisterUser {
    username: String
    password: String
    confirmPassword: String
    email: String
  }
  input LoginUser {
    username: String
    password: String
  }
  input CreatedMind {
    head: String
    body: String
  }
  input CreatedComment {
    body: String
    mindId: String
  }
  input DeletedComment {
    mindId: String
    commentId: String
  }
  #   input CreatedArticle {
  #     # logo: Upload!
  #     header: String!
  #     subHeader: String!
  #     hashtags: [String]!
  #   }
  # QUERY
  type Query {
    getMinds: [Mind]
    getMind(mindId: String): Mind
    getArticles: [Article]
  }
  type Mutation {
    login(loginUser: LoginUser): User
    register(registerUser: RegisterUser): User
    createMind(createdMind: CreatedMind): Mind
    deleteMind(mindId: String): String
    createComment(createdComment: CreatedComment): Mind
    deleteComment(deletedComment: DeletedComment): Mind
    likeMind(mindId: String): Mind
    createArticle(header: String!, subHeader: String!, logo: Upload!, hashtags: [String]!): Article
    uploadFile(body: String!, logo: Upload!, hashtags: [String]!, header: String!, subHeader: String!): Status
  }
  type Subscription {
    newMindSubscribe: Mind
  }
`;
