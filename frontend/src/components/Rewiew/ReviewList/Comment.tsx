import React from 'react';
import { CommentProps } from '../../../interface/ReviewModelTypes';

const Comment: React.FC<CommentProps> = ({ name, comment, rating, date }) => {
  return (
    <div>
      <h3>{name}</h3>
      <p>{comment}</p>
      <p>Rating: {rating}</p>
      <p>Date: {date}</p>
    </div>
  );
};
export default Comment;