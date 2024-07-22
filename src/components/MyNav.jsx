import { useContext } from 'react';
import { Container, Nav, Navbar, Form, Dropdown } from 'react-bootstrap';
import { ThemeContext } from '../ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './MyNav.css';

const MyNav = ({ searchTerm, handleSearchChange, selectedGenre, handleGenreChange }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const genres = ['All', 'fantasy', 'history', 'horror', 'romance', 'scifi'];


  const navbarStyles = {
    light: {
      backgroundColor: '#b3b3b3',
      color: '#000',
      searchBar: {
        color: '#000',
        backgroundColor: '#f8f9fa',
        borderColor: '#f8f9fa',
      },
      dropdown: {
        backgroundColor: '#f8f9fa',
        color: '#000',
        item: {
          color: '#000',
          backgroundColor: '#f8f9fa',
        },
      },
    },
    dark: {
      backgroundColor: '#121212',
      color: '#fff',
      searchBar: {
        color: '#fff',
        backgroundColor: '#333',
        borderColor: '#333',
      },
      dropdown: {
        backgroundColor: '#333',
        color: '#fff',
        item: {
          color: '#fff',
          backgroundColor: '#333',
        },
      },
    },
  };

  const currentStyles = navbarStyles[theme] || navbarStyles.light;

  return (
    <Navbar expand="lg" style={{ backgroundColor: currentStyles.backgroundColor, color: currentStyles.color }}>
      <Container>
        <Navbar.Brand as={Link} to="/" style={{ color: currentStyles.color }}>
          EPI-BOOKS
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" style={{ color: currentStyles.color }}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about" style={{ color: currentStyles.color }}>
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/books" style={{ color: currentStyles.color }}>
              Browse
            </Nav.Link>
          </Nav>
          <Form.Control
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={handleSearchChange}
            className={`me-2 searchBar ${theme}`}
            aria-label="Search by title"
            style={{
              color: currentStyles.searchBar.color,
              backgroundColor: currentStyles.searchBar.backgroundColor,
              borderColor: currentStyles.searchBar.borderColor,
            }}
          />
          <Dropdown className="ml-2" data-testid="genre-dropdown">
            <Dropdown.Toggle
              variant="secondary"
              id="dropdown-basic"
              aria-label="Select genre"
              style={{
                backgroundColor: currentStyles.dropdown.backgroundColor,
                color: currentStyles.dropdown.color,
              }}
            >
              {selectedGenre}
            </Dropdown.Toggle>
            <Dropdown.Menu
              style={{ backgroundColor: currentStyles.dropdown.backgroundColor }}
            >
              {genres.map((genre) => (
                <Dropdown.Item
                  key={genre}
                  data-testid={`genre-filter-${genre}`}
                  onClick={() => handleGenreChange(genre)}
                  aria-label={`Filter by ${genre}`}
                  style={{
                    color: currentStyles.dropdown.item.color,
                    backgroundColor: currentStyles.dropdown.item.backgroundColor,
                  }}
                >
                  {genre}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Nav>
            <Nav.Link
              onClick={toggleTheme}
              aria-label={`Toggle ${theme === 'light' ? 'dark' : 'light'} mode`}
              style={{ color: currentStyles.color }}
            >
              <FontAwesomeIcon icon={theme === 'light' ? faSun : faMoon} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNav;
