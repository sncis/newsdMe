import React from "react";
import App from "./App";

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
describe("App", () => {
  it("should render", () => {
    // eslint-disable-next-line no-undef
    const wrapper = shallow(<App />);

    expect(wrapper).toHaveLength(1);
  });
});
