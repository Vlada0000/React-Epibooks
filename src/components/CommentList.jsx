import ListGroup from 'react-bootstrap/ListGroup';
import SingleComment from './SingleComment';

const CommentList = ({ reviews, onDelete, onEdit }) => {
  if (!reviews) {
    return <p>No comments available</p>; 
  }

  return (
    <ListGroup>
      {reviews.map((review) => (
        <SingleComment key={review._id} review={review} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </ListGroup>
  );
};

export default CommentList;
