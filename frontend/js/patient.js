document.addEventListener("DOMContentLoaded", function () {
  const hero = document.querySelector(".hero");
  const images = [
    {
      image: "url('../images/medium-shot-doctor-posing-studio.jpg')",
    },
    {
      image: "url('../images/backgroundStetoscope.jpg')",
    },
  ];

  let currentIndex = 0;

  function changeBackgroundImage() {
    const currentImage = images[currentIndex];
    hero.style.backgroundImage = currentImage.image;
    currentIndex = (currentIndex + 1) % images.length;
  }

  changeBackgroundImage();

  setInterval(changeBackgroundImage, 8000);
});

let searchInput = "";

document
  .getElementById("searchItem")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    searchInput = event.target.querySelector("input").value;
    console.log(searchInput);

    const searchResults = document.getElementById("searchResults");
    searchResults.innerHTML = "";

    try {
      const response = await fetch(
        `http://localhost:3000/doctor/getsingledoctor/${searchInput}`
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
                  <strong>Name of Doctor: </strong> ${data.name} <br>
                  <strong>Specialty: </strong> ${data.specialty} <br>
                  <a href = "#">
                  <button type = "submit" id = "checkKit">See Details</button></a>
                  `;
            // Contact: ${data.phone_number} <br>
            // Years Of Experience: ${data.years_of_experience} <br>
            // Email: ${data.email} <br>
            // Age: ${data.age} <br>
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
    // }
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
              <img src="${data.image_url}><br>
              <strong> Name of Kit:</strong>  ${data.kit_name}  <br>
              <strong>Price: </strong> ${data.price} <br>
              <strong>Description: </strong>${data.description} <br>
              <a href = "#">
              <button type = "submit" id = "checkKit">See Details</button></a>
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
  });

document.addEventListener("DOMContentLoaded", function () {
  async function fetchKits() {
    try {
      const response = await fetch(`http://localhost:3000/kit/`);

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        const kitContainer = document.getElementById("kitts");
        const limitKits = data.slice(0, 3);

        if (limitKits && typeof Array) {
          if (limitKits && limitKits.length > 0) {
            limitKits.forEach((kit) => {
              // const id = kit.kit_id;
              // sessionStorage.setItem("kit_id", id);
              // alert(id)
              const kitHTML = `
              <div class="frameKit">
              <div class="kits">
                <div class = "kitImage"><img src="${kit.image_url}"/></div>
                <div class = "kitContent">  
                <div class="kitTag">
                  <p class = "name">${kit.kit_name}</p>
                  <p class = "amount">${kit.price}</p>
                </div>
                  <p class="description">${kit.description}</p>
                  <a href = "#">
                  <button type = "submit" id = "checkKit">See Details</button></a>
                  </div>
                </div>                
              </div>
            </div>
            `;
              console.log(kitHTML);
              console.log(kitContainer);
              kitContainer.insertAdjacentHTML("beforeend", kitHTML);
            });

            // kitContainer.style.display = "grid";
            // kitContainer.style.gap = "1px";
            // kitContainer.style.gridTemplateColumns = "auto auto auto";
            // kitContainer.style.fontSize = "20px";
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

  fetchKits();
});

document.addEventListener("DOMContentLoaded", function () {
  async function fetchDoctors() {
    try {
      const response = await fetch(`http://localhost:3000/doctor/`);

      if (response.ok) {
        const docData = await response.json();
        console.log(docData);
        const doctorContainer = document.getElementById("listDoctors");
        const limitDoctors = docData.slice(0, 3);

        if (limitDoctors && typeof Array) {
          if (limitDoctors && limitDoctors.length > 0) {
            limitDoctors.forEach((doctor) => {
              const doctorHTML = `<div class="doctors">
              <img src="${doctor.image_url}"/>
             <div class="p">
                <p class="name">${doctor.name} </p>
                <p class="specialization">${doctor.specialty}</p>
                </div>
                </div>`;
              console.log(doctorHTML);
              console.log(doctorContainer);
              doctorContainer.insertAdjacentHTML("beforeend", doctorHTML);
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

// const checkKit = document.getElementsByClassName("checkKit");
// checkKit.addEventListener("submit", async (event) => {
//   event.preventDefault();

//   checkKit();
//   async function checkKit() {
//     try {
//       const kitResult = await fetch(
//         `http://localhost/kit/getsinglekit/${sessionStorage.getItem("id")}`
//       );

//       if (kitResult.ok) {
//         const data = await kitResult.json();
//         console.log(data);
//         const kitContainer = document.getElementById("kitts");

//         if (limitKits && typeof Array) {
//           if (limitKits && limitKits.length > 0) {
//             limitKits.forEach((kit) => {
//               const id = kit.kit_id;
//               sessionStorage.setItem("kit_id", id);
//               // alert(id)
//               const kitHTML = `
//           <div class="frameKit" style="padding:10px; background-color: rgb(160, 205, 247); border: 1px solid grey; display: grid; grid-template-columns: auto auto auto; border-radius: 20px; margin-left: 5%; width: 90%;">
//           <div class="kits" style= "width: 20vw; height: auto;">
//             <div><img src="${kit.image_url}" style= "width: 25vw; height: 40vh; margin-top: 6%; margin-left: 6%; border-radius: 20px;"/></div>
//             <div style ="background-color:rgb(160, 205, 247); width: 27vw;  border-radius: 10px;">
//             <div class="kitTag" style= "display: grid; grid-template-columns: auto auto;margin-top: 4%; width: 30vw;">
//               <p style = "color: black; font-size: 18px; font-weight: 700; margin-left: 5%;">${kit.name}</p>
//               <p class="amount" style ="margin-left: 50%; font-weight: 700;">${kit.price}</p>
//             </div>
//               <p class="description" style= "color:white; margin-left: 3%;">${kit.description}</p>
//               <a href = "#">
//               <button type= "submit" class = "checkKit" style="
//                 font-weight: bold;
//                 color: white;
//                 font-size: 15px;
//                 border: hidden;
//                 border-radius: 5px;
//                 width: 6vw;
//                 height:6vh;
//                 margin-left: 3%;
//                 margin-top: 3%;
//                 margin-bottom: 2%;
//                 background-color:black;" >See Details</button></a>
//               </div>
//             </div>
//           </div>
//         </div>
//         `;
//               console.log(kitHTML);
//               console.log(kitContainer);
//               kitContainer.insertAdjacentHTML("beforeend", kitHTML);
//             });

//             kitContainer.style.display = "grid";
//             kitContainer.style.gap = "1px";
//             kitContainer.style.gridTemplateColumns = "auto auto auto";
//             kitContainer.style.fontSize = "20px";
//           } else {
//             console.error("Invalid data structure received from the server.");
//           }
//         } else {
//           console.error(`Error fetching kit: ${response.status}`);
//         }
//       }
//     } catch (error) {
//       return res
//         .status(404)
//         .json({ error: "Server is having error fetching kit." });
//     }
//   }
// });
