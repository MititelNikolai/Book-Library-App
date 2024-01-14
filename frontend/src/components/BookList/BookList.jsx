import { useDispatch, useSelector } from "react-redux";
import "./BookList.css";
import { deleteBook } from "../../redux/books/actionCreators";
const BookList = () => {
  const books = useSelector((state) => state.books); // useSelector - subscribe - stat.books reducer
  const dispatch = useDispatch();
  const handleDeleteBook = (e, bookId) => {
    e.preventDefault();
    dispatch(deleteBook(bookId));
  };
  return (
    <div className='app-block book-list'>
      <h2>Book List</h2>
      {books.length === 0 ? (
        <p>No books available</p>
      ) : (
        <ul>
          {books.map((book, index) => (
            <li key={book.id}>
              <div className='book-info'>
                {++index}. {book.title} by <strong>{book.author}</strong>
              </div>
              <div className='book-actions'>
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
