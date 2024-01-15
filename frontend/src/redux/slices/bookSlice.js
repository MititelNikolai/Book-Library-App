import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import createBookWithId from "../../utils/createBookWithId";
import axios from "axios";
import { setError } from "./errorSlice";
const initialState = {
  books: [],
  isLoadingViaAPI: false,
};

//Fetch Books from API with createAsyncThunk

export const fetchBook = createAsyncThunk(
  "books/fetchBook",
  async (url, thunkAPI) => {
    //thunkAPI can dispatch new actions
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      thunkAPI.dispatch(setError(error.message));
      //Option 1
      return thunkAPI.rejectWithValue(error); //Generate new error for  action.payload.title !== undefined
      //Option 2
      /* throw error;  */
      //Rejected */
    }
  }
);
const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.books.push(action.payload);
    },
    deleteBook: (state, action) => {
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
      };
    },
    toggleFavoriteBook: (state, action) => {
      state.books.forEach((book) =>
        book.id === action.payload ? (book.isFavorite = !book.isFavorite) : book
      );
    },
  },
  //OPTION 1
  /*   extraReducers: {
    [fetchBook.pending]: (state) => {
      state.isLoadingViaAPI = true;
    },

    [fetchBook.fulfilled]: (state, action) => {
      state.isLoadingViaAPI = false;
      if (action?.payload.title && action?.payload.author) {
        state.books.push(createBookWithId(action.payload, "API"));
      }
      //no call setError because reducer must be a pure function
    }, //computed property name
    [fetchBook.rejected]: (state) => {
      state.isLoadingViaAPI = false;
    },
  }, */
  //OPTION 2
  //If fulfilled -> create new reducer and return new state
  extraReducers: (builder) => {
    builder.addCase(fetchBook.pending, (state) => {
      state.isLoadingViaAPI = true;
    });

    builder.addCase(fetchBook.fulfilled, (state, action) => {
      state.isLoadingViaAPI = false;
      if (action?.payload?.title && action?.payload?.author) {
        state.books.push(createBookWithId(action.payload, "API"));
      }
      //no call setError because reducer must be a pure function
    });
    builder.addCase(fetchBook.rejected, (state) => {
      state.isLoadingViaAPI = false;
    });
  },
});

//Export actions

export const { addBook, deleteBook, toggleFavoriteBook } = bookSlice.actions;

//Export States

export const selectBook = (state) => state.books.books;
export const selectIsLoadingViaAPI = (state) => state.books.isLoadingViaAPI;

//Export Reducer
export default bookSlice.reducer;
