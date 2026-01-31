// Simulated OTP sending function
function sendOTP(email) {
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
    localStorage.setItem(`otp_${email}`, otp);
    alert(`Your OTP Code: ${otp}`); // Simulate OTP sent via email
}

// Function to register a user
function registerUser() {
    const firstName = document.querySelector('#register .input-field:nth-child(1)').value;
    const lastName = document.querySelector('#register .input-field:nth-child(2)').value;
    const email = document.querySelector('#register .input-field:nth-child(3)').value;
    const password = document.querySelector('#register .input-field:nth-child(4)').value;

    if (!firstName || !lastName || !email || !password) {
        alert('Please fill in all fields!');
        return;
    }

    if (localStorage.getItem(email)) {
        alert('Email already registered!');
        return;
    }

    sendOTP(email); // Send OTP for verification
    const userOTP = prompt("Enter the OTP sent to your email:");
    const storedOTP = localStorage.getItem(`otp_${email}`);

    if (userOTP !== storedOTP) {
        alert("Invalid OTP. Registration failed!");
        return;
    }

    const userData = { firstName, lastName, email, password };
    localStorage.setItem(email, JSON.stringify(userData));
    localStorage.removeItem(`otp_${email}`); // Remove OTP after verification
    alert('Registration successful! Please log in.');
    login();
}

// Function to log in a user
function loginUser() {
    const email = document.querySelector('#login .input-field:nth-child(1)').value;
    const password = document.querySelector('#login .input-field:nth-child(2)').value;
    const rememberMe = document.querySelector('#login-check').checked;

    const userData = JSON.parse(localStorage.getItem(email));

    if (!userData || userData.password !== password) {
        alert('Invalid email or password!');
        return;
    }

    if (rememberMe) {
        localStorage.setItem('loggedInUser', email);
    } else {
        sessionStorage.setItem('loggedInUser', email);
    }

    alert(`Welcome back, ${userData.firstName}!`);
    window.location.href = "swooshpage.html"; // Redirect after login
}

// Check if user is already logged in
function checkLoginStatus() {
    const loggedInUser = localStorage.getItem('loggedInUser') || sessionStorage.getItem('loggedInUser');
    if (loggedInUser) {
        alert(`You are already logged in as ${loggedInUser}`);
        window.location.href = "swooshpage.html";
    }
}

// Logout function
function logoutUser() {
    localStorage.removeItem('loggedInUser');
    sessionStorage.removeItem('loggedInUser');
    alert('You have been logged out.');
    window.location.href = "index.html";
}

// Event listeners for login and signup
window.onload = function () {
    checkLoginStatus();
    document.querySelector('#register .submit').addEventListener('click', registerUser);
    document.querySelector('#login .submit').addEventListener('click', loginUser);
};
