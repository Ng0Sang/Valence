let searchInput = "";

document
  .getElementById("searchDoctor")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    searchInput = event.target.querySelector("input").value;
    console.log(searchInput);

    searchDoctors();
  });

async function searchDoctors() {
  const searchResults = document.getElementById("searchResults");
  searchResults.innerHTML = "";

  try {
    const response = await fetch(
      `https://valence-j2y3.onrender.com/doctor/getdoctor/${searchInput}`
    );

    // console.log(response);
    if (response.ok) {
      const data = await response.json();

      console.log(data);
      if (data && typeof Object) {
        if (data.user_id === 0) {
          searchResults.style.display = "block";
          searchResults.innerHTML = "No result found for your search.";
        } else {
          // data.((kit) => {
          searchResults.style.display = "block";
          searchResults.innerHTML += `
              <img src="${data.image_url}"><br>
             <strong> Name of Doctor:</strong> ${data.name} <br>
             <strong> Specialty:</strong> ${data.specialty} <br>
             <a href = "#">
             <button type = "submit" id = "checkKit" >See Details</button></a>
              `;
        }
      } else {
        console.error("Invalid data structure received from the server.");
      }
    } else {
      console.error(`Error searching for kit: ${response.status}`);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }

  try {
    const response = await fetch(
      `https://valence-j2y3.onrender.com/doctor/getsingledoctor/${searchInput}`
    );

    // console.log(response);
    if (response.ok) {
      const data = await response.json();

      console.log(data);
      if (data && typeof Object) {
        if (data.user_id === 0) {
          searchResults.style.display = "block";
          searchResults.innerHTML = "No result found for your search.";
        } else {
          // data.((kit) => {
          searchResults.style.display = "block";
          searchResults.innerHTML += `
          <img src="${data.image_url}"><br>
          ${data.name} <br>
          ${data.specialty} <br>
         <a href = "#">
         <button type = "submit" id = "checkKit" >See Details</button></a>
          `;
        }
      } else {
        console.error("Invalid data structure received from the server.");
      }
    } else {
      console.error(`Error searching for kit: ${response.status}`);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  async function fetchDoctors() {
    try {
      const response = await fetch(`https://valence-j2y3.onrender.com/doctor/`);

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        const doctorContainer = document.getElementById("listDoctors");

        if (data && typeof Array) {
          if (data && data.length > 0) {
            data.forEach((doctor) => {
              sessionStorage.setItem("doctor_id", doctor.user_id);
              // const doctor_id = sessionStorage.getItem("kit_id");
              const doctorHTML = `<div class="doctors">
           <div class = "engolf">
           <img src="${doctor.image_url}" />
           <div class="nameAndSpecialty">
            <p class="name"> ${doctor.name}</p>
            <p class="specialization">${doctor.specialty}</p>
            </div>
            </div>
            </div>`;
              // console.log("Hey Sang, ",doctor)
              doctorContainer.insertAdjacentHTML("beforeend", doctorHTML);
              const doctors = document.querySelectorAll(".doctors");
              const currentDoctor = doctors[doctors.length - 1]; // Get the last doctor element

              currentDoctor.addEventListener("click", () => {
                seeDetails(doctor);
              });
            });
          } else {
            console.error(`Error fetching doctors: ${response.status}`);
          }
        }
      }
    } catch (error) {
      console.log("An error occured while fetching Doctors:", error);
    }
  }
  fetchDoctors();
});

function seeDetails(doctor) {
  if (userId) {
    // const doctor_id = sessionStorage.getItem("doctor_id");
    const modalcontainer = document.querySelector(".modal");
    const overlay = document.querySelector(".overlay");
    const closeButtons = document.querySelectorAll(".closebutton");
    const modalText = document.querySelector(".modal_text");
    const doctor_id = `${doctor.user_id}`;
    sessionStorage.setItem("doctor_id", doctor_id);
    console.log("Doctor_id", doctor_id);
    modalText.innerHTML = `
    <div class="modal_text">
    <img src="${doctor.image_url}"  class = "image" alt= "Hello Dear" />
    <div class ="doctorDetails"> 
      <h1>Name: <strong>${doctor.name}</strong></h1>
      <h1>Eamil: <strong>${doctor.email}</strong></h1>
      <h1>Specialty: <strong>${doctor.specialty}</strong></h1>
      <h1>Work Address: <strong>${doctor.work_place_address}</strong></h1>
      <h1>Experience: <strong>${doctor.years_of_experience}</strong></h1>
      <div class="bookDoctor">
      <a href = "#myform"><button id = "booking">Make Appointment</button></a>
      </div>
    </div>
    </div>
  `;

    const booking = document.querySelector("#booking");
    booking.addEventListener("click", function () {
      const modal = document.querySelector(".modal_text");
      const modalColor = document.querySelector(".modal");
      const form = document.querySelector("#myform");
      modal.style.display = "none";
      modalColor.style.backgroundColor = "transparent";
      form.style.display = "block";
    });

    function openmodal() {
      modalcontainer.classList.remove("hidden");
      overlay.classList.remove("hidden");
    }

    function closemodal() {
      modalcontainer.classList.add("hidden");
      overlay.classList.add("hidden");
      document.body.style.overflow = "auto";
    }

    overlay.addEventListener("click", () => {
      closemodal();
    });

    closeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        closemodal();
      });
    });

    openmodal();
  } else {
    alert("Hello Dear, you must have an account to view Doctors Details.");
  }
}

