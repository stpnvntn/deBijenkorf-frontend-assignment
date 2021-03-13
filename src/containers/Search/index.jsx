import React, { useEffect, useMemo, useState } from "react";

import SearchInput from "../../components/SearchInput";
import { RestApi } from "../../services/restApi";
import { getSuggestionsHighlights } from "./models";

const Search = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const restApi = useMemo(() => new RestApi("base_url"), []);
  useEffect(() => {
    async function fetchSuggestions() {
      try {
        const suggestions = await restApi.search(query);
        const suggestionsHighlights = getSuggestionsHighlights(
          suggestions,
          query
        );
        setSuggestions(suggestionsHighlights);
      } catch (error) {
        console.error(error);
      }
    }
    if (restApi && query && query.length > 2) {
      fetchSuggestions();
    }
    if (!query) {
      setSuggestions([]);
    }
  }, [query, restApi]);

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
      suggestions={suggestions}
    />
  );
};

export default Search;
