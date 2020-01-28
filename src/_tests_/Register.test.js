/* eslint-disable no-undef */
import React from "react";
import Register from "../components/Register";

describe("Register", () => {
  it("should render", () => {
    // eslint-disable-next-line no-undef
    const wrapper = shallow(<Register />);

    expect(wrapper).toHaveLength(1);
  });

  it("should set the right state when values are entered in input fields", () => {
    const wrapper = shallow(<Register />);
    const emailInput = wrapper.find("input").at(0);
    const usernameInput = wrapper.find("input").at(1);
    const passwordInput = wrapper.find("input").at(2);

    emailInput.simulate("change", { target: { value: "test@email" } });
    usernameInput.simulate("change", { target: { value: "testUser" } });
    passwordInput.simulate("change", { target: { value: "pass" } });

    expect(wrapper.state("email")).toBe("test@email");
    expect(wrapper.state("userName")).toBe("testUser");
    expect(wrapper.state("password")).toBe("pass");
  });

  it("should submit formDetails when submitButton is clicked", () => {
    const wrapper = shallow(<Register />);
    const event = { preventDefault: () => {} };

    //first argument is the name of the object and second parameter is the method we wantt to
    //spy on. Replace the method with a stub and dont ecevute the real one
    jest.spyOn(event, "preventDefault");

    // wrapper.instance().submitDetails = jest.fn();
    wrapper.update();
    wrapper.find("#registerSubmitBtn").simulate("click", event);
    expect(event.preventDefault).toBeCalled();

    // expect(wrapper.instance().submitDetails).toHaveBeenCalled();
  });
});
