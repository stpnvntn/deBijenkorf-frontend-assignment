import React, { useState } from "react";

import styles from "./SearchInput.module.css";
import { ReactComponent as SearchIcon } from "./search-24px.svg";

const SearchInput = ({ value, onChange, onSearch }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className={`${styles.SearchInput} ${isFocused ? styles.focused : ""}`}>
      <input
        data-testid="SearchInput-input"
        placeholder="Search"
        aria-label="Search"
        type="text"
        className={styles.input}
        value={value}
        onChange={onChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
      />
      <button
        data-testid="SearchInput-search-icon"
        className={styles.searchButton}
        onClick={onSearch}
      >
        <SearchIcon className={styles.SearchIcon} aria-label="Submit search" />
      </button>
    </div>
  );
};

export default SearchInput;
