const addKitsForm = document.getElementById("addKit");

addKitsForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  // addKits();

  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const KitImage = document.getElementById("kitImage").files[0];
  const description = document.getElementById("description").value;

  const formData = new FormData();
  formData.append("name", name);
  formData.append("price", price);
  formData.append("kitImage", KitImage);
  formData.append("description", description);

  // console.dir(formData);

  for (const [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }

  // alert(name, price, KitImage, description);

  console.log(formData);
  // const data = {
  //   name,
  //   price,
  //   KitImage,
  //   description,
  // };
  // console.log(data);

  try {
    const response = await fetch("http://localhost:3000/kit/createkit/", {
      method: "POST",
      body: formData,
    });

    if (response.status === 201) {
      alert("Kit added successfully.");
    } else {
      alert("Error adding kit.");
    }
  } catch (error) {
    console.log(error);
    console.error("An error occurred.", error);
  }
});
