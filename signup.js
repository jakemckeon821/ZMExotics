document.getElementById('signup').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    //get form data
    const formData = new FormData(this);

    //perform fetch request to signUp.php
    fetch('signUp.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json()) //expect json response from server
    .then(data => {
        const popup = document.getElementById('popup');
        const popupMessage = document.getElementById('popupMessage');

        if (data.status === 'success') {
            //redirect to home page after 2 seconds
            popupMessage.textContent = 'Sign up successful! Redirecting to home page...';
            popup.style.backgroundColor = '#d4edda'; //success color
            popup.style.color = '#155724'; //success text color
            popup.style.display = 'block'; //show popup

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        } else {
            popupMessage.textContent = data.message; //show error message
            popup.style.backgroundColor = '#f8d7da'; //error color
            popup.style.color = '#721c24'; //error text color
            popup.style.display = 'block'; //show popup
        }
    })
    .catch(error => console.error('Error:', error));
});
