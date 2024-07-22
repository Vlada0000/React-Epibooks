import { useContext } from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { ThemeContext } from '../ThemeContext'; 

const SingleComment = ({ review, onDelete, onEdit }) => {
  const { theme } = useContext(ThemeContext);

  
  const themeStyles = {
    light: {
      listGroupItemBg: '#ffffff',
      listGroupItemColor: '#000000',
      buttonDanger: '#dc3545',
      buttonWarning: '#ffc107',
    },
    dark: {
      listGroupItemBg: '#121212',
      listGroupItemColor: '#ffffff',
      buttonDanger: '#b52a25',
      buttonWarning: '#e0a800',
    },
  };

  
  const currentStyles = themeStyles[theme] || themeStyles.light;

  return (
    <ListGroup.Item
      data-testid="single-comment"
      style={{
        backgroundColor: currentStyles.listGroupItemBg,
        color: currentStyles.listGroupItemColor,
      }}
    >
      <div>
        <strong>User:</strong> {review.author}
      </div>
      <div>
        <strong>Rating:</strong> {review.rate}/5
      </div>
      <div>
        <strong>Comment:</strong> {review.comment}
      </div>
      <div className="mt-2">
        <Button
          variant="danger"
          onClick={() => onDelete(review._id)}
          style={{ backgroundColor: currentStyles.buttonDanger }}
        >
          Delete
        </Button>
        <Button
          variant="warning"
          onClick={() => onEdit(review)}
          className="ms-2"
          style={{ backgroundColor: currentStyles.buttonWarning }}
        >
          Edit
        </Button>
      </div>
    </ListGroup.Item>
  );
};

export default SingleComment;
