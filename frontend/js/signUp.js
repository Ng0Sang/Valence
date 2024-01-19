// Form validation logic here
const myform = document.getElementById("myform");

myform.addEventListener("submit", (event) => {
  event.preventDefault();
  if (inputValidation()) {
    signUpUser();
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

  // For the name field
  const name = document.getElementById("name").value;
  const nameError = document.getElementById("nameError");

  if (name.trim().length < 3) {
    nameError.innerText =
      "Please enter a valid name with at least 3 characters";
    nameError.classList.add("error");
  } else if (!isNaN(name)) {
    nameError.innerText = "Name cannot be in number format";
    nameError.classList.add("error");
  } else {
    nameError.innerText = "";
    nameError.classList.remove("error");
  }

  // for the email field
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

async function signUpUser() {
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const role = document.querySelector("#roles").value;
  // console.log(name, email, password, role);
  if (!role || role === "none") {
    const roleError = document.getElementById("roleError");
    roleError.innerText = "Please select a role (Doctor or Patient)";
    roleError.classList.add("error");
    return;
  }

  const data = {
    name,
    email,
    password,
    role,
  };
  // console.log(data);
  try {
    const response = await fetch(
      `https://valence-j2y3.onrender.com/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    console.log(response);
    console.log(role);

    const newData = await response.json();
    console.log(newData);

    const token = data.token;
    const name = data.name;
    const email = data.email;
    const user_id = response.user_id;
    const roles = data.role;
    console.log(name);
    console.log(email);
    alert(user_id);
    console.log(token);
    console.log(role);

    // sessionStorage.setItem("loginToken", token);
    // sessionStorage.setItem("user_id", user_id);
    sessionStorage.setItem("name", name);
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("user_id", user_id);
    sessionStorage.setItem("role", roles);
    console.log(token);

    if (response.status === 201) {
      alert("User logged in successfully");
      if (role === "patient") {
        console.log(role);
        window.location = "../views/patient.html";
      } else if (role === "doctor") {
        window.location = "../views/confirmation.html";
      }
    } else {
      console.error("Error adding user");

      if (response.status === 409) {
        const errorElement = document.getElementById("errorElement");
        const errorMessage =
          "Email already exists. Please use a different email.";
        errorElement.innerText = errorMessage;
      } else {
      }
    }
  } catch (error) {
    console.log(error, "An error occurred while signing up the user.");
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
// const hamburger = document.getElementById("hamburger");

// hamburger.addEventListener("click", function() {
//   alert("Hello sANG")
//   const navigationLinks = document.getElementsByClassName("navigationLinks2");
//   const links = navigationLinks.getElementsByTagName("a");

//   for (let i = 0; i < links.length; i++) {
//     if (links[i].style.display === "none") {
//       links[i].style.display = "inline";
//     } else {
//       links[i].style.display = "none";
//     }
//   }
// });

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
