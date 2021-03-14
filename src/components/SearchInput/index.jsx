import React, { useState, memo } from "react";

import ButtonWithIcon from "../ButtonWithIcon";

import styles from "./SearchInput.module.css";
import { ReactComponent as SearchIcon } from "./search-24px.svg";
import { ReactComponent as CloseIcon } from "./close-24px.svg";

const SearchInput = ({
  value,
  onChange,
  onSearch,
  onClear,
  suggestions,
  onSelect,
}) => {
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

  const handleSelect = (value) => () => {
    setIsFocused(false);
    onSelect(value);
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
      {isFocused && suggestions && suggestions.length > 0 && (
        // TODO leverage any Select lib here e.g. React Select
        <div
          data-testid={"SearchInput-suggestions"}
          className={styles.lookupList}
        >
          {suggestions.map((suggestion) => (
            <span
              key={suggestion.searchterm}
              className={styles.lookupListItem}
              aria-label="suggestion.searchterm"
              onMouseDown={handleSelect(suggestion.searchterm)}
            >
              <span
                className={styles.lookupListItemTitle}
                // TODO use a XSS sanitizer if needed e.g. DOMPurify
                dangerouslySetInnerHTML={{ __html: suggestion.html }}
              />
              <span className={styles.lookupListItemNumber}>
                ({suggestion.nrResults})
              </span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(SearchInput);
