profileName.innerHTML = sessionStorage.getItem("name");
profileEmail.innerHTML = sessionStorage.getItem("email");
const welcomeUser = document.getElementById("welcomeUser");
welcomeUser.innerHTML = `Welcome 👋🏾<span style = "color: #5340ff; font-size: 25px; font-weight: 600;">${sessionStorage.getItem(
  "name"
)} </span>`;

// async function populateDoctorDetails() {
//   try {
//     document.getElementById("name").value = sessionStorage.getItem("name");
//     document.getElementById("email").value = sessionStorage.getItem("email");
//   } catch (error) {
//     console.error("An error occurred while fetching user details:", error);
//   }
// }
// populateDoctorDetails();

const profileForm = document.getElementById("profileContent");
profileForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // if (updatePatient()) {
  //   // populateUpdatedDetails()
  // }
  updateDoctor();
});

async function updateDoctor() {
  // const name = document.getElementById("name").value;
  // const email = document.getElementById("email").value;
  const dob = document.getElementById("dob").value;
  const age = document.getElementById("age").value;
  const phoneNumber = document.getElementById("phone_number").value;
  const homeAddress = document.getElementById("home_address").value;
  const workAddress = document.getElementById("work_place_address").value;
  const yearsOfExperience = document.getElementById(
    "years_of_experience"
  ).value;
  const specialty = document.getElementById("specialty").value;

  // console.log(name, email, password, role);
  //   if (!specialty || specialty === "none") {
  //     const specialtyError = document.getElementById("specialtyError");
  //     specialtyError.innerText = "Please select our Specialty to Proceed";
  //     specialtyError.classList.add("error");
  //     return;
  //   }

  try {
    const user_id = sessionStorage.getItem("user_id");
    console.log(user_id);

    const allData = {
      dob,
      age,
      phoneNumber,
      homeAddress,
      workAddress,
      yearsOfExperience,
      specialty,
    };

    const updateResponseD = await fetch(
      `http://localhost:3000/doctor/updatedoctor/${user_id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(allData),
      }
    );
    const data = await updateResponseD.json();
    console.log(allData);
    console.log(data);

    if (updateResponseD.status === 200) {
      console.log(updateResponseD);
      alert("Your details updated successfully");
    } else {
      alert("Your Details are not updated yet");
    }

    async function populateOtherDetails() {
      //   console.log(dob);
      //   console.log(age);
      //   console.log(phoneNumber);
      //   console.log(homeAddress);
      //   console.log(workAddress);
      //   console.log(yearsOfExperience);
      //   console.log(specialty);

      sessionStorage.setItem("dob", dob);
      sessionStorage.setItem("age", age);
      sessionStorage.setItem("phoneNumber", phoneNumber);
      sessionStorage.setItem("homeAddress", homeAddress);
      sessionStorage.setItem("workAddress", workAddress);
      sessionStorage.setItem("yearsOfExperience", yearsOfExperience);
      sessionStorage.setItem("specialty", specialty);
    }
    populateOtherDetails();
  } catch (error) {
    console.error("An error occurred while updating user details:", error);
  }
}

async function populateUpdatedDetails() {
  try {
    document.getElementById("dob").value = sessionStorage.getItem("dob");
    document.getElementById("age").value = sessionStorage.getItem("age");
    document.getElementById("phone_number").value =
      sessionStorage.getItem("phoneNumber");
    document.getElementById("home_address").value =
      sessionStorage.getItem("homeAddress");
    document.getElementById("work_place_address").value =
      sessionStorage.getItem("workAddress");
    document.getElementById("years_of_experience").value =
      sessionStorage.getItem("yearsOfExperience");
    document.getElementById("specialty").value =
      sessionStorage.getItem("specialty");
  } catch (error) {
    return "Error Populating UpdatedPatient Details";
  }
}
populateUpdatedDetails();

async function logOut() {
  sessionStorage.clear();
  window.location = "../index.html";
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

const inputs = document.getElementsByClassName("inputs").value;

if (inputs === "") {
  alert("Hello Guy, fill the form");
  const profile = document.getElementsByClassName("profileContent");
  profile.style.display = "none";

  const form = document.querySelector(".subMenus");
  const pararaph = document.createElement("p");
  const pararaphButton = document.createElement("button");

  pararaph.classList.add("noticeMessage");
  pararaphButton.classList.add("noticeButton");

  pararaph.textContent =
    "Please fill all your details before proceeding to see patients and attending to other services.";
  pararaphButton.textContent = "Fill Details";

  form.appendChild(pararaph);
  form.appendChild(pararaphButton);
  // } else {
  //   alert("Hello Sang");
}
