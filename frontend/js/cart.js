document.addEventListener("DOMContentLoaded", function () {
  const cartContent = document.getElementById("cart");

  async function cart() {
    try {
      const response = await fetch(
        `htp://localhost:3000/kit/getfavouritekit/${sessionStorage.getItem(
          "email"
        )}`
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        const kitContainer = document.getElementById("cart");

        if (data && typeof Array) {
          if (data && data.length > 0) {
            data.forEach((kit) => {
              sessionStorage.setItem("kit_id", kit.kit_id);
              // const kit_id = sessionStorage.getItem("kit_id");
              // console.log(kit_id);
              const kitHTML = `
              <div class="frameKit"  id="seedetails">
              <div class="kits">
              <div class = "kitImage"><img src="${kit.image_url}"/></div>
              <div class = "kitContent">  
              <div class="kitTag">
                    <h1>${kit.kit_name}</h1>
                    <p class="amount">${kit.price}</p>
                  </div>
                    <p class="description">${kit.description}</p>
                    <div class="price">
                      <a ><button id="seedetails" ">Remove Kit</button></a>
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
            // kitContainer.style.gap = "15px";
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

  cart();
});
