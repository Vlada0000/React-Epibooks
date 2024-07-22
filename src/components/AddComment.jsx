import { useState, useEffect, useContext } from 'react';
import { Spinner, Alert } from 'react-bootstrap';
import { ThemeContext } from '../ThemeContext';

const AddComment = ({ book, onCommentAdded, editReview, setEditReview }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (editReview) {
      setComment(editReview.comment);
      setRating(editReview.rate);
    }
  }, [editReview]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!book || !book.asin) {
      setError('Book information is incomplete.');
      return;
    }

    const newReview = {
      comment,
      rate: rating,
      elementId: book.asin,
    };

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments${editReview ? '/' + editReview._id : ''}`,
        {
          method: editReview ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjhlNjg3MzU0YWUyNDAwMTU1NmEwNTQiLCJpYXQiOjE3MjA2MDg4ODMsImV4cCI6MTcyMTgxODQ4M30.6B4eH0s6oah8ZQmLNGveRLJJB-LTAl3sugaCKrTe-rg",
          },
          body: JSON.stringify(newReview),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to add or update review');
      }

      setSuccess(true);
      setComment('');
      setRating(1);
      setEditReview(null);
      onCommentAdded();
    } catch (error) {
      setError('Failed to add or update review');
    } finally {
      setLoading(false);
    }
  };

  const handleRatingChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setRating(Number.isInteger(value) && value >= 1 && value <= 5 ? value : 1);
  };

  const handleCancel = () => {
    setComment('');
    setRating(1);
    setEditReview(null);
  };


  const themeStyles = {
    light: {
      backgroundColor: '#fff',
      color: '#000',
      inputBackground: '#f0f0f0',
      inputColor: '#000',
      buttonPrimaryBg: '#007bff',
      buttonPrimaryColor: '#fff',
      buttonSecondaryBg: '#6c757d',
      buttonSecondaryColor: '#fff',
      alertSuccessBg: '#d4edda',
      alertSuccessColor: '#155724',
      alertDangerBg: '#f8d7da',
      alertDangerColor: '#721c24',
    },
    dark: {
      backgroundColor: '#121212',
      color: '#fff',
      inputBackground: '#121212',
      inputColor: '#fff',
      buttonPrimaryBg: '#1a73e8',
      buttonPrimaryColor: '#fff',
      buttonSecondaryBg: '#505050',
      buttonSecondaryColor: '#fff',
      alertSuccessBg: '#1e7e34',
      alertSuccessColor: '#fff',
      alertDangerBg: '#721c24',
      alertDangerColor: '#fff',
    },
  };

  const currentStyles = themeStyles[theme] || themeStyles.light;

  return (
    <div
      style={{
        backgroundColor: currentStyles.backgroundColor,
        color: currentStyles.color,
        padding: '1rem',
        borderRadius: '0.5rem',
      }}
      data-testid="comment-area"
      aria-live="polite"
    >
      <h5>{editReview ? 'Edit' : 'Add'} a Comment:</h5>
      {error && (
        <Alert
          variant="danger"
          style={{ backgroundColor: currentStyles.alertDangerBg, color: currentStyles.alertDangerColor }}
        >
          {error}
        </Alert>
      )}
      {success && (
        <Alert
          variant="success"
          style={{ backgroundColor: currentStyles.alertSuccessBg, color: currentStyles.alertSuccessColor }}
        >
          Review {editReview ? 'updated' : 'added'} successfully!
        </Alert>
      )}
      <form onSubmit={handleSubmit} aria-label="Add or Edit Comment Form">
        <div className="mb-3">
          <label htmlFor="comment" className="form-label">Comment:</label>
          <textarea
            id="comment"
            className="form-control"
            rows="3"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            style={{
              backgroundColor: currentStyles.inputBackground,
              color: currentStyles.inputColor,
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="rating" className="form-label">Rating (1-5):</label>
          <input
            type="number"
            id="rating"
            className="form-control"
            value={rating}
            onChange={handleRatingChange}
            min="1"
            max="5"
            required
            style={{
              backgroundColor: currentStyles.inputBackground,
              color: currentStyles.inputColor,
            }}
          />
        </div>
        <div className="d-flex">
          <button
            type="submit"
            className="btn btn-primary me-2"
            disabled={loading}
            style={{
              backgroundColor: currentStyles.buttonPrimaryBg,
              color: currentStyles.buttonPrimaryColor,
            }}
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" />
                <span className="visually-hidden">Loading...</span>
              </>
            ) : (
              'Submit'
            )}
          </button>
          {editReview && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
              style={{
                backgroundColor: currentStyles.buttonSecondaryBg,
                color: currentStyles.buttonSecondaryColor,
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddComment;
