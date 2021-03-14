import React from "react";

import ButtonWithIcon from "./index";

import { ReactComponent as CloseIcon } from "./close-24px.svg";

export default {
  title: "components/ButtonWithIcon",
  component: ButtonWithIcon,
  argTypes: {
    "aria-label": {
      type: { name: "string", required: false },
      description: "Aria label for a button",
    },
    "data-testid": {
      type: { name: "string", required: false },
      description: "Test ID",
    },
    onClick: {
      description: "on button click handler",
      type: { name: "function", required: true },
    },
  },
};

const CloseButton = (args) => (
  <ButtonWithIcon {...args}>
    <CloseIcon />
  </ButtonWithIcon>
);
export const Primary = CloseButton.bind({});
Primary.args = {
  "aria-label": "awesome label",
  "data-testid": "TestId",
  onClick: () => {
    alert("Clicked!");
  },
};
