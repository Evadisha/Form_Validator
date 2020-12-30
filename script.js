const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// Show error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = "form-control error";
    const small = formControl.querySelector("small");
    if (message[8] == 2)
        small.innerText = "Password is required";
    else
        small.innerText = message;
}

// Show success message
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
}

// Check if username is valid or not
function checkUsername(input) {
    const userReg = /^[0-9a-zA-Z_@.]+$/;
    if (userReg.test(input.value))
        showSuccess(input);
    else
        showError(input, "Username should only contain alphabets, digits and some special characters(_, @,.)");
}

// Check if email is valid or not
function checkEmail(input) {
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(input.value))
        showSuccess(input);
    else
        showError(input, "Email is not valid.");
}

// Check the required condition for inputs
function checkRequired(inputArr) {
    inputArr.forEach(function(input) {
        if (input.value == "")
            showError(input, `${toTitleCase(input.id)} is required.`);
        else
            showSuccess(input);
    });
}

// Check Length of inputs
function checkLength(input, min, max) {
    if (input.value.length < min)
        showError(input, `${toTitleCase(input.id)} should have atleast ${min} characters.`);
    else if (input.value.length > max)
        showError(input, `${toTitleCase(input.id)} should have not more than ${max} characters.`);
    else
        showSuccess(input);
}

// Check if password match
function checkPasswordMatch(input1, input2) {
    if (input1 !== input2)
        showError(input2, `Both ${toTitleCase(input1.id)}s do not match.`);
}

// To change the str into title case
function toTitleCase(str) {
    return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
}

// Add event listener
form.addEventListener('submit', function(e) {
    e.preventDefault();



    checkRequired([username, email, password, password2]);
    checkLength(username, 4, 15);
    checkUsername(username);
    checkLength(password, 8, 25);
    checkEmail(email);
    checkPasswordMatch(password, password2);

});