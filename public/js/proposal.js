const form = document.getElementById("queryForm");

form.addEventListener("submit", async (event) => {
  if (!form.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
  }
  form.classList.add("was-validated");
  //req-res
  event.preventDefault();
  const requirements = document.getElementById("requirements");
  if (!requirements.value) {
    return;
  }
  //valid req

  const loading = document.getElementById("loading");
  loading.style.display = "block";
  try {
    const response = await fetch("/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ requirements: requirements }),
    });
    requirements.value = "";
    const data = await response.json();

    const proposalHead = document.getElementById("proposal-head");
    const proposal = document.getElementById("proposal");
    loading.style.display = "none";
    proposal.innerText = data;
    proposalHead.style.display = "block";
    proposal.style.display = "block ";

    const download = document.getElementById("downloadPDF");
    download.style.display = "inline-block";

    const mailOption = document.getElementById("send-mail");
    mailOption.style.display = "block";
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("proposal").innerText =
      "An error occurred: " + error.message;
  }
});

document
  .getElementById("send-mail")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const mailid = document.getElementById("mailid").value;
    //invalid req
    if (!mailid) {
      return alert("Enter your email");
    }
    //valid req
    try {
      const response = await fetch("/mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mailid }),
      });

      const result = await response.json();

      if (result.success) {
        alert("Email sent successfully!");
      } else {
        alert("Failed to send email: " + result.error);
      }
    } catch (error) {
      alert("Error sending email: " + error.message);
    }
  });
