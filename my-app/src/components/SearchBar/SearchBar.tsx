import React, { useState, useRef } from "react";
import styles from "./SearchBar.module.css";

const debounce = (func: Function, delay: number) => {
  let timeoutId: any;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");

  const searchTerm = (term: string) => {
    console.log("Fetching from API:", term);
  };

  
  const debouncedSearch = useRef(debounce(searchTerm, 2000)).current;

  const handleSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    debouncedSearch(value);
  };

  return (
    <div>
      <label>Search: </label>
      <input
        placeholder="search"
        className={styles["search-bar"]}
        value={searchValue}
        onChange={handleSearchValue}
      />
    </div>
  );
};

export default SearchBar;
