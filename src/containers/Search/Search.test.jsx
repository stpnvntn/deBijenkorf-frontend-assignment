import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";

import { getSuggestionsHighlights } from "./models";

import Search from "./index";

jest.mock("../../components/SearchInput", () => ({ suggestions, onChange }) => {
  return (
    <span
      data-testid="SearchInput-mock"
      onClick={() => onChange({ target: { value: "value" } })}
    >
      {`suggestions:${JSON.stringify(suggestions)}`}
    </span>
  );
});
jest.mock("./models");
describe("ButtonWithIcon", () => {
  afterEach(() => {
    fetch.mockClear();
  });

  it("fetch suggestion if query length > 2", async () => {
    const { getByTestId } = render(<Search />);
    getSuggestionsHighlights.mockImplementation((a) => a);
    const suggestions = [{ searchterm: "heren truien", nrResults: 42 }];
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            suggestions,
          }),
      })
    );

    fireEvent.click(getByTestId("SearchInput-mock"));

    await waitFor(() =>
      expect(getSuggestionsHighlights).toHaveBeenCalledWith(
        suggestions,
        "value"
      )
    );

    await waitFor(() => {
      expect(getByTestId("SearchInput-mock").textContent).toEqual(
        `suggestions:${JSON.stringify(suggestions)}`
      );
    });
  });
});
