const form = document.getElementById("signupForm");
const inputs = form.querySelectorAll("input");
const alertBox = document.getElementById("alertBox");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

// Simple Email Regex for basic client-side format checking
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Function to set the border color based on validity
const setValidationStyle = (input, isValid) => {
  if (isValid) {
    input.classList.remove("error");
    input.classList.add("valid");
  } else {
    input.classList.add("error");
    input.classList.remove("valid");
  }
};

// Main validation function for a single input
const validateInput = (input) => {
  let isValid = true;

  // 1. Check for empty fields (required for all)
  if (input.value.trim() === "") {
    isValid = false;
  }
  // 2. Specific validation for Email format
  else if (input.id === "email") {
    if (!emailRegex.test(input.value.trim())) {
      isValid = false;
    }
  }
  // 3. Specific validation for Confirm Password matching
  else if (input.id === "confirmPassword") {
    // Check if Confirm Password matches Password
    if (input.value !== passwordInput.value || input.value.trim() === "") {
      isValid = false;
    }
  }

  setValidationStyle(input, isValid);
  return isValid;
};

// 1. Handle Form Submission (Clicking 'SIGN UP')
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let formValid = true;

  // Validate every input
  inputs.forEach((input) => {
    // Run validation on submission; if any fail, formValid becomes false
    if (!validateInput(input)) {
      formValid = false;
    }
  });

  if (formValid) {
    // Success Logic: Show alert, reset form, and clear styles
    alertBox.style.display = "flex";
    form.reset();

    // Remove 'valid' styles so fields are clean after reset
    inputs.forEach((i) => i.classList.remove("valid", "error"));
  } else {
    // Ensure alert is hidden if validation failed
    alertBox.style.display = "none";
  }
});

// 2. Handle Real-Time Input (as the user types)
inputs.forEach((input) => {
  input.addEventListener("input", () => {
    // Run validation immediately
    validateInput(input);

    // Special: If the password field changes, re-validate the confirm field too
    if (input.id === "password") {
      validateInput(confirmPasswordInput);
    }
  });
});

// Function to close the alert box (called by the 'x' button's onclick attribute)
function closeAlert() {
  alertBox.style.display = "none";
}
