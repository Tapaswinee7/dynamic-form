import React, { useState, useEffect } from "react";

// Function to validate the form data based on dynamic field rules
const validateField = (fieldName, value, rules) => {
  let error = "";

  // Check if the field is required
  if (rules.required && !value.trim()) {
    error = `${fieldName} is required`;
  }

  // Check for additional rules like pattern matching
  if (rules.pattern && value && !rules.pattern.test(value)) {
    error = `${fieldName} is invalid`;
  }

  // Check for minimum length
  if (rules.minLength && value && value.length < rules.minLength) {
    error = `${fieldName} should be at least ${rules.minLength} characters`;
  }

  return error;
};

const DynamicForm = ({ config }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [visibleFields, setVisibleFields] = useState({});
  const [fieldConditions, setFieldConditions] = useState({});

  // Initialize form data and visibility
  useEffect(() => {
    const initialData = {};
    const initialVisibility = {};
    const initialFieldConditions = {};

    config.forEach((field) => {
      initialData[field.name] = field.value || "";

      // Handle visibility logic here
      if (field.name === "showPhone" && field.value === "no") {
        initialVisibility["phone"] = false;
      } else {
        initialVisibility[field.name] = true;
      }

      // Initialize conditional field states
      if (field.name === "state") {
        initialFieldConditions[field.name] = false; // Initially disabled
      } else {
        initialFieldConditions[field.name] = true; // All other fields enabled
      }
    });

    setFormData(initialData);
    setVisibleFields(initialVisibility);
    setFieldConditions(initialFieldConditions); // Set field conditions for enabling/disabling
  }, [config]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedValue = type === "checkbox" ? (checked ? "yes" : "no") : value;

    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: updatedValue };

      // If Address Line 1 is filled, enable Address Line 2
      if (name === "country" && value.trim()) {
        setFieldConditions((prevConditions) => ({
          ...prevConditions,
          state: true, // Enable state field when addrescountryLine1 has a value
        }));
      } else if (name === "country" && !value.trim()) {
        setFieldConditions((prevConditions) => ({
          ...prevConditions,
          state: false, // Disable state field if country is empty
        }));
      }

      return updatedData;
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};
    let valid = true;

    config.forEach((field) => {
      const error = validateField(
        field.label,
        formData[field.name],
        field.validation || {}
      );
      if (error) {
        valid = false;
        validationErrors[field.name] = error;
      }
    });

    setErrors(validationErrors);

    if (valid) {
      setIsSubmitted(true);
      const initialFormData = config.reduce((acc, field) => {
        acc[field.name] = field.value || ""; // Default empty string if no value is provided
        return acc;
      }, {});

      setFormData(initialFormData);
      setErrors({});
      setTimeout(() => setIsSubmitted(false), 3000); // Hide success message after 3 seconds
    }
  };

  return (
    <div className="form-container">
      <h1>Dynamic Form</h1>

      {isSubmitted && (
        <div className="success-message">Form submitted successfully!</div>
      )}

      <form onSubmit={handleSubmit} className="dynamic-form">
        {config.map((field, index) => (
          <div key={index} className="form-group">
            {/* Check if the field should be visible */}
            {visibleFields[field.name] && (
              <>
                <label>{field.label}</label>

                {field.type === "text" && (
                  <input
                    type="text"
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    className="form-input"
                    placeholder={field.placeholder || ""}
                    disabled={!fieldConditions[field.name]} // Apply conditional disabling
                  />
                )}

                {field.type === "email" && (
                  <input
                    type="email"
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    className="form-input"
                    placeholder={field.placeholder || ""}
                  />
                )}

                {field.type === "tel" && (
                  <input
                    type="tel"
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    className="form-input"
                    placeholder={field.placeholder || ""}
                  />
                )}

                {field.type === "checkbox" && (
                  <input
                    type="checkbox"
                    name={field.name}
                    checked={formData[field.name] === "yes"}
                    onChange={handleChange}
                    className="form-input"
                  />
                )}

                {errors[field.name] && (
                  <div className="error-message">{errors[field.name]}</div>
                )}
              </>
            )}
          </div>
        ))}

        <div className="button-container">
          <button type="submit" className="submit-button">
            Submit
          </button>
          <button
            type="button"
            className="reset-button"
            onClick={() => {
              setFormData({});
              setErrors({});
              setIsSubmitted(false);
            }}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default DynamicForm;
