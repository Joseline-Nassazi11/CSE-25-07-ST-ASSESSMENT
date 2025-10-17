const form = document.getElementById("signupForm");
const inputs = form.querySelectorAll("input");
const alertBox = document.getElementById("alertBox");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let valid = true;
  inputs.forEach((input) => {
    if (input.value.trim() === "") {
      input.classList.add("error");
      input.classList.remove("valid");
      valid = false;
    } else {
      input.classList.remove("error");
      input.classList.add("valid");
    }
  });

  if (valid) {
    // Show success alert
    alertBox.style.display = "flex";
    form.reset();
    inputs.forEach((i) => i.classList.remove("valid"));
  }
});

function closeAlert() {
  alertBox.style.display = "none";
}

// Real-time validation
inputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (input.value.trim() === "") {
      input.classList.add("error");
      input.classList.remove("valid");
    } else {
      input.classList.remove("error");
      input.classList.add("valid");
    }
  });
});
