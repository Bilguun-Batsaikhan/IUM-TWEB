let errorStringFrist;
let errorStringSecond;

function init() {
    // Hide the first div initially
    document.getElementById("first").style.display = "block";

    // Hide the second div initially
    document.getElementById("second").style.display = "none";

    // Get the buttons for setting the functions
    const firstButton = document.getElementById("next");
    firstButton.addEventListener('click', changeFirstToSecond);

    const secondButtonNext = document.getElementById("send");
    secondButtonNext.addEventListener('click', send);
    event.preventDefault();
}
function changeFirstToSecond(){
    let result = validateFirstBlock();
    if (result)
        showSecondBlock();
    else
        alert(errorStringFrist);
}

function backToLogin(){
    window.location.href = "/login";
}

function validateFirstBlock() {
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;

    if (username === '' || email === '' || telephoneNumber === '' || confirmPassword === '') {
        errorStringFrist = "Please, fill all the fields"
        return false;
    }
    let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
        errorStringFrist = "Please enter a valid email address";
        return false;
    }
    const minLength = 8;
    const maxLength = 15;
    if (password.length < minLength && password.length > maxLength) {
        errorStringFrist = "Password must follow criteria for length!";
        return false;
    }
    // Use a regular expression to check for at least one number
    const numberRegex = /\d/;
    if (!numberRegex.test(password)) {
        errorStringFrist = "Password must contain at least one number";
        return false;
    }

    const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
    if (!specialCharRegex.test(password)) {
        errorStringFrist = "Password must contain at least one special character";
        return false;
    }
    if (password !== confirmPassword) {
        errorStringFrist = "The passwords are not equals"
        return false;
    }
    return true;
}

function showSecondBlock() {
    document.getElementById('first').style.display = 'none';
    document.getElementById('second').style.display = 'block';
    event.preventDefault();
}

function validateSecondBlock(){
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;

    if (email === '' || password === '' || confirmPassword === '') {
        errorStringSecond = "Please, fill all the fields"
        return false;
    }

}


function backToFirst() {
    document.getElementById('second').style.display = 'none';
    document.getElementById('first').style.display = 'block';

    event.preventDefault();
}

function send()
{
    let result = validateThirdBlock();
    if (!result)
        alert(errorStringThird);
    else {
        const nickname = document.getElementById('nickname').value;
        const now = new Date();
        const item = {
            nickname: nickname,
            timestamp: now.getTime(), // Ottiene il timestamp corrente in millisecondi
        };
        localStorage.setItem('nicknameData', JSON.stringify(item));
        document.getElementById("form").submit();
    }
}

function validateThirdBlock()
{
    let nickname = document.getElementById('nickname').value;
    if (nickname === '') {
        errorStringThird = "Please, fill nickname fild"
        return false;
    }
    if(nickname.lenght > 15){
        errorStringThird = "Max length of nickname is 15"
        return false;}
    return true;
}
