import { useState, useEffect, useContext } from 'react';
import { Card, Spinner, Alert, Modal, Button } from 'react-bootstrap';
import CommentList from './CommentList';
import AddComment from './AddComment';
import { ThemeContext } from '../ThemeContext';
import './CommentArea.css';

const CommentArea = ({ book }) => {
  const [reviews, setReviews] = useState([]);
  const [editReview, setEditReview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const { theme } = useContext(ThemeContext);


  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${book.asin}`, {
        headers: {
          'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjhlNjg3MzU0YWUyNDAwMTU1NmEwNTQiLCJpYXQiOjE3MjA2MDg4ODMsImV4cCI6MTcyMTgxODQ4M30.6B4eH0s6oah8ZQmLNGveRLJJB-LTAl3sugaCKrTe-rg",
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }

      const data = await response.json();
      setReviews(data);
      setError('');
    } catch (error) {
      setError('Error fetching reviews');
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

 
  const deleteReview = async (reviewId) => {
    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${reviewId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjhlNjg3MzU0YWUyNDAwMTU1NmEwNTQiLCJpYXQiOjE3MjA2MDg4ODMsImV4cCI6MTcyMTgxODQ4M30.6B4eH0s6oah8ZQmLNGveRLJJB-LTAl3sugaCKrTe-rg",
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete review');
      }

      fetchReviews();
    } catch (error) {
      setError('Error deleting review');
      setShowModal(true);
      console.error('Error deleting review:', error);
    }
  };

 
  const editReviewHandler = (review) => {
    setEditReview(review);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setError('');
  };

  
  useEffect(() => {
    if (book && book.asin) {
      fetchReviews();
    } else {
      setReviews([]);
      setEditReview(null);
    }
  }, [book]);

 
  const cardStyle = {
    backgroundColor: theme === 'dark' ? '#121212' : '#b3b3b3',
    color: theme === 'dark' ? '#fff' : '#000',
    borderColor: theme === 'dark' ? '#444' : '#ddd',
    borderWidth: '1px',
    borderStyle: 'solid',
    marginBottom: '1rem',
  };

  return (
    <Card style={cardStyle}>
      <Card.Body>
        <Card.Title className='book-title'>
          Comments for {book ? book.title : '...'}
        </Card.Title>
        {loading && (
          <div className="d-flex justify-content-center my-3">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
        {error && (
          <>
            <Button variant="danger" onClick={() => { setShowModal(true); setModalMessage(error); }}>
              Show Error
            </Button>
            <Modal show={showModal} onHide={handleModalClose}>
              <Modal.Header closeButton>
                <Modal.Title>Error</Modal.Title>
              </Modal.Header>
              <Modal.Body>{modalMessage}</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleModalClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        )}
        {!loading && !error && (
          <>
            <CommentList reviews={reviews} onDelete={deleteReview} onEdit={editReviewHandler} />
            <AddComment 
              book={book} 
              data-testid="comment-area" 
              onCommentAdded={fetchReviews} 
              editReview={editReview} 
              setEditReview={setEditReview} 
            />
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default CommentArea;
