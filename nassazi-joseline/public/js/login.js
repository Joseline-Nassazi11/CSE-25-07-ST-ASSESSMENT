const form = document.getElementById("loginForm");
const inputs = form.querySelectorAll("input");

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
    window.location.href = "/success";
  }
});

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
