export function getSuggestionsHighlights(suggestions, query) {
  const regexp = new RegExp(query, "gi");
  return suggestions.map((suggestion) => {
    return {
      ...suggestion,
      html: suggestion.searchterm.replace(
        regexp,
        (match) => `<em>${match}</em>`
      ),
    };
  });
}
