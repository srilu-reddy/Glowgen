function sendmail() {
    let params = {
        name: document.getElementById("fname").value,
        email: document.getElementById("email").value
    };

    console.log("Sending email with params:", params);

    emailjs.send("service_o5x3tlv", "template_ruejio8", params)
    .then(
        function(response) {
            console.log("SUCCESS!", response.status, response.text);
            alert("Email sent successfully!");
        },
        function(error) {
            console.error("FAILED...", error);
            alert("Failed to send email. Check the console for details.");
        }
    );
}
