Installation
Follow these steps to set up the project on your local machine.

Prerequisites
You should have Node.js installed on your machine.

Clone the repository
git clone https://github.com/Tapaswinee7/dynamic-form.git

Navigate into the project directory
cd dynamic-form

Install dependencies
npm install

After installing the dependencies, you can run the app locally using:
npm start

This will start the development server and open the app in your browser. The app will usually be available at http://localhost:3000/.

Running Tests
The project comes with pre-configured tests using Jest and React Testing Library. To run the tests, use the following command:
npm test
This will run all the unit tests and show the results in the terminal.

DynamicForm React App:
This is a React-based dynamic form application that renders a form based on a dynamic configuration. The form includes fields like name, email, phone number, country, and state, with built-in validation rules (e.g., required fields, pattern matching) and conditional field rendering.

Features:
-Dynamic Field Rendering: Form fields are dynamically rendered based on a given configuration.
-Conditional Field Visibility: Some fields (like "State") are displayed or hidden based on the value of other fields (like "Country").
-Form Validation: Fields are validated based on the provided rules (e.g., required fields, regex patterns for email and phone numbers).
-Form Reset: A button to reset the form and clear all input values.
-Success Message: A success message is shown upon form submission if all fields are valid.

Technologies Used:
-React: JavaScript library for building user interfaces.
-React Testing Library: For testing the application.
-Jest: Testing framework to run tests.
-CSS: To style the app.

