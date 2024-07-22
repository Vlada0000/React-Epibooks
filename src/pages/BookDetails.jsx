import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import NotFound from './NotFound';
import CommentArea from '../components/CommentArea';
import { Card, Row, Col, Spinner } from 'react-bootstrap';
import books from '../data/books'; 
import { ThemeContext } from '../ThemeContext';

const BookDetails = () => {
  const { asin } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    
    const selectedBook = books.find((b) => b.asin === asin);
    if (selectedBook) {
      setBook(selectedBook);
    }
    setLoading(false);
  }, [asin]);

  
  if (!book && !loading) {
    return <NotFound />;
  }

 
  const containerStyle = {
    backgroundColor: theme === 'dark' ? '#121212' : '#ffffff',
    color: theme === 'dark' ? '#ffffff' : '#000000',
  };

  const cardStyle = {
    backgroundColor: theme === 'dark' ? '#1e1e1e' : '#ffffff',
    color: theme === 'dark' ? '#ffffff' : '#000000',
  };

  return (
    <div className="d-flex justify-content-center p-5" style={containerStyle}>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <Row className="w-75">
          <Col xs={12} md={6}>
            <Card style={cardStyle} className="mb-4">
              <Card.Img variant="top" src={book.img} alt={`Cover of ${book.title}`} />
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>
                  <strong>Category:</strong> {book.category}
                </Card.Text>
                <Card.Text>
                  <strong>Price:</strong> ${book.price}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <CommentArea book={book} />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default BookDetails;
