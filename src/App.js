import { useState, useEffect } from 'react';
import books from './data/books';
import AllTheBooks from './pages/AllTheBooks';
import MyNav from './components/MyNav';
import { ThemeProvider } from './ThemeContext';
import Welcome from './components/Welcome';
import MyFooter from './components/MyFooter';
import NotFound from './pages/NotFound';
import BookDetails from './pages/BookDetails';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Container fluid className="p-0">
          <MainApp />
        </Container>
      </Router>
    </ThemeProvider>
  );
};

const MainApp = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [filteredBooks, setFilteredBooks] = useState(books);

  const location = useLocation();
  const navigate = useNavigate();

  
  useEffect(() => {
    applyFilters();
  }, [searchTerm, selectedGenre]);

  
  useEffect(() => {
    if (location.pathname === '/' || location.pathname.startsWith('/book/')) {
      setSearchTerm('');
    }
  }, [location]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
  };

  const applyFilters = () => {
    let filtered = books;

    if (selectedGenre !== 'All') {
      filtered = filtered.filter(book => book.category === selectedGenre);
    }

    if (searchTerm) {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredBooks(filtered);
  };

  return (
    <>
      <MyNav
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        selectedGenre={selectedGenre}
        handleGenreChange={handleGenreChange}
      />
      <main>
        <Welcome />
        <Routes>
          <Route path="/" element={<AllTheBooks books={filteredBooks} />} />
          <Route path="/book/:asin" element={<BookDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <MyFooter />
    </>
  );
};

export default App;
