import { useEffect, useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './SingleBook.css';
import { ThemeContext } from '../ThemeContext';

const SingleBook = ({ book, onSelect, isSelected }) => {
  const { theme } = useContext(ThemeContext);

  const handleCardClick = () => {
    onSelect(isSelected ? null : book);
  };

  useEffect(() => {
    if (isSelected) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isSelected]);

  return (
    <div className={`book-card ${isSelected ? 'selected' : ''}`}>
      <Card
        onClick={handleCardClick}
        data-testid="book-card"
        className={`bookCard cardMargin ${isSelected ? 'border-danger' : ''} ${theme === 'light' ? 'bookCardLight' : 'bookCardDark'}`}
        data-bs-theme={theme}
        tabIndex="0"
        aria-selected={isSelected}
      >
        <Card.Img variant="top" src={book.img} alt={`Cover of ${book.title}`} />
        <Card.Body>
          <Card.Title className="book-title" title={book.title}>{book.title}</Card.Title>
          <Card.Text>{book.category}</Card.Text>
          <Link to={`/book/${book.asin}`}>
            <Button variant="primary" aria-label={`View details of ${book.title}`}>
              View Details
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SingleBook;
