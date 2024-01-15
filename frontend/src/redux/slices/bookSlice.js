import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import createBookWithId from "../../utils/createBookWithId";
import axios from "axios";
const initialState = [];

//Fetch Books from API with createAsyncThunk

export const fetchBook = createAsyncThunk("books/fetchBook", async () => {
  const res = await axios.get("http://localhost:4000/random-book");
  return res.data;
});
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
  //If fulfilled -> create new reducer and return new state
  extraReducers: (builder) => {
    builder.addCase(fetchBook.fulfilled, (state, action) => {
      if (action?.payload.title && action?.payload.author) {
        state.push(createBookWithId(action.payload, "API"));
      }
    });
  },
});

//Export actions

export const { addBook, deleteBook, toggleFavoriteBook } = bookSlice.actions;

//Export States

export const selectBook = (state) => state.books;

//Export Reducer
export default bookSlice.reducer;
