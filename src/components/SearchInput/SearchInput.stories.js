import React, { useState } from "react";

import SearchInput from "./index";

export default {
  title: "components/SearchInput",
  component: SearchInput,
  argTypes: {
    handleChange: {
      type: { name: "function", required: true },
      description: "(Inherited) onChange handler - passes original event",
    },
    onSearch: {
      type: { name: "function", required: true },
      description:
        'Pass a value on pressing "Enter" or clicking on search icon',
    },
    suggestions: {
      type: { name: "array", required: false },
      description: "an array of suggestions",
      control: {
        type: null,
      },
    },
    value: {
      type: { name: "string", required: true },
      description: "Input value",
      control: {
        type: null,
      },
    },
  },
};

const Search = ({ onSelect, suggestions }) => {
  const [value, setValue] = useState();

  const handleChange = (event) => {
    const value = event.target.value;
    setValue(value);
  };

  return (
    <SearchInput
      value={value}
      onChange={handleChange}
      onSelect={onSelect}
      suggestions={suggestions}
    />
  );
};
export const Basic = Search.bind({});
Basic.args = {
  suggestions: [
    {
      searchterm: "heren truien",
      nrResults: 1100,
      html: "heren truien",
    },
    {
      searchterm: "dames truien",
      nrResults: 1501,
      html: "dames truien",
    },
  ],
};
