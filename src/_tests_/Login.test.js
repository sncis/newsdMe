/* eslint-disable no-undef */
import React from "react";
import Login from "../components/Login";

describe("Login", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Login />);
  });

  it("should render childrens", () => {
    expect(wrapper.find("input")).toHaveLength(2);
    expect(wrapper.find("button")).toHaveLength(1);
  });

  it("should set the right state on input change", () => {
    const username = wrapper.find("input").at(0);
    const password = wrapper.find("input").at(1);

    username.simulate("change", { target: { value: "testUser" } });
    password.simulate("change", { target: { value: "pass" } });

    expect(wrapper.state("userName")).toBe("testUser");
    expect(wrapper.state("password")).toBe("pass");
  });

  it("should call submit details when button is clicked", () => {
    const button = wrapper.find("button");
    const event = { preventDefault: () => {} };

    jest.spyOn(event, "preventDefault");
    expect(button).toHaveLength(1);

    button.simulate("click", event);

    expect(event.preventDefault).toHaveBeenCalled();
  });
});
