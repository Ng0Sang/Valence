document.addEventListener("DOMContentLoaded", function () {
  // const cartContent = document.getElementById("cart");

  async function bookedDoctors() {
    const user_id = sessionStorage.getItem("user_id");
    try {
      const response = await fetch(
        `http://localhost:3000/doctor/getbookeddoctor/${user_id}`
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        const doctorContainer = document.getElementById("booked");

        if (data && typeof Array) {
          if (data && data.length > 0) {
            data.forEach((doctor) => {
              const doctorHTML = `<div class="doctors">
                <div class = "engolf">
                <img src="${doctor.image_url}" />
                <div class="nameAndSpecialty">
                 <p class="name"> ${doctor.name}</p>
                 <p class="specialization">${doctor.specialty}</p>
                 </div>
                 </div>
                 </div>`;
              console.log(doctorHTML);
              console.log(doctorContainer);
              doctorContainer.insertAdjacentHTML("beforeend", doctorHTML);
            });
          } else {
            console.error("Invalid data structure received from the server.");
          }
        } else {
          console.error(`Error fetching Doctor: ${response.status}`);
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  bookedDoctors();
});
