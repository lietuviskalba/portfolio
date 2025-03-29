// client/src/components/NavBar.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import NavBar from "./NavBar";

test("renders the Media Ranker link", () => {
  render(<NavBar />);
  const linkElement = screen.getByText(/Media Ranker/i);
  expect(linkElement).toBeInTheDocument();
  expect(linkElement).toHaveAttribute("href", "/media_ranker");
});
