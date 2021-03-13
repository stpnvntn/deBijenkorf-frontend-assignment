import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TestRenderer from "react-test-renderer";

import SearchInput from "./index";

describe("SearchInput", () => {
  it("renders correctly", () => {
    const tree = TestRenderer.create(
      <SearchInput value="any" onChange={jest.fn()} onSearch={jest.fn()} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("handles on change properly", () => {
    const handleOnChange = jest.fn();

    const { getByTestId } = render(
      <SearchInput value="any" onChange={handleOnChange} onSearch={jest.fn()} />
    );

    fireEvent.change(getByTestId("SearchInput-input"), {
      target: { value: "value" },
    });

    expect(handleOnChange).toHaveBeenCalled();
  });

  it("handles on search properly if press enter on focused input", () => {
    const handleOnSearch = jest.fn();

    const { getByTestId } = render(
      <SearchInput value="any" onChange={jest.fn()} onSearch={handleOnSearch} />
    );

    getByTestId("SearchInput-input").focus();
    fireEvent.keyDown(document.activeElement, {
      key: "Enter",
      code: "Enter",
    });

    expect(handleOnSearch).toHaveBeenCalled();
  });

  it("handles on search properly if click on search icon input", () => {
    const handleOnSearch = jest.fn();

    const { getByTestId } = render(
      <SearchInput value="any" onChange={jest.fn()} onSearch={handleOnSearch} />
    );

    fireEvent.click(getByTestId("SearchInput-search-icon"));

    expect(handleOnSearch).toHaveBeenCalled();
  });
});
