import { useDispatch, useSelector } from "react-redux";
import { BsBookmarkStarFill, BsBookmarkStar } from "react-icons/bs";
import "./BookList.css";
import { deleteBook, toggleFavorite } from "../../redux/books/actionCreators";
import {
  selectAuthorFilter,
  selectIsFavoriteFilter,
  selectTitleFilter,
} from "../../redux/slices/filterSlice";

const BookList = () => {
  const books = useSelector((state) => state.books); // useSelector - subscribe - stat.books reducer
  const titleFilter = useSelector(selectTitleFilter);
  const authorFilter = useSelector(selectAuthorFilter);
  const isFavoriteFilter = useSelector(selectIsFavoriteFilter);
  const dispatch = useDispatch();
  const handleDeleteBook = (e, bookId) => {
    e.preventDefault();
    dispatch(deleteBook(bookId));
  };
  const handleToggleFavorite = (bookId) => {
    dispatch(toggleFavorite(bookId));
  };
  //Filter Title + Author
  const filteredBooks = books.filter((book) => {
    const matchesTitle = book.title
      .toLowerCase()
      .includes(titleFilter.toLowerCase());
    const matchesAuthor = book.author
      .toLowerCase()
      .includes(authorFilter.toLowerCase());
    const matchesFavorites = isFavoriteFilter ? book.isFavorite : true;
    return matchesTitle && matchesAuthor && matchesFavorites;
  });

  const highlightMatch = (text, filter) => {
    if (!filter) return text;

    const regex = new RegExp(`(${filter})`, "gi");
    return text.split(regex).map((substring, i) => {
      if (substring.toLowerCase() === filter.toLowerCase()) {
        return (
          <span key={i} className='highlight'>
            {substring}
          </span>
        );
      }
      return substring;
    });
  };

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
                {++index}. {highlightMatch(book.title, titleFilter)} by{" "}
                <strong>{highlightMatch(book.author, authorFilter)}</strong>
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
