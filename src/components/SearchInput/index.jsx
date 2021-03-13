import React, { useState } from "react";

import ButtonWithIcon from "../ButtonWithIcon";

import styles from "./SearchInput.module.css";
import { ReactComponent as SearchIcon } from "./search-24px.svg";
import { ReactComponent as CloseIcon } from "./close-24px.svg";

const SearchInput = ({ value, onChange, onSearch, onClear }) => {
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
      {value && value.length && (
        <ButtonWithIcon
          data-testid="SearchInput-clear-icon"
          onClick={onClear}
          aria-label="Clear"
        >
          <CloseIcon />
        </ButtonWithIcon>
      )}
      <ButtonWithIcon
        data-testid="SearchInput-search-icon"
        onClick={onSearch}
        aria-label="Submit search"
      >
        <SearchIcon />
      </ButtonWithIcon>
    </div>
  );
};

export default SearchInput;
