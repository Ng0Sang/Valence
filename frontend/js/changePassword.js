const welcomeUser = document.getElementById("welcomeUser");

welcomeUser.innerHTML = `Change Password Here, <span style = "color: #5340ff; font-size: 25px; font-weight: 600;">${sessionStorage.getItem(
  "name"
)} </span>`;

const newPassword = document.getElementById("changePassword");
newPassword.addEventListener("submit", (event) => {
  event.preventDefault();
  if (inputValidation()) {
    changePassword();
  }
});

async function inputValidation() {
  // password security requirements function
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

  // for the password field
  const oldPassword = document.getElementById("oldPassword").value;
  const newPassword = document.getElementById("newPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const oldPaswordError = document.getElementById("oldPasswordError");
  const newPasswordError = document.getElementById("newPasswordError");
  const confirmPasswordError = document.getElementById("confirmPasswordError");

  if (oldPassword === "") {
    oldPaswordError.innerText = "Your old password field can not be empty";
    oldPaswordError.classList.add("error");
  } else {
    oldPaswordError.innerText = "";
    oldPaswordError.classList.remove("error");
  }

  if (newPassword === "") {
    newPasswordError.innerText = "Please type in password";
  } else if (!isStrongPassword(newPassword)) {
    newPasswordError.innerText =
      "Yo! your password is weak, it must include uppercase, lowercase, numbers, and special characters.";
    newPasswordError.classList.add("error");
  } else {
    newPasswordError.innerText = "";
    newPasswordError.classList.remove("error");
  }

  if (confirmPassword !== newPassword) {
    confirmPasswordError.innerText =
      "Your Passwords Don't match, retype password.";
    confirmPasswordError.classList.add("error");
  } else if (confirmPassword === "") {
    confirmPasswordError.innerText =
      "Please type in pasword to Confirm Password";
    confirmPasswordError.classList.add("error");
  } else if (confirmPassword === newPassword) {
    // confirmPasswordError.innerText = "Passwords Match";
    oldPaswordError.classList.remove("error");
  } else {
  }
}

async function changePassword() {
  try {
    const currentPassword = document.getElementById("oldPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const user_id = sessionStorage.getItem("user_id");
    console.log(user_id);
    console.log(oldPassword);
    console.log(newPassword);

    const data = { currentPassword, newPassword };

    const response = await fetch(
      `http://localhost:3000/auth/changepassword/${user_id}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    console.log(result);
    console.log(oldPassword);

    if (response.status === 200) {
      alert("Your password was changed successfully");
      window.location = "../index.html";
    } else {
      alert("We couldnt change your password");
    }
  } catch (error) {
    console.log(error, "There was an error");
  }
}

async function logOut() {
  sessionStorage.clear();
  window.location = "../patient.html";
}
function checkPassword() {
  const password = document.querySelector(".password");
  const passwordCheck = document.getElementById("toggleButton");
  if (password.type === "password") {
    password.type = "text";
    passwordCheck.textContent = "Hide";
  } else {
    password.type = "password";
    passwordCheck.textContent = "Show";
  }
}

const hamburger = document.getElementById("hamburger");
const links = document.getElementsByClassName("links")[0];

hamburger.addEventListener("click", function () {
  // const navLinks3 = document.getElementsByClassName("navigationLinks3")[0];
  if (links.style.display === "none" || links.style.display === "") {
    links.style.display = "grid";
    // navLinks3.style.display = "none";
  } else {
    links.style.display = "none";
    // navLinks3.style.display = "flex";
  }
});
