const userId = sessionStorage.getItem("user_id");
const role = sessionStorage.getItem("role");

if (userId) {
  const loginButton = document.querySelector(".button1");
  const signupButton = document.querySelector(".button2");
  loginButton.style.display = "none";
  signupButton.style.display = "none";

  const navigationLinks3 = document.querySelector(".navigationLinks3");

  const myProfileButton = document.createElement("button");
  const logOut = document.createElement("button");

  myProfileButton.classList.add("button3");
  logOut.classList.add("button3");

  myProfileButton.textContent = "My Profile";
  logOut.textContent = "Log Out";

  navigationLinks3.appendChild(myProfileButton);
  navigationLinks3.appendChild(logOut);

  myProfileButton.addEventListener("click", () => {
    if (role === "doctor") {
      window.location = "../views/dashboard.html";
    } else if (role === "patient") {
      window.location = "../views/patientProfile.html";
    } else {
      alert(role);
    }
  });

  logOut.addEventListener("click", () => {
    sessionStorage.clear();
    window.location.href = "../index.html";
  });
}

if (userId) {
  // alert("Hello Sang")
  const loginButton = document.querySelector(".login");
  const signupButton = document.querySelector(".signup");
  loginButton.style.display = "none";
  signupButton.style.display = "none";

  const links = document.querySelector(".links");
  const myProfileButton = document.createElement("a");
  const myCart = document.createElement("a");
  const logOut = document.createElement("a");
  myProfileButton.classList.add("loggedInLinks");
  myCart.classList.add("loggedInLinks");
  logOut.classList.add("loggedInLinks");

  myCart.textContent = "My Cart";
  myProfileButton.textContent = "My Profile";
  logOut.textContent = "Log Out";

  links.appendChild(myCart);
  links.appendChild(myProfileButton);
  links.appendChild(logOut);

  myProfileButton.addEventListener("click", () => {
    if (role === "doctor") {
      window.location = "../views/dashboard.html";
    } else if (role === "patient") {
      window.location = "../views/patientProfile.html";
    } else {
      alert(role);
    }
  });

  myCart.addEventListener("click", () => {
    window.location.href = "../views/cart.html";
  });
  logOut.addEventListener("click", () => {
    sessionStorage.clear();
    window.location.href = "../index.html";
  });
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
