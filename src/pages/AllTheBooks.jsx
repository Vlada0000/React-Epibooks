import { useContext, useState, useMemo } from 'react';
import { Row, Col, Pagination } from 'react-bootstrap';
import SingleBook from '../components/SingleBook';
import CommentArea from '../components/CommentArea';
import { ThemeContext } from '../ThemeContext';

const ITEMS_PER_PAGE = 12; // Number of books per page
const MAX_PAGES_VISIBLE = 3; // Max number of pages visible

const AllTheBooks = ({ books }) => {
  const { theme } = useContext(ThemeContext);
  const [selectedBook, setSelectedBook] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the total number of pages
  const totalPages = useMemo(() => Math.ceil(books.length / ITEMS_PER_PAGE), [books]);

  // Determine which books to display on the current page
  const paginatedBooks = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return books.slice(startIndex, endIndex);
  }, [books, currentPage]);


  const handleBookSelect = (book) => {
    setSelectedBook(book);
  };

  // Handle changing the page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate pagination items
  const getPageItems = () => {
    let pageItems = [];
    const maxVisiblePages = Math.min(MAX_PAGES_VISIBLE, totalPages);

    // Add page numbers
    for (let i = 1; i <= maxVisiblePages; i++) {
      pageItems.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    // Add ellipsis if there are more pages
    if (totalPages > maxVisiblePages) {
      pageItems.push(
        <Pagination.Ellipsis
          key="ellipsis"
          onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
        />
      );
    }

    return (
      <>
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {pageItems}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </>
    );
  };

  
  const containerStyle = {
    backgroundColor: theme === 'dark' ? '#121212' : '#ffffff',
    color: theme === 'dark' ? '#ffffff' : '#000000',
  };

  return (
    <div style={containerStyle} className="p-3">
      <Row>
        <Col md={8}>
          <Row>
            {paginatedBooks.map((book, index) => (
              <Col key={`${book.asin}-${index}`} sm={6} md={4} lg={3} className="mb-4">
                <SingleBook
                  book={book}
                  onSelect={handleBookSelect}
                  isSelected={selectedBook && selectedBook.asin === book.asin}
                  data-testid={`book-card-${book.asin}`}
                />
              </Col>
            ))}
          </Row>
          {/* Pagination controls */}
          <div className="d-flex justify-content-center mt-4">
            <Pagination>
              {getPageItems()}
            </Pagination>
          </div>
        </Col>
        <Col md={4}>
          <CommentArea book={selectedBook || { asin: '', title: '', img: '', category: '' }} />
        </Col>
      </Row>
    </div>
  );
};

export default AllTheBooks;
