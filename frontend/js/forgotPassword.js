const newPassword = document.getElementById("newPassword");
newPassword.addEventListener("submit", async (event) => {
  const user_id = sessionStorage.getItem("user_id");
  const email = sessionStorage.getItem("email");
  document.getElementById("email").value = email;

  alert(user_id);
  console.log(user_id);
  event.preventDefault();
  if (inputValidation()) {
    forgotPassword();
  }
});

async function inputValidation() {
  function isStrongPassword(password) {
    const upCaseRegex = /[A-Z]/;
    const lowCaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

    return (
      password.length >= 8 &&
      upCaseRegex.test(password) &&
      lowCaseRegex.test(password) &&
      numberRegex.test(password) &&
      specialCharRegex.test(password)
    );
  }

  const password = document.getElementById("newpassword").value;
  const passwordError = document.getElementById("passwordError");

  if (password === "") {
    passwordError.innerText = "Please type in a password";
    passwordError.classList.add("error");
    return false;
  } else if (!isStrongPassword(password)) {
    passwordError.innerText =
      "Your password must include uppercase, lowercase, numbers, and special characters.";
    passwordError.classList.add("error");
    return false;
  } else {
    passwordError.innerText = "";
    passwordError.classList.remove("error");
    return true;
  }
}

async function forgotPassword() {
  try {
    const email = document.getElementById("email").value;
    const password = document.getElementById("newpassword").value;
    const data = { email, password };

    const response = await fetch(
      `https://valence-w73c.onrender.com/auth/forgotpassword/${user_id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();
    console.log(result);

    if (response.status === 200) {
      alert("Your email was changed successfully.");
      window.location = "../views/login.html";
    } else {
      alert("We couldn't change your email.");
    }
  } catch (error) {
    console.error(error, "There was an error");
  }
}
