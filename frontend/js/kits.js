// const { response } = require("express");
let searchInput = "";

document
  .getElementById("searchKit")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    searchInput = event.target.querySelector("input").value;
    console.log(searchInput);

    searchKit();
  });

async function searchKit() {
  const searchResults = document.getElementById("searchResults");
  searchResults.innerHTML = "";

  try {
    const response = await fetch(
      `http://localhost:3000/kit/getsinglekit/${searchInput}`
    );

    if (response.ok) {
      const data = await response.json();
      console.log(data);

      if (data && typeof Object) {
        if (data.kit_id === undefined) {
          searchResults.style.display = "block";
          searchResults.innerHTML = "No result found for your search.";
        } else {
          // data.((kit) => {
          searchResults.style.display = "block";
          searchResults.innerHTML += `
              <img src="${data.image_url}"><br>
              <strong> Name of Kit:</strong>  ${data.kit_name}  <br>
              <strong>Price: </strong> ${data.price} <br>
              <strong>Description: </strong>${data.description} <br>
            `;
          // });
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

// document.addEventListener("DOMContentLoaded", function () {
async function fetchKits() {
  try {
    const response = await fetch(`http://localhost:3000/kit/`);

    if (response.ok) {
      const data = await response.json();
      console.log(data);

      const kitContainer = document.getElementById("kitts");

      if (data && typeof Array) {
        if (data && data.length > 0) {
          data.forEach((kit) => {
            sessionStorage.setItem("kit_id", kit.kit_id);
            sessionStorage.setItem("kit_price", kit.price);
            const kit_id = sessionStorage.getItem("kit_id");
            const kitHTML = `
            <div class="frameKit"  id="seedetails">
              <div class="kits">
              <div id="favouriteKit" onclick="addToFavourites('${kit_id}')"><img src = "../images/cartBGC2.png" alt = "Hello" /></div>
                <div class ="kitImage"><img src="${kit.image_url}"/></div>
                <div class = "kitContent">  
                <div class="kitTag">
                  <h1 class = "kitName">${kit.kit_name}</h1>
                  <p class="amount">${kit.price}</p>
                </div>
                </div>                
                <div class = "description"><p>${kit.description}</p></div>
                </div>
                </div>
                `;

            // console.log(kitHTML);
            // console.log(kitContainer);
            kitContainer.insertAdjacentHTML("beforeend", kitHTML);

            const kitt = document.querySelectorAll(".kitts");
            const currentDoctor = kitt[kitt.length - 1];
            currentDoctor.addEventListener("click", () => {
              console.log("Kit", kit);
              seeKitDetails(kit);
            });
          });
        } else {
          console.error("Invalid data structure received from the server.");
        }
      } else {
        console.error(`Error fetching kit: ${response.status}`);
      }
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// });
fetchKits();

function seeKitDetails(kit) {
  // const doctor_id = sessionStorage.getItem("doctor_id");
  if (userId) {
    const modalcontainer = document.querySelector(".modal");
    const overlay = document.querySelector(".overlay");
    const closeButtons = document.querySelectorAll(".closebutton");
    const modalText = document.querySelector(".modal_text");
    // const kit_id = `${kit.kit_id}`;
    // sessionStorage.setItem("kit_id", kit_id);
    // console.log("kit_id", kit_id);
    modalText.innerHTML = `
    <div class="modal_text">
    <img src="${kit.image_url}"  class = "image" alt= "Hello Dear" />
    <div class ="doctorDetails"> 
      <h1><strong style = "color:navy;">Name:</strong> ${kit.kit_name}</h1>
      <h1><strong style = "color:navy;">Price:</strong> ${kit.price}</h1>
      <h1><strong style = "color:navy;">Description:</strong> ${kit.description}</h1>
      <div class="bookDoctor">
      <a href = "../views/kitsPayment.html"><button id = "booking">Buy Kit</button></a>
      </div>
    </div>
    </div>
  `;

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
    alert("Log In to Bu Kit");
  }
}

async function addToFavourites(kit_id) {
  const user_id = sessionStorage.getItem("user_id");
  if (!user_id) {
    alert("You must have an account to Add Favourites.");
  } else if (user_id) {
    const favouriteData = { user_id, kit_id };
    console.log(favouriteData);
    // alert(favouriteData)
    // alert("user Id", user_id)
    // alert("kit Id", kit_id)
    try {
      const response = await fetch(`http://localhost:3000/kit/addfavourite/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(favouriteData),
      });

      if (response.status === 201) {
        alert("Favourite added sucessfully");
      } else {
        alert("Favourite not added successfully");
      }
    } catch (error) {
      console.log(error);
    }
  }
}

// document.addEventListener('DOMContentLoaded', function () {
//   const userId = sessionStorage.getItem('user_id');

//   if (userId) {
//     const loginButton = document.querySelector('.button1');
//     const signUpButton = document.querySelector('.button2');

//     if (loginButton) {
//       loginButton.parentNode.remove();
//     }
//     if (signUpButton) {
//       signUpButton.parentNode.remove();
//     }

//     const myProfileButton = document.createElement('a');
//     myProfileButton.setAttribute('href', '#');
//     myProfileButton.innerHTML = '<button>My Profile</button>';

//     const navigationLinks = document.querySelector('.navigationLinks3');
//     if (navigationLinks) {
//       navigationLinks.appendChild(myProfileButton);
//     }
//   }
// });

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
  icon.src = "../images/cartBGC2.png";
  // myProfileButton.appendChild(icon);
  myCart.appendChild(icon);

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

//  async function checkLoggedUser () {
// //   try {
// //     const user_id = sessionStorage.getItem("user_id");
// //     // const token = sessionStorage.getItem("token");
// //     // console.log("token", token);
// //     const response = await fetch(
// //       `http://localhost:3000/user/getsinglepatient/${user_id}`
// //     );
// //     if (token) {
// //       const footer = document.querySelector(".footerSection");
// //       footer.style.display = "hidden";
// //       alert("You are not authorised to view kits");
// //     }
// //     const result = await response.json();

// //     console.log(result);
// //     if (user_id.length === 0) {
// //       alert("You have to log in exist");
// //     }
// //   } catch (error) {}
// // }

function seeDetails() {
  const modalButton = document.querySelectorAll("#seedetails");
  const modalcontainer = document.querySelector(".modal");
  const overlay = document.querySelector(".overlay");
  const closeModal = document.querySelectorAll("#closebutton");

  function openmodal() {
    modalcontainer.classList.remove("hidden");
    overlay.style.display = "block";
  }

  function closemodal() {
    modalcontainer.classList.add("hidden");
    overlay.style.display = "none";
    document.body.style.overflow = "auto";
  }

  overlay.addEventListener("click", () => {
    modalcontainer.classList.add("hidden");
    overlay.style.display = "none";
    document.body.style.overflow = "auto";
  });

  modalButton.forEach((button) => {
    button.addEventListener("click", () => openmodal());
  });
  closeModal.forEach((button) => {
    button.addEventListener("click", () => closemodal());
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

// async function displayDetails() {
//   // const
//   const kitDetails = await fetch(`http://localhost:3000/getsinglekit/${kit_id}`)
// }

//   const modalContent = document.getElementsByClassName("modal-text");
//   modalContent.innerHTML = `<div class="frameKit"  id="seedetails" style="padding:10px; background-color: rgb(160, 205, 247); border: 1px solid grey; display: grid; grid-template-columns: auto auto auto; border-radius: 20px; margin-left: 5%; width: 90%;" onclick="seeDetails()">
//   <div class="kits" style= "width: 20vw; height: auto;">
//     <div><img src="${kit.image_url}" style= "width: 25vw; height: 40vh; margin-top: 6%; margin-left: 6%; border-radius: 20px;"/></div>
//     <div style ="background-color:rgb(160, 205, 247); width: 27vw;  border-radius: 10px;">
//     <div class="kitTag" style= "display: flex; padding:20px; margin-top: 4%; width: 30vw;">
//       <h1 style = "color: black; font-size: 18px; width: 50%;">${kit.name}</h1>
//       <p class="amount" style ="font-weight:700; margin-left:27%;">${kit.price}</p>
//     </div>
//       <p class="description" style= "color:white; margin-left: 4%;">${kit.description}</p>
//       <div class="price">
//         <a ><button style="
//         font-weight: bold;
//         color: white;
//         font-size: 15px;
//         border: hidden;
//         border-radius: 10px;
//         width: 6vw;
//         height: 6vh;
//         margin-left: 4%;
//         margin-top: 3%;
//         margin-bottom: 2%;
//         background-color:black;  id="seedetails" onclick="seeDetails()">See Details</button></a>
//       </div>
//     </div>
//   </div>
// </div>`
// document.body.style.overflow = "hidden";
