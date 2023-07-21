import { useState, useEffect } from 'react';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import searchIcon from './search-icon.svg';
import { setSearch } from '../../redux/slices/posts';

const SearchComponent = () => {
  const dispatch: AppDispatch = useDispatch();

  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    if (inputValue.length) {
      dispatch(setSearch(inputValue));
    } else {
      dispatch(setSearch(null));
    }
  }, [inputValue]);

  const onSearchInput = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.target instanceof HTMLInputElement) {
      setInputValue(e.target.value);
    }
  };

  return (
    <label className="search">
      <input
        type="text"
        placeholder="Поиск"
        value={inputValue}
        onInput={(e) => onSearchInput(e)}
        className="text _light"
      />
      <img src={searchIcon} alt="search-icon" />
    </label>
  );
};

export default SearchComponent;
