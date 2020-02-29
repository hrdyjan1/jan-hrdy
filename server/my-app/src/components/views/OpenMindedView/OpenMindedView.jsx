import React from 'react';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

import { get } from '../../../helpers';
import { Link } from 'react-router-dom';

const OpenMindedView = () => {
  const { data } = useQuery(GET_MINDS_QUERY);
  const minds = get(data, 'getMinds');

  if (!minds) {
    return null;
  }

  return (
    <div>
      <h1>Open Minded</h1>
      {minds.map(({ id, head, body, likeCount, commentCount }) => (
        <div key={id}>
          <br />
          <h2><Link to={`/post/${id}`}>{head}</Link></h2>
          <h3>{body}</h3>
          <p>{likeCount}: likes</p>
          <p>{commentCount}: comments</p>
        </div>
      ))}
    </div>
  );
};

const GET_MINDS_QUERY = gql`
  query {
    getMinds {
      id
      head
      body
      likeCount
      commentCount
    }
  }
`;

export default OpenMindedView;
