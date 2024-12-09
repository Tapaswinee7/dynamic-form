import React from "react";
import DynamicForm from "./DynamicForm";
import "./App.css";

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
  // You can add more fields as needed
];

const App = () => {
  return (
    <div className="App">
      <DynamicForm config={formConfig} />
    </div>
  );
};

export default App;
