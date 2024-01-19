// Form validation logic here
const myform = document.getElementById("myform");

myform.addEventListener("submit", (event) => {
  event.preventDefault();
  if (inputValidation()) {
    loginUsers();
  }
});

async function inputValidation() {
  // for the email standard
  function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
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

  const email = document.getElementById("email").value;
  const emailError = document.getElementById("emailError");

  if (email === "") {
    emailError.innerText = "Please insert an email address";
    emailError.classList.add("error");
  } else if (!isValidEmail(email)) {
    emailError.innerText = "Please insert a valid email address";
    emailError.classList.add("error");
  } else {
    emailError.innerText = "";
    emailError.classList.remove("error");
  }
  // for the password field
  const password = document.getElementById("password").value;
  const passwordError = document.getElementById("passwordError");

  if (password === "") {
    passwordError.innerText = "Please type in password";
    passwordError.classList.add("error");
  } else if (!isStrongPassword(password)) {
    passwordError.innerText =
      "Yo! your password is weak, it must include uppercase, lowercase, numbers, and special characters.";
    passwordError.classList.add("error");
  } else {
    passwordError.innerText = "";
    passwordError.classList.remove("error");
  }
}
// console.log(process.env.BASE_URL);

async function loginUsers() {
  const emailError = document.getElementById("emailError");
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const data = {
    email,
    password,
  };

  try {
    const response = await fetch(
      `https://valence-j2y3.onrender.com/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const loginData = await response.json();
    console.log(loginData);

    console.log(loginData);
    // const token = loginData.token;
    const name = loginData.name;
    const user_id = loginData.user_id;
    const role = loginData.role;
    console.log(user_id);
    // console.log(token);

    // sessionStorage.setItem("loginToken", token);
    sessionStorage.setItem("name", name);
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("user_id", user_id);
    sessionStorage.setItem("role", role);

    if (response.status === 200) {
      if (role === "patient") {
        // alert("Log in successful!!");
        window.location = "../views/patient.html";
      } else if (role === "doctor") {
        // alert("Log in successful!!");
        window.location = "../views/dashboard.html";
      }
    } else {
      console.log("Error logging in user");
    }
    if (response.status === 401) {
      alert("Invalid Email or Password.");
    }
  } catch (error) {
    console.error(error);
    console.log("An error occurred logging in user.");
  }
}

function checkPassword() {
  const password = document.getElementById("password");
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
