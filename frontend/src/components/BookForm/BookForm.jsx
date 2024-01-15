import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import {
  addBook,
  fetchBook,
  selectIsLoadingViaAPI,
} from "../../redux/slices/bookSlice";
import { setError } from "../../redux/slices/errorSlice";
import createBookWithId from "../../utils/createBookWithId";
import booksData from "../../data/books.json";
import "./BookForm.css";

const BookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const isLoadingViaAPI = useSelector(selectIsLoadingViaAPI);
  const dispatch = useDispatch();
  const handleRandomBook = () => {
    const randomIndex = Math.floor(Math.random() * booksData.length);
    const randomBook = booksData[randomIndex];
    dispatch(addBook(createBookWithId(randomBook, "random")));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && author) {
      dispatch(addBook(createBookWithId({ title, author }, "manual")));
      setTitle("");
      setAuthor("");
    } else {
      dispatch(setError("You must fill title and author!"));
    }
  };

  const handleRandomBookViaAPI = () => {
    dispatch(fetchBook("http://localhost:4000/random-book-delayed"));
  };
  return (
    <div className='app-block book-form'>
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='author'>Author</label>
          <input
            type='text'
            id='author'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <button type='submit'>Add Book</button>
        <button type='button' onClick={handleRandomBook}>
          Add Random
        </button>

        <button
          type='button'
          disabled={isLoadingViaAPI}
          onClick={handleRandomBookViaAPI}
        >
          {isLoadingViaAPI ? (
            <>
              <span>Loading Book...</span>
              <FaSpinner className='spinner' />
            </>
          ) : (
            "Add via API"
          )}
        </button>
      </form>
    </div>
  );
};

export default BookForm;
