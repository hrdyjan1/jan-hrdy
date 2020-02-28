import { gql } from 'apollo-server';

export default gql`
  type User {
    id: String
    email: String
    token: String
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

  type Query {
    getMinds: [Mind]
    getMind(mindId: String): Mind
  }
  type Mutation {
    login(loginUser: LoginUser): User
    register(registerUser: RegisterUser): User
    createMind(createdMind: CreatedMind): Mind
    deleteMind(mindId: String): String
    createComment(createdComment: CreatedComment): Mind
    deleteComment(deletedComment: DeletedComment): Mind
    likeMind(mindId: String): Mind
  }
  type Subscription {
    newMindSubscribe: Mind
  }
`;
