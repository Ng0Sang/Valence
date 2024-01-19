const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");
const welcomeUser = document.getElementById("welcomeUser");

profileName.innerHTML = sessionStorage.getItem("name");
profileEmail.innerHTML = sessionStorage.getItem("email");
welcomeUser.innerHTML = `Welcome <span style = "color: #5340ff; font-size: 25px; font-weight: 600;">${sessionStorage.getItem(
  "name"
)} </span>`;
// async function populateUserDetails() {
//   try {
//     document.getElementById("name").value = sessionStorage.getItem("name");
//     document.getElementById("email").value = sessionStorage.getItem("email");
//   } catch (error) {
//     console.error("An error occurred while fetching user details:", error);
//   }
// }
// populateUserDetails();

const profileForm = document.getElementById("profileContent");
profileForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // if (updatePatient()) {
  //   // populateUpdatedDetails()
  // }
  updatePatient();
});

// const profileArea = document.getElementById("profileArea");
// profileArea = document.addEventListener("click", () => {
//   const profileContent = document.getElementById("profileContent");
//   profileContent.style.display = "block";
// });

async function updatePatient() {
  // const name = document.getElementById("name").value;
  // const email = document.getElementById("email").value;
  const dob = document.getElementById("dob").value;
  const age = document.getElementById("age").value;
  const phone_number = document.getElementById("phone_number").value;
  const home_address = document.getElementById("home_address").value;
  const diagnosis = document.getElementById("diagnosis").value;
  const years_with_illness =
    document.getElementById("years_with_illness").value;

  try {
    const user_id = sessionStorage.getItem("user_id");
    console.log(user_id);

    const allData = {
      dob,
      age,
      phone_number,
      home_address,
      diagnosis,
      years_with_illness,
    };

    const updateResponse = await fetch(
      `http://localhost:3000/user/updatepatient/${user_id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(allData),
      }
    );
    const data = await updateResponse.json();
    console.log(data);

    if (updateResponse.status === 200) {
      alert(updateResponse);
      alert("Your details updated successfully, Log In for it to Update");
    } else {
      alert("Your Details haven't updated successfully");
    }

    async function populateOtherDetails() {
      console.log(dob);
      console.log(age);
      console.log(phone_number);
      console.log(home_address);
      console.log(diagnosis);
      console.log(years_with_illness);

      sessionStorage.setItem("dob", dob);
      sessionStorage.setItem("age", age);
      sessionStorage.setItem("phoneNumber", phone_number);
      sessionStorage.setItem("homeAddress", home_address);
      sessionStorage.setItem("diagnosis", diagnosis);
      sessionStorage.setItem("yearsWithIllness", years_with_illness);
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
    document.getElementById("diagnosis").value =
      sessionStorage.getItem("diagnosis");
    document.getElementById("years_with_illness").value =
      sessionStorage.getItem("yearsWithIllness");
  } catch (error) {
    return "Error Populating UpdatedPatient Details";
  }
}
populateUpdatedDetails();

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
