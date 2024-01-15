import { createSlice } from "@reduxjs/toolkit";
import createBookWithId from "../../utils/createBookWithId";
import axios from "axios";
const initialState = [];

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBook: (state, action) => {
      return [...state, action.payload];
    },
    deleteBook: (state, action) => {
      return state.filter((book) => book.id !== action.payload);
    },
    toggleFavoriteBook: (state, action) => {
      return state.map((book) =>
        book.id === action.payload
          ? { ...book, isFavorite: !book.isFavorite }
          : book
      );
    },
  },
});

//Export actions

export const { addBook, deleteBook, toggleFavoriteBook } = bookSlice.actions;

export const thunkFunction = async (dispatch, getState) => {
  //async action
  try {
    const res = await axios.get("http://localhost:4000/random-book");
    if (res?.data.title && res?.data.author) {
      dispatch(addBook(createBookWithId(res.data, "API")));
    }
  } catch (error) {
    console.log(`Error fetching random book ${error}`);
  }
};

//Export States

export const selectBook = (state) => state.books;

//Export Reducer
export default bookSlice.reducer;
