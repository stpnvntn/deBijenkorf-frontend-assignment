import { getSuggestionsHighlights } from "./models";

describe("Search models", () => {
  describe("getSuggestionsHighlights", () => {
    it("returns suggestion with Highlights", () => {
      const query = "trui";
      const suggestions = [
        { searchterm: "heren truien", nrResults: 42 },
        { searchterm: "no match here", nrResults: 42 },
        { searchterm: "kenzo trui", nrResults: 42 },
      ];

      const actual = getSuggestionsHighlights(suggestions, query);

      expect(actual).toEqual([
        {
          searchterm: "heren truien",
          html: "heren <em>trui</em>en",
          nrResults: 42,
        },
        { searchterm: "no match here", html: "no match here", nrResults: 42 },
        {
          searchterm: "kenzo trui",
          html: "kenzo <em>trui</em>",
          nrResults: 42,
        },
      ]);
    });
  });
});
