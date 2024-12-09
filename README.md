# DynamicForm React App

The **DynamicForm** React App is a flexible, dynamic form builder that renders form fields based on a configuration object. It includes field validation, conditional field visibility, and user-friendly interaction. This app is ideal for creating forms where the fields can change based on user input or dynamic configuration.

## Features

- **Dynamic Field Rendering**: Form fields are rendered dynamically based on a configuration.
- **Conditional Field Visibility**: Certain fields (like the "State" field) are displayed or hidden depending on the value of other fields (e.g., "Country").
- **Field Validation**: Supports required fields, pattern matching (e.g., for email, phone number), and minimum length validation.
- **Form Reset**: A reset button that clears all form input values.
- **Success Message**: A confirmation message is displayed upon successful form submission.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **React Testing Library**: For testing React components.
- **Jest**: JavaScript testing framework for running unit tests.
- **CSS**: For styling the application.

## Installation

Follow the steps below to set up and run the project locally.

### Prerequisites

Ensure that **Node.js** is installed on your machine. You can download it from [here](https://nodejs.org/).

### Steps to Install and Run

1. **Clone the repository**:

   Open a terminal and run the following command to clone the repository to your local machine.

   git clone https://github.com/Tapaswinee7/dynamic-form.git
2. **Navigate into the project directory**:

     Change to the directory where the project was cloned.
      cd dynamic-form

3. **Install the dependencies**:

    Run the following command to install all required dependencies.
    -npm install
4. **Start the development server**:

    ### Once the dependencies are installed, start the app locally by running:
    - npm start
    -This will launch the development server, and the app will be available at http://localhost:3000/ in your browser.

### Running Tests
    -The project includes tests written with Jest and React Testing Library to ensure the app functions correctly. 
    -To run the tests:
    -Run the following command in your terminal:
    -npm test

