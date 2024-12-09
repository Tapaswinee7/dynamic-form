import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders dynamic form fields", () => {
  render(<App />);
  expect(
    screen.getByPlaceholderText(/Enter your full name/i)
  ).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Enter your email/i)).toBeInTheDocument();
  expect(
    screen.getByPlaceholderText(/Enter your phone number/i)
  ).toBeInTheDocument();
  expect(
    screen.getByPlaceholderText(/Enter your country/i)
  ).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Enter your state/i)).toBeInTheDocument();
});