async function bookDoctor(doctor_id) {
  const user_id = sessionStorage.getItem("user_id");
  alert(user_id);
  if (!user_id) {
    alert("You must have an account to Book Doctor.");
  } else if (user_id) {
    const doctorData = { user_id, doctor_id };
    console.log(doctorData);
    alert(doctorData);
    try {
      const response = await fetch(
        `https://valence-j2y3.onrender.com/doctor/bookdoctor/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(doctorData),
        }
      );

      if (response.status === 201) {
        alert("Doctor added to booked doctors sucessfully");
      } else {
        alert("Doctor not added to booked doctors successfully");
      }
    } catch (error) {
      console.log(error);
    }
  }
}

async function postUserSymptoms() {
  const user_id = sessionStorage.getItem("user_id");
  alert("Hello Sang");
  try {
    const patient_name = document.getElementById("name").value;
    const patient_diagnosis = document.getElementById("diagnosis").value;
    const patient_symptoms = document.getElementById("symptoms").value;
    const patient_gender = document.getElementById("gender").value;

    const userData = {
      user_id,
      patient_name,
      patient_diagnosis,
      patient_symptoms,
      patient_gender,
    };

    const response = await fetch(
      `https://valence-j2y3.onrender.com/user/patientsymptoms`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      }
    );

    if (response.status === 201) {
      alert("Your Information have been stored successfully");
      console.log(response, userData);
      window.location = "../views/payment.html";
    } else {
      alert("Please try again, there is a small issue somewhere, Tanks!!");
    }
  } catch (error) {
    console.log(error);
  }
}

const userId = sessionStorage.getItem("user_id");
const role = sessionStorage.getItem("role");

if (userId) {
  const loginButton = document.querySelector(".button1");
  const signupButton = document.querySelector(".button2");
  loginButton.style.display = "none";
  signupButton.style.display = "none";

  const navigationLinks3 = document.querySelector(".navigationLinks3");
  const myProfileButton = document.createElement("button");
  const myCart = document.createElement("button");
  const logOut = document.createElement("button");

  myProfileButton.classList.add("button3");
  myCart.classList.add("button3");
  logOut.classList.add("button3");

  myCart.textContent = "My Cart";
  myProfileButton.textContent = "My Profile";
  logOut.textContent = "Log Out";
  const icon = document.createElement("img");
  // icon.src = "../images/cartBGC2.png";
  // myProfileButton.appendChild(icon);
  // myCart.appendChild(icon);

  navigationLinks3.appendChild(myCart);
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

  myCart.addEventListener("click", () => {
    window.location.href = "../views/cart.html";
  });
  logOut.addEventListener("click", () => {
    sessionStorage.clear();
    window.location.href = "../index.html";
  });
}

if (userId) {
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
  if (links.style.display === "none" || links.style.display === "") {
    links.style.display = "grid";
  } else {
    links.style.display = "none";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const paymentForm = document.getElementById("myform");
  paymentForm.addEventListener("submit", payWithPaystack, false);

  document.getElementById("email").value = sessionStorage.getItem("email");
  document.getElementById("amount").value = "5000";
  document.getElementById("name").value = sessionStorage.getItem("name");

  function payWithPaystack(e) {
    e.preventDefault();

    let handler = PaystackPop.setup({
      key: "pk_test_74b59d726057c5cafed8f3fdf4b0aee62b281ab7",
      name: document.getElementById("name").value,
      amount: document.getElementById("amount").value * 100,
      ref: "" + Math.floor(Math.random() * 1000000000 + 1),

      onClose: function () {
        alert("Window closed.");
      },
      callback: function (response) {
        let message =
          "Payment was Successful! Reference: " + response.reference;
        alert(message);
      },
    });

    handler.openIframe();
  }
});
