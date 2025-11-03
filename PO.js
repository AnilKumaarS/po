   const products = []; // our array

    function addProduct() {
        const input = document.getElementById("productInput");
        const productName = input.value.trim();

        if (productName === "") {
            alert("Please enter a product name!");
            return;
        }

        // Add to array
        products.push(productName);

        // Update UI
        renderList();

        // Clear input
        input.value = "";

        console.log(products); // 👈 background array
    }

    function removeProduct(index) {
        products.splice(index, 1);
        renderList();
    }

    function renderList() {
        const list = document.getElementById("productList");
        list.innerHTML = "";

        products.forEach((product, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
  ${product}
  <button class="remove-btn" onclick="removeProduct(${index})">X</button>
`;
            list.appendChild(li);
        });
    }

function sendMail() {
  const scac = document.getElementById("SCAC").value;
  const email = document.getElementById("email").value;
  const fc = document.getElementById("FC").value;
  const errorType = document.getElementById("error").value;
  const fileInput = document.getElementById("screenshot");
  const file = fileInput.files[0];

  // Validation
  if (!scac || !email || !fc || products.length === 0) {
    alert("⚠️ Please fill in all required fields and add at least one PO.");
    return;
  }

  // Read file as Base64 if exists
  if (file) {
    const reader = new FileReader();
    reader.onload = function () {
      sendEmailJS(reader.result);
    };
    reader.readAsDataURL(file);
  } else {
    sendEmailJS(); // no file
  }

  function sendEmailJS(base64File) {
    const templateParams = {
      SCAC: scac,
      email: email,
      FC: fc,
      PO: products.join(", "),
      error: errorType,
      attachment: base64File || "",
    };

    // ⚙️ Replace with your actual IDs from EmailJS
    emailjs
      .send("service_34xfuln", "template_knjo1ey", templateParams)
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
          alert("✅ Email sent successfully!");

          // Clear form and array
          document.querySelector("form").reset();
          products.length = 0;
          renderList();
        },
        function (error) {
          console.error("FAILED...", error);
          alert("❌ Failed to send email. Please check console for details.");
        }
      );
  }
}
     