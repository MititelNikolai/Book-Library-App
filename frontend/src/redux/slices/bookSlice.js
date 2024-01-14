import { createSlice } from "@reduxjs/toolkit";
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

//Export States

export const selectBook = (state) => state.books;

//Export Reducer
export default bookSlice.reducer;
