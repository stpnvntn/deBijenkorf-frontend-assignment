import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TestRenderer from "react-test-renderer";

import SearchInput from "./index";

describe("SearchInput", () => {
  it("renders correctly", () => {
    const tree = TestRenderer.create(
      <SearchInput
        value="any"
        onChange={() => {}}
        onSearch={() => {}}
        onClear={() => {}}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("handles on change properly", () => {
    const handleChange = jest.fn();

    const { getByTestId } = render(
      <SearchInput
        value="any"
        onChange={handleChange}
        onSearch={() => {}}
        onClear={() => {}}
      />
    );

    fireEvent.change(getByTestId("SearchInput-input"), {
      target: { value: "value" },
    });

    expect(handleChange).toHaveBeenCalled();
  });

  it("handles on search properly if press enter on focused input", () => {
    const handleSearch = jest.fn();

    const { getByTestId } = render(
      <SearchInput
        value="any"
        onChange={() => {}}
        onSearch={handleSearch}
        onClear={() => {}}
      />
    );

    getByTestId("SearchInput-input").focus();
    fireEvent.keyDown(document.activeElement, {
      key: "Enter",
      code: "Enter",
    });

    expect(handleSearch).toHaveBeenCalled();
  });

  it("handles on search properly if click on search icon input", () => {
    const handleSearch = jest.fn();

    const { getByTestId } = render(
      <SearchInput
        value="any"
        onChange={() => {}}
        onSearch={handleSearch}
        onClear={() => {}}
      />
    );

    fireEvent.click(getByTestId("SearchInput-search-icon"));

    expect(handleSearch).toHaveBeenCalled();
  });

  it("handles on clear properly if click on search icon input", () => {
    const handleClear = jest.fn();

    const { getByTestId } = render(
      <SearchInput
        value="any"
        onChange={() => {}}
        onSearch={() => {}}
        onClear={handleClear}
      />
    );

    fireEvent.click(getByTestId("SearchInput-clear-icon"));

    expect(handleClear).toHaveBeenCalled();
  });

  it("renders lookup with correct amount of items if there are suggestions", () => {
    const handleClear = jest.fn();

    const suggestions = [
      { searchterm: "heren truien", nrResults: 42 },
      { searchterm: "no match here", nrResults: 42 },
      { searchterm: "kenzo trui", nrResults: 42 },
    ];

    const { getByTestId } = render(
      <SearchInput
        value="any"
        onChange={() => {}}
        onSearch={() => {}}
        onClear={handleClear}
        suggestions={suggestions}
      />
    );
    expect(getByTestId("SearchInput-suggestions").children.length).toEqual(
      suggestions.length
    );
  });
});
