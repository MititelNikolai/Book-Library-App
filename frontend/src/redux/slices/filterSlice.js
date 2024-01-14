import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  author: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setTitleFilter: (state, action) => {
      //Reducer
      //При использовании SLICE можно менять объект state, а не возвращать новое(Emmer)
      state.title = action.payload;
      //return {...state, title: action.payload} - Можно и так, как в традиционном подходе
    },
    setAuthorFilter: (state, action) => {
      state.author = action.payload;
    },
    resetFilters: (state) => {
      return initialState;
    },
  },
});

/**
 * Action creators for the types of actions that are handled by the slice
 * reducer.
 * Создатели действий для типов действий, обрабатываемых редуктором срезов.
 * console.log(filterSlice.actions)
 */

/**
 * The slice's reducer.
 */
/**
 * Action Creator создается автоматически на основании  name: "filter", и имени reducer
 * {type: 'filter/setTitleFilter', payload: undefined}
 */

//Action (ReducerName = ActionName)
export const { setTitleFilter, resetFilters, setAuthorFilter } =
  filterSlice.actions;
//Часть состояния - title
export const selectTitleFilter = (state) => state.filter.title;
export const selectAuthorFilter = (state) => state.filter.author;
//Reducer
export default filterSlice.reducer;
