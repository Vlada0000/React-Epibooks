import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import books from './data/books';
import { ThemeProvider } from './ThemeContext';
import App from './App';

// PRIMO TEST
test('renders the Welcome component and allows it to be dismissed', () => {
  render(<App />);

  // Check if the welcome message is displayed
  const welcomeMessage = screen.getByText('Welcome to EPI-BOOKS!');
  expect(welcomeMessage).toBeInTheDocument();

  // Check if the close button is present
  const closeButton = screen.getByRole('button', { name: /close/i });
  expect(closeButton).toBeInTheDocument();

  // Click the close button
  fireEvent.click(closeButton);

  // Check if the welcome message has been removed
  expect(welcomeMessage).not.toBeInTheDocument();
});

// SECONDO TEST
test('renders the correct number of books', async () => {
  render(<App />);

  // Wait for the books to be rendered
  const bookCards = await screen.findAllByTestId('book-card');
  
  // Assume the number of books to be displayed is 12
  const expectedNumberOfBooks = 12;
  expect(bookCards).toHaveLength(expectedNumberOfBooks);
});

// TERZO TEST
test('checks that SingleComment is not visible when no book is selected', () => {
  render(<App />);

  // Check if SingleComment is not in the document
  const singleComment = screen.queryByTestId('single-comment');
  expect(singleComment).not.toBeInTheDocument();
});

// QUARTO TEST
test('clicks on the first book card and verifies the selection behavior', async () => {
  render(<App />);

  // Find all book cards
  const bookCards = await screen.findAllByTestId('book-card');

  // Click the first book card
  const firstCard = bookCards[0];
  fireEvent.click(firstCard);

  // Verify the first card has the 'border-danger' class
  expect(firstCard).toHaveClass('border-danger');

  // Click the second book card
  const secondCard = bookCards[1];
  fireEvent.click(secondCard);

  // Verify the first card no longer has the 'border-danger' class
  expect(firstCard).not.toHaveClass('border-danger');
  expect(secondCard).toHaveClass('border-danger');
});

// QUINTO TEST
test('ensures SingleComment is not present in the DOM when no book is selected', () => {
  render(<App />);

  // Verify no SingleComment instances in the DOM
  const singleComments = screen.queryAllByTestId('single-comment');
  expect(singleComments).toHaveLength(0);
});

// SESTO TEST
test('displays book details and reviews when a book card is clicked', async () => {
  render(<App />);

  // Find book cards and click the first one
  const bookCards = await screen.findAllByTestId('book-card');
  if (bookCards.length === 0) {
    throw new Error('No book cards found.');
  }

  fireEvent.click(bookCards[0]);

  // Get the title of the selected book
  const selectedBookTitle = books[0].title;
  await waitFor(() => {
    expect(screen.getByText(selectedBookTitle)).toBeInTheDocument();
  });

  // Check if reviews for the selected book are visible
  const reviews = books[0].reviews || [];
  await waitFor(() => {
    reviews.forEach(review => {
      expect(screen.getByText(review)).toBeInTheDocument();
    });
  });
});

// SETTIMO TEST
test('checks that the CommentArea component is rendered', async () => {
  render(
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );

  const commentArea = await screen.findByTestId('comment-area');
  expect(commentArea).toBeInTheDocument();
});

// OTTAVO TEST
test('filters books based on search term and verifies card presence', async () => {
  render(
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );

  // Type 'Sword' into the search bar
  const searchBar = screen.getByPlaceholderText('Search by title...');
  fireEvent.change(searchBar, { target: { value: 'Sword' } });

  // Verify that cards with 'Sword' in the title are visible
  const filteredCards = await screen.findAllByText(/Sword/i);
  expect(filteredCards.length).toBe(10);
});
