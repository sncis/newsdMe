/* eslint-disable no-undef */
import React from "react";
import Home from "../../components/Home";

import { Link } from "react-router-dom";

describe("Home", () => {
  it("should render childrens", () => {
    const wrapper = shallow(<Home />);
    console.log(wrapper)
    expect(wrapper.find("h1")).toHaveLength(1);
    expect(wrapper.find("Link")).toHaveLength(2);
  });
});
