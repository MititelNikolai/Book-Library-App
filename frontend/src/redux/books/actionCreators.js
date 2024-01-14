import * as a from "./actionTypes";

const addBook = (newBook) => {
  return {
    type: a.ADD_BOOK,
    payload: newBook,
  };
};
const deleteBook = (bookId) => {
  return {
    type: a.DELETE_BOOK,
    payload: bookId,
  };
};
const toggleFavorite = (bookId) => {
  return {
    type: a.TOGGLE_FAVORITE,
    payload: bookId,
  };
};

export { addBook, deleteBook, toggleFavorite };
