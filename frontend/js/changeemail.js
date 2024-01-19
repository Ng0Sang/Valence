const email = sessionStorage.getItem("email");
document.getElementById("oldEmail").value = email;

const changeEmail = document.getElementById("changeEmail");
changeEmail.addEventListener("submit", (event) => {
  event.preventDefault();
  if (inputValidation()) {
    changeEmail();
  }

  async function inputValidation() {
    const newEmail = document.getElementById("newEmail").value;
    const newEmailError = document.getElementById("newEmailError");
    if (newEmail === "") {
      newEmailError.innerHTML = `Enter new Email.`;
      newEmailError.classList.add("error");
    }
  }

  async function changeEmail() {
    const user_id = sessionStorage.getItem("user_id");
    console.log(user_id);

    try {
      const email = document.getElementById("newEmail").value;
      const data = { email };

      const response = await fetch(
        `http://localhost:3000/user/updateemail/${user_id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      console.log(result);

      if (response.status === 200) {
        alert(
          "Your Email was changed successfully, it will be updated on your profile soon."
        );
        window.location = "../views/login.html";
      } else {
        alert("We couldnt change your Email");
      }
    } catch (error) {
      console.log(error, "There was an error");
    }
  }
});

async function logOut() {
  window.location = "../views/patient.html";
}
