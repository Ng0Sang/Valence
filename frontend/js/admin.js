const viewKits = document.getElementById("viewKits");
viewKits.addEventListener("submit", (event) => {
  event.preventDefault();

  fetchKits();
});

async function fetchKits() {
  try {
    const response = await fetch(`https://valence-j2y3.onrender.com/kit/`);

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      const kitContainer = document.getElementById("kitResult");

      if (data && typeof Array) {
        if (data && data.length > 0) {
          data.forEach((kit) => {
            const kitHTML = `
              <div class="frameKit" style="padding:10px; background-color: #5340ff; border-radius: 20px; width: 100%; margin-left: 1%;">
                <div class="kits" style= "width: 20vw; height: 100%;">
                  <div><img src="${kit.image_url}" style= "width: 25vw; height: auto; margin-top: 6%; border-radius: 20px;"/></div>
                  <div style ="background-color:white; width: 25vw">  
                  <div class="kitTag" style= "display: grid; grid-template-columns: auto auto; margin-top: 4%; width: 30vw; padding:10px;">
                    <p style = "color: black; font-size: 20px; width: 6vw; font-weight:600;">${kit.name}</p>
                    <p class="amount" style = "margin-left: 35%;">${kit.price}</p>
                  </div>
                    <p class="description" style= "color:black; padding:10px;">${kit.description}</p>
                    <div class="price">
                      <a href="./signUp.html"><button style="
                      font-weight: bold;
                      color: white;
                      font-size: 15px;
                      border: hidden;
                      border-radius: 20px;
                      width: 5vw;
                      height: 4vh;
                      margin-top: 1%;
                      margin-bottom: 2%;
                      background-color:#5340ff;" >Buy Now</button></a>
                      <div>
                    </div>
                  </div>                
                </div>
              </div>
            `;
            console.log(kitHTML);
            console.log(kitContainer);
            kitContainer.insertAdjacentHTML("beforeend", kitHTML);
          });

          kitContainer.style.display = "grid";
          kitContainer.style.gap = "1px";
          kitContainer.style.gridTemplateColumns = "auto auto auto";
          kitContainer.style.fontSize = "20px";
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

  const selectedAction = document.getElementById("action");

  selectedAction.addEventListener("change", (event) => {
    const select = event.target.value;

    if (select === "editKit") {
      window.location = "./kitsForm.html";
    } else if (select === "addKit") {
      window.location = "./kitsForm.html";
    } else if (select === "deleteKit") {
      window.location = "./kitsForm.html";
    } else {
      console.log("couldnt move to edit kit");
    }
  });
}

const viewDoctors = document.getElementById("viewDoctors");
viewDoctors.addEventListener("submit", (event) => {
  event.preventDefault();

  fetchDoctors();
});
async function fetchDoctors() {
  try {
    const response = await fetch(`https://localhost:3000/doctor/`);

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      const doctorContainer = document.getElementById("kitResult");

      if (data && typeof Array) {
        if (data && data.length > 0) {
          data.forEach((doctor) => {
            const doctorHTML = `<div class="doctors" style="background-color: aliceblue; padding: 20px; margin-top:5%;">
            <img src="${doctor.image_url}" style= "width: 24vw; height: auto; border-radius: 20px;" >
           <div class="p" style= "padding: 20px; margin-top: 2%; width: 100%; background-color: lightblue; font-size: 23px;"/>
           <p class="deleteDoctorBtn" style= "font-weight: 500; text-align: left;"> <strong>User Id: </strong> ${doctor.user_id} </p>
            <p class="name" style= "font-weight: 500; text-align: left;"> <strong>Name: </strong> ${doctor.name} </p>
            <p class="email"  style= "font-weight: 500; text-align: left;"><strong> Email:  </strong> ${doctor.email} </p>
            <p class="Age"  style= "font-weight: 500; text-align: left;"><strong>  Age:  </strong> ${doctor.age} </p>
            <p class="phonNumber"  style= "font-weight: 500; text-align: left;"><strong> Phone Number:  </strong>  ${doctor.phone_number}</p>
            <p class="specialization"  style= "font-weight: 500; text-align: left;"><strong> Specialty: </strong>  ${doctor.specialty}</p>
            <p class="yearsOfExperience"  style= "font-weight: 500; text-align: left;"><strong> Years Of Experience: </strong>  ${doctor.years_of_experience}</p>
            <button class = "deleteDoctor"  style="
            font-weight: bold;
            color: white;
            font-size: 15px;
            border: hidden;
            border-radius: 10px;
            width: 7vw;
            height: 5vh;
            margin-top: 5%;
            margin-bottom: 2%;
            background-color:red;">Delete Doctor</button>
          </div>`;

            console.log(doctorHTML);
            console.log(doctorContainer);
            const user_id = doctor.user_id;
            sessionStorage.setItem("doctorId", user_id);
            doctorContainer.insertAdjacentHTML("beforeend", doctorHTML);
          });

          doctorContainer.style.display = "grid";
          doctorContainer.style.gridTemplateColumns = "auto auto auto";
        } else {
          console.error(`Error fetching doctors: ${response.status}`);
        }

        const deletingDoctor = document.getElementsByClassName("deleteDoctor");
        deletingDoctor.addEventListener("click", (event) => {
          event.preventDefault();
          deleteDoctor();
        });

        async function deleteDoctor() {
          const doctorId = sessionStorage.getItem("doctorId");
          console.log(doctorId);
          try {
            const deletedDoc = await fetch(
              `https://localhost:3000/doctor/deletedoctor/${doctorId}`,
              { method: "DELETE", headers:{"Content-Type": "application/json"}, body:  }
            );

            console.log(deletedDoc);
            const data = await deleteDoctor.json();
          } catch (error) {}
        }
      }
    }
  } catch (error) {
    console.log("An error occured while fetching Doctors:", error);
  }
}
