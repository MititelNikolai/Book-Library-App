import { useDispatch, useSelector } from "react-redux";
import { BsBookmarkStarFill, BsBookmarkStar } from "react-icons/bs";
import "./BookList.css";
import { deleteBook, toggleFavorite } from "../../redux/books/actionCreators";
import { selectTitleFilter } from "../../redux/slices/filterSlice";

const BookList = () => {
  const books = useSelector((state) => state.books); // useSelector - subscribe - stat.books reducer
  const titleFilter = useSelector(selectTitleFilter);
  const dispatch = useDispatch();
  const handleDeleteBook = (e, bookId) => {
    e.preventDefault();
    dispatch(deleteBook(bookId));
  };
  const handleToggleFavorite = (bookId) => {
    dispatch(toggleFavorite(bookId));
  };

  const filteredBooks = books.filter((book) => {
    const matchesTitle = book.title
      .toLowerCase()
      .includes(titleFilter.toLowerCase());
    return matchesTitle;
  });
  return (
    <div className='app-block book-list'>
      <h2>Book List</h2>
      {books.length === 0 ? (
        <p>No books available</p>
      ) : (
        <ul>
          {filteredBooks.map((book, index) => (
            <li key={book.id}>
              <div className='book-info'>
                {++index}. {book.title} by <strong>{book.author}</strong>
              </div>
              <div className='book-actions'>
                <span onClick={() => handleToggleFavorite(book.id)}>
                  {book.isFavorite ? (
                    <BsBookmarkStarFill className='star-icon' />
                  ) : (
                    <BsBookmarkStar className='star-icon' />
                  )}
                </span>
                <button onClick={(e) => handleDeleteBook(e, book.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookList;
