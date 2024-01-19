const paymentForm = document.getElementById("myform");
paymentForm.addEventListener("submit", payWithPaystack, false);

document.getElementById("email").value = sessionStorage.getItem("email");
document.getElementById("amount").value = "5000";
document.getElementById("name").value = sessionStorage.getItem("name");

function payWithPaystack(e) {
  e.preventDefault();

  let handler = PaystackPop.setup({
    key: "pk_test_74b59d726057c5cafed8f3fdf4b0aee62b281ab7",
    email: document.getElementById("email").value,
    amount: document.getElementById("amount").value * 100,
    ref: "" + Math.floor(Math.random() * 1000000000 + 1),

    onClose: function () {
      alert("Window closed.");
    },
    callback: function (response) {
      let message = "Payment was Successful! Reference: " + response.reference;
      alert(message);
    },
  });

  handler.openIframe();
}
