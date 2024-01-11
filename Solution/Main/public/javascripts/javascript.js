function init() {
    const form = document.getElementById("form");
    form.addEventListener('submit', submitForm);
}

function submitForm(event) {
    const nickname = document.getElementById('nickname').value;
    const resultControl = controlInfo(nickname);
    if (!resultControl) {
        alert("Nickname or password are wrong. Please check them");
    } else {
        const now = new Date();
        const item = {
            nickname: nickname,
            timestamp: now.getTime(), // Ottiene il timestamp corrente in millisecondi
        };
        localStorage.setItem('nicknameData', JSON.stringify(item));
        document.getElementById("form").submit();
    }
}

function controlInfo(nickname) {
    const password = document.getElementById('password').value;
    const minLength = 6;
    const maxLength = 15;

    if(password === '' || nickname === '')
        return false;

    if(nickname.lenght > 15)
        return false
    // Check for minimum and maximum length
    if (password.length < minLength || password.length > maxLength)
        return false;

    // Use a regular expression to check for at least one number
    const numberRegex = /\d/;
    if (!numberRegex.test(password))
        return false;

    // Use a regular expression to check for at least one special character
    const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
    if (!specialCharRegex.test(password))
        return false;

    // If all checks pass, return true
    return true;
}

