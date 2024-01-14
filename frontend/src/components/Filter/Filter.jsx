import { useDispatch, useSelector } from "react-redux";
import {
  setTitleFilter,
  setAuthorFilter,
  setFavoriteFilter,
  selectTitleFilter,
  selectAuthorFilter,
  selectIsFavoriteFilter,
  resetFilters,
} from "../../redux/slices/filterSlice";

import "./Filter.css";
const Filter = () => {
  const dispatch = useDispatch();
  const titleFilter = useSelector(selectTitleFilter);
  const titleAuthor = useSelector(selectAuthorFilter);
  const isFavoriteFilter = useSelector(selectIsFavoriteFilter);
  const handleTitleFilterChange = (e) => {
    dispatch(setTitleFilter(e.target.value));
  };
  const handleAuthorFilterChange = (e) => {
    dispatch(setAuthorFilter(e.target.value));
  };
  const handleFavoriteFilterChange = () => {
    dispatch(setFavoriteFilter());
  };
  const handleResetFilters = () => {
    dispatch(resetFilters());
  };
  return (
    <div className='app-block filter'>
      <div className='filter-row'>
        <div className='filter-group'>
          <input
            type='text'
            placeholder='Filter by title...'
            value={titleFilter}
            onChange={(e) => {
              handleTitleFilterChange(e);
            }}
          />
        </div>
        <div className='filter-group'>
          <input
            type='text'
            placeholder='Filter by author...'
            value={titleAuthor}
            onChange={(e) => {
              handleAuthorFilterChange(e);
            }}
          />
        </div>
        <div className='filter-group'>
          <label htmlFor='favorite'>
            <input
              type='checkbox'
              id='favorite'
              checked={isFavoriteFilter}
              onChange={(e) => {
                handleFavoriteFilterChange(e);
              }}
            />
            Only Favorites
          </label>
        </div>
        <button type='button' onClick={handleResetFilters}>
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default Filter;
