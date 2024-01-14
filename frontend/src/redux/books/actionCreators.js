import * as a from "./actionTypes";

const addBook = (newBook) => {
  return {
    type: a.ADD_BOOK,
    payload: newBook,
  };
};

export { addBook };
