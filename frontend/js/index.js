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
              const kitHTML = `
              <div class="frameKit">
              <div class="kits" >
                <div><img src="${kit.image_url}".kit/></div>
                <div class = "kitContent">  
                  <div class="kitTag">
                    <p class = "kitName">${kit.kit_name}</p>
                    <p class="amount">${kit.price}</p>
                  </div>
                  <p class="description">${kit.description}</p>
                  <div class="price">
                    <a href="./signUp.html"><button>See Details</button></a>
                  </div>
                </div>                
              </div>
            </div>
            `;
              console.log(kitHTML);
              console.log(kitContainer);
              kitContainer.insertAdjacentHTML("beforeend", kitHTML);
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

  fetchKits();

  async function fetchDoctors() {
    try {
      const response = await fetch(`http://localhost:3000/doctor/`);

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        const doctorContainer = document.getElementById("listDoctors");
        const limitDoctors = data.slice(0, 3);

        if (limitDoctors && typeof Array) {
          if (limitDoctors && limitDoctors.length > 0) {
            limitDoctors.forEach((doctor) => {
              const doctorHTML = `<div class="doctors">
              <img src="${doctor.image_url}">
             <div class="p"/>
              <p class="name">${doctor.name}</p>
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

  const doctors = document.querySelectorAll(".doctors");
  const kit = document.querySelectorAll(".frameKit");

  doctors.addEventListener("click", function () {
    alert("Log In to see Doctor Details.");
  });
  kit.addEventListener("click", function () {
    alert("Log In to see Kit Details.");
  });

  const hero = document.querySelector(".hero");
  const images = [
    {
      image: "url('../images/myBackground.jpg')",
      writeup1: "Talk to Expert Doctors Online",
      writeup2: "Get Full Satisfaction at your Comfort Zone",
    },
    {
      image:
        "url('../images/medicine-uniform-healthcare-medical-workers-day-space-text.jpg')",
      writeup1: "Talk to Expert Doctors Online",
      writeup2: "Get Full Satisfaction at your Comfort Zone",
    },
    {
      image: "url('../images/medium-shot-doctor-using-disinfectant.jpg')",
      writeup1: "Get Kits At Affordable Price",
      writeup2: "Lab Machineries, Drugs, Reagents e.t.c",
    },
    {
      image: "url('../images/backgroundStetoscope.jpg')",
      writeup1: "Talk to Expert Doctors Online",
      writeup2: "Get Full Satisfaction at your Comfort Zone",
    },
    {
      image: "url('../images/female-doctor-showing-her-right-hand.jpg')",
      writeup1: "Join Premium for Better Experience",
      writeup2: "Make Appointment with any Doctor of your Choice",
    },
  ];

  let currentIndex = 0;

  function changeBackgroundImage() {
    const currentImage = images[currentIndex];
    hero.style.backgroundImage = currentImage.image;
    const writeupElement1 = document.querySelector(".heroHeading");
    writeupElement1.innerHTML = currentImage.writeup1;
    const writeupElement2 = document.querySelector(".heroParagraph");
    writeupElement2.innerHTML = currentImage.writeup2;
    currentIndex = (currentIndex + 1) % images.length;
  }

  changeBackgroundImage();

  setInterval(changeBackgroundImage, 8000);
});

const hamburger = document.getElementById("hamburger");
const links = document.getElementsByClassName("links")[0];

hamburger.addEventListener("click", function () {
  if (links.style.display === "none" || links.style.display === "") {
    links.style.display = "grid";
  } else {
    links.style.display = "none";
  }
});
