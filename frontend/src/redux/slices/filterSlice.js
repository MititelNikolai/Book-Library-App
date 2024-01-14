import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
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
export const { setTitleFilter, resetFilters } = filterSlice.actions;
//Часть состояния - title
export const selectTitleFilter = (state) => state.filter.title;
//Reducer
export default filterSlice.reducer;
