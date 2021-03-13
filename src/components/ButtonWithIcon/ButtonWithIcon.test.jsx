import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TestRenderer from "react-test-renderer";

import ButtonWithIcon from "./index";

describe("ButtonWithIcon", () => {
  it("renders correctly", () => {
    const tree = TestRenderer.create(
      <ButtonWithIcon onClick={() => {}} data-testid="id" aria-label="label" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("handles on click properly", () => {
    const handleClick = jest.fn();
    const testId = "test-id";

    const { getByTestId } = render(
      <ButtonWithIcon
        onClick={handleClick}
        data-testid={testId}
        aria-label="label"
      />
    );

    fireEvent.click(getByTestId(testId));

    expect(handleClick).toHaveBeenCalled();
  });
});
