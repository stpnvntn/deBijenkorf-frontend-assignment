import React, { useState } from "react";

import SearchInput from "../../components/SearchInput";

const Search = () => {
  const [query, setQuery] = useState("");

  const handleOnSearch = () => {
    alert(`Handle Search: ${query}`);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);
  };

  const handleInputClear = () => {
    setQuery("");
  };

  return (
    <SearchInput
      value={query}
      onChange={handleInputChange}
      onSearch={handleOnSearch}
      onClear={handleInputClear}
    />
  );
};

export default Search;
