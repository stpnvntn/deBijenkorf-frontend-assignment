import React, { useCallback, useEffect, useMemo, useState } from "react";

import SearchInput from "../../components/SearchInput";
import { RestApi } from "../../services/restApi";
import { getSuggestionsHighlights } from "./models";

const Search = () => {
  const [query, setQuery] = useState("");
  const [isValueSelected, setValueSelected] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const restApi = useMemo(() => new RestApi("base_url"), []);
  useEffect(() => {
    let hasCanceled = false;
    let timeoutId;
    async function fetchSuggestions() {
      try {
        const suggestions = await restApi.search(query);
        if (!hasCanceled) {
          const suggestionsHighlights = getSuggestionsHighlights(
            suggestions,
            query
          );
          setSuggestions(suggestionsHighlights);
        }
      } catch (error) {
        if (!hasCanceled) {
          console.error(error);
        }
      }
    }
    if (!isValueSelected && restApi && query && query.length > 2) {
      timeoutId = setTimeout(() => {
        fetchSuggestions();
      }, 300);
    }
    if (!query) {
      setSuggestions([]);
    }

    return () => {
      hasCanceled = true;
      clearTimeout(timeoutId);
    };
  }, [query, restApi, isValueSelected]);

  const submit = (value) => {
    if (value) {
      alert(`Search: ${value}`);
    }
  };

  const handleOnSearch = useCallback(() => {
    submit(query);
  }, [query]);

  const handleInputChange = useCallback((event) => {
    const value = event.target.value;
    setValueSelected(false);
    setQuery(value);
  }, []);

  const handleInputClear = useCallback(() => {
    setValueSelected(false);
    setQuery("");
  }, []);

  const handleSelect = useCallback((value) => {
    submit(value);
  }, []);

  return (
    <SearchInput
      value={query}
      onChange={handleInputChange}
      onSearch={handleOnSearch}
      onClear={handleInputClear}
      onSelect={handleSelect}
      suggestions={suggestions}
    />
  );
};

export default Search;
