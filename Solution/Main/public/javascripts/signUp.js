let errorStringFrist;
let errorStringSecond;

function init() {

    document.getElementById("first").style.display = "block";
    document.getElementById("second").style.display = "none";
    document.getElementById("third").style.display = "none";
    const passwordInput = document.getElementById('password');
    const passwordCriteria = document.getElementById('password-criteria');

    passwordInput.addEventListener('focus', () => {
        console.log('Focus event triggered');
        passwordCriteria.classList.remove('hidden');
    });

    passwordInput.addEventListener('blur', () => {
        console.log('Blur event triggered');
        setTimeout(() => {
            passwordCriteria.classList.add('hidden');
        }, 200);
    });
}
function changeFirstToSecond(){
    let result = validateFirstBlock();
    if (result)
        showSecondBlock();
    else
        alert(errorStringFrist);
    event.preventDefault();
}

function backToLogin(){
    window.location.href = "/login";
}

function validateFirstBlock() {
    let username = document.getElementById('nickname').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('correctPassword').value;

    if (nickname === '' || email === '' || password === '' || confirmPassword === '') {
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

function signUpFirst(){
    document.getElementById("first").style.display = "block";
    document.getElementById("second").style.display = "none";
    event.preventDefault();
}

function showSecondBlock() {
    document.getElementById('first').style.display = 'none';
    document.getElementById('second').style.display = 'block';
    event.preventDefault();
}

function validateSecondBlock(){
    let city = document.getElementById('city').value;
    let nation = document.getElementById('nation').value;
    let address = document.getElementById('address').value;
    let phoneNumber = document.getElementById('phone').value;

    if (city === '' || nation === '' || address === '' || phoneNumber === '') {
        errorStringSecond = "Please, fill all the fields"
        return false;
    }

    if (!(/^\d+$/.test(phoneNumber) || /^\+\d{1,2} \d+$/.test(phoneNumber))){
        errorStringFrist = 'The field Telephone Number must contains only numbers.';
        return false;
    }
}

function congrats()
{
    document.getElementById("third").style.display = "block";
    document.getElementById("second").style.display = "none";
    document.getElementById("signAlternative").style.display = "none";
    event.preventDefault();
    const nickname = document.getElementById('nickname').value;
    const now = new Date();
    const item = {
        nickname: nickname,
        timestamp: now.getTime(),
    };
    localStorage.setItem('nicknameData', JSON.stringify(item));
    document.getElementById("form").submit();
}

