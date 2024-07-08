document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const firstName = document.getElementById('cust-contact-first-name').value.trim();
    const lastName = document.getElementById('cust-contact-last-name').value.trim();
    const email = document.getElementById('cust-contact-email').value.trim();
    const phone = document.getElementById('cust-contact-phone').value.trim();
    const message = document.getElementById('cust-contact-message').value.trim();
    const successMessageDiv = document.getElementById('successMessage');
    const errorMessageDiv = document.getElementById('errorMessage');
    if (!firstName || !lastName || !email || !phone) {
      showSnackbar('Please fill out all fields except message.');
      return;
    }

    if (!validateEmail(email)) {
      showSnackbar('Please enter a valid email address.');
      return;
    }

    const requestBody = {
     name:`${firstName} ${lastName}`,
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      message: message
    };

    console.log(requestBody);

    // Display loading message
    showSnackbar('Sending message...');
    successMessageDiv.textContent = ''; // Clear previous success message
    errorMessageDiv.textContent = '';
    fetch('https://www.privyr.com/api/v1/incoming-leads/0vZfjMQw/bdlzoFbu#generic-webhook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
    .then(response => {
      if (!response.ok) {
        errorMessageDiv.textContent= 'Error Sending-Network response was not ok'
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      showSnackbar('Message sent successfully!');
      successMessageDiv.textContent = 'Message sent successfully!';
    })
    .catch(error => {
      errorMessageDiv.textContent= 'Error Sending-bjb';
      showSnackbar('Error sending message: ' + error.message);
    });
  });

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function showSnackbar(message) {
    const snackbar = document.getElementById('snackbar');
    snackbar.textContent = message;
    snackbar.className = 'show';
    setTimeout(() => { snackbar.className = snackbar.className.replace('show', ''); }, 3000);
  }