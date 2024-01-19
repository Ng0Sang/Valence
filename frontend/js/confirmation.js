const userId = sessionStorage.getItem("user_id");
// const doctorName = sessionStorage.getItem("name");

// const name = document.getElementById("name").value;

function seeDetails(event) {
  if (userId) {
    event.preventDefault();

    const modalcontainer = document.querySelector(".modal");
    const overlay = document.querySelector(".overlay");
    const closeButtons = document.querySelectorAll(".closebutton");

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

    openmodal();
  } else {
    alert("Hello Dear, you must have an account to proceed here");
  }
}

const verifyDoctor = document.getElementById("verifyDoctor");

verifyDoctor.addEventListener("submit", async (event) => {
  event.preventDefault();

  const doctor_name = document.getElementById("name").value;
  const doctor_specialty = document.getElementById("specialty").value;
  const doctorImage = document.getElementById("doctorImage").files[0];
  const other_qualifications_link = document.getElementById(
    "other_qualifications"
  ).value;

  const formData = new FormData();
  formData.append("name", doctor_name);
  formData.append("specialty", doctor_specialty);
  formData.append("doctorImage", doctorImage);
  formData.append("other_qualifications", other_qualifications_link);

  for (const [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }

  console.log(
    doctor_name,
    doctor_specialty,
    doctorImage,
    other_qualifications_link
  );

  console.log(formData);
  // const data = {
  //   name,
  //   specialty,
  //   doctorImage,
  //   other_qualifications,
  // };
  // console.log(data);

  try {
    const response = await fetch(`http://localhost:3000/doctor/verifydoctor`, {
      method: "POST",
      body: formData,
    });

    if (response.status === 201) {
      alert("Your  Details stored successfully.");
      window.location = "../views/dashboard.html";
    } else {
      alert("There was an Error storing your details.");
    }
  } catch (error) {
    console.log(error);
    console.error("An error occurred.", error);
  }
});
