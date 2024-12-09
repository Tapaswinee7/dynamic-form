import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DynamicForm from "./DynamicForm"; // Ensure the import path is correct

const formConfig = [
  {
    type: "text",
    label: "Full Name",
    name: "name",
    required: true,
    placeholder: "Enter your full name",
    validation: {
      required: true,
      pattern: /^[a-zA-Z\s]+$/,
    },
  },
  {
    type: "email",
    label: "Email",
    name: "email",
    required: true,
    placeholder: "Enter your email",
    validation: {
      required: true,
      pattern: /\S+@\S+\.\S+/,
    },
  },
  {
    type: "tel",
    label: "Phone Number",
    name: "phone",
    required: false,
    placeholder: "Enter your phone number",
    validation: {
      pattern: /^\d{10}$/, // Validates phone number with 10 digits
    },
  },
  {
    type: "text",
    label: "Country",
    name: "country",
    required: true,
    placeholder: "Enter your country",
  },
  {
    type: "text",
    label: "State",
    name: "state",
    required: false,
    placeholder: "Enter your state",
  },
];

describe("DynamicForm", () => {
  test("renders the form fields correctly", () => {
    render(<DynamicForm config={formConfig} />);

    formConfig.forEach((field) => {
      const input = screen.getByPlaceholderText(field.placeholder);
      expect(input).toBeInTheDocument();
    });
  });

  test("handles input change correctly", () => {
    render(<DynamicForm config={formConfig} />);

    // Test text field input change
    const nameInput = screen.getByPlaceholderText("Enter your full name");
    userEvent.type(nameInput, "John Doe");
    expect(nameInput).toHaveValue("John Doe");

    // Test email field input change
    const emailInput = screen.getByPlaceholderText("Enter your email");
    userEvent.type(emailInput, "john@example.com");
    expect(emailInput).toHaveValue("john@example.com");
  });

  test("validates required fields", async () => {
    render(<DynamicForm config={formConfig} />);

    // Submit the form without filling any fields
    const submitButton = screen.getByText("Submit");
    userEvent.click(submitButton);

    // Check for error messages for required fields
    const nameError = await screen.findByText("Full Name is required");
    const emailError = await screen.findByText("Email is required");

    expect(nameError).toBeInTheDocument();
    expect(emailError).toBeInTheDocument();
  });

  test("validates email pattern", async () => {
    render(<DynamicForm config={formConfig} />);

    // Input an invalid email address
    const emailInput = screen.getByPlaceholderText("Enter your email");
    userEvent.type(emailInput, "invalid-email");

    const submitButton = screen.getByText("Submit");
    userEvent.click(submitButton);

    const emailError = await screen.findByText("Email is invalid");

    expect(emailError).toBeInTheDocument();
  });

  test("shows/hides fields based on conditions", async () => {
    render(<DynamicForm config={formConfig} />);

    const countryInput = screen.getByPlaceholderText("Enter your country");
    userEvent.type(countryInput, "USA");

    // After typing a country, the state field should become visible
    const stateInput = screen.getByPlaceholderText("Enter your state");
    expect(stateInput).toBeVisible();

    // If no country is typed, the state field should be disabled (but still rendered)
    userEvent.clear(countryInput);
    expect(stateInput).toBeDisabled(); // Check if it's disabled rather than checking visibility
  });

  test("displays success message on successful form submission", async () => {
    render(<DynamicForm config={formConfig} />);

    // Fill out the form fields
    userEvent.type(
      screen.getByPlaceholderText("Enter your full name"),
      "John Doe"
    );
    userEvent.type(
      screen.getByPlaceholderText("Enter your email"),
      "john@example.com"
    );
    userEvent.type(screen.getByPlaceholderText("Enter your country"), "USA");

    const submitButton = screen.getByText("Submit");

    // Submit the form
    userEvent.click(submitButton);

    // Wait for the success message to appear
    const successMessage = await screen.findByText(
      "Form submitted successfully!"
    );
    expect(successMessage).toBeInTheDocument();
  });

  test("resets the form when the reset button is clicked", async () => {
    render(<DynamicForm config={formConfig} />);

    // Fill out the form
    userEvent.type(
      screen.getByPlaceholderText("Enter your full name"),
      "John Doe"
    );
    userEvent.type(
      screen.getByPlaceholderText("Enter your email"),
      "john@example.com"
    );

    // Check if values were entered correctly
    expect(screen.getByPlaceholderText("Enter your full name")).toHaveValue(
      "John Doe"
    );
    expect(screen.getByPlaceholderText("Enter your email")).toHaveValue(
      "john@example.com"
    );

    const resetButton = screen.getByText("Reset");

    // Click the reset button
    userEvent.click(resetButton);

    // Ensure the form is cleared after reset
    await waitFor(() => {
      expect(screen.getByPlaceholderText("Enter your full name")).toHaveValue(
        ""
      );
    });
  });
});
