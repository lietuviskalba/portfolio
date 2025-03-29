// client/src/App.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders under construction message", () => {
  render(<App />);
  const headingElement = screen.getByText(/Under Construction/i);
  expect(headingElement).toBeInTheDocument();
});
