let errorStringFrist;
let errorStringSecond;
let errorStringThird;

function init() {
    // Hide the first div initially
    document.getElementById("first").style.display = "block";

    // Hide the second div initially
    document.getElementById("second").style.display = "none";

    // Hide the third div initially
    document.getElementById("third").style.display = "none";

    // Get the buttons for setting the functions
    const firstButton = document.getElementById("firstButton");
    firstButton.addEventListener('click', changeFirstToSecond);

    const secondButtonPrev = document.getElementById("secondButtonPrev");
    const secondButtonNext = document.getElementById("secondButtonNext");
    secondButtonNext.addEventListener('click', changeSecondToThird);
    secondButtonPrev.addEventListener('click', backToFirst);

    const thirdButtonPrev = document.getElementById("thirdButtonPrev");
    const thirdButtonNext = document.getElementById("send");
    thirdButtonNext.addEventListener('click', send);
    thirdButtonPrev.addEventListener('click', backToSecond);

    event.preventDefault();
}
function changeFirstToSecond(){
    let result = validateFirstBlock();
    if (result)
        showSecondBlock();
    else
        alert(errorStringFrist);
}

function validateFirstBlock() {
    let name = document.getElementById('name').value;
    let surname = document.getElementById('surname').value;
    let telephoneNumber = document.getElementById('telephone_number').value;
    let nation = document.getElementById('nation').value;
    let city = document.getElementById('city').value;
    let address = document.getElementById('address').value;
    let number = document.getElementById('number').value;

    // Effettua il controllo che i campi non siano nulli
    if (name === '' || surname === '' || telephoneNumber === '' || nation === '' || city === '' || address === '' || number === '') {
        errorStringFrist = "Please, fill all the fields"
        return false;
    }
    if (!(/^\d+$/.test(telephoneNumber) || /^\+\d{1,2} \d+$/.test(telephoneNumber))){
        errorStringFrist = 'The field Telephone Number must contains only numbers.';
        return false;
    }
    // Controllo che number contenga solo caratteri numerici
    if (!(/^\d+$/.test(number))) {
        errorStringFrist = 'Ther field Number must contains only numbers.';
        return false;
    }
    return true;
}

function showSecondBlock() {
    document.getElementById('first').style.display = 'none';
    document.getElementById('second').style.display = 'block';
    const activeSegment = document.querySelector('.segment.second');

    for (const element of activeSegment.querySelectorAll('.circle, .label, .line')) {
        if (element.classList.contains('circle'))
            element.style.backgroundColor ='#007bff';
        else if ( element.classList.contains('line')) {
            element.style.color ='#007bff';
            element.style.backgroundColor ='#007bff';
        }
        else
            element.style.color = '#007bff';
    }
    event.preventDefault();
}

function changeSecondToThird(){
    let result = validateSecondBlock();
    if(result)
        showThirdBlock();
    else
        alert(errorStringSecond)
}


function validateSecondBlock(){
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;

    if (email === '' || password === '' || confirmPassword === '') {
        errorStringSecond = "Please, fill all the fields"
        return false;
    }
    if (password !== confirmPassword) {
        errorStringSecond = "The passwords are not equals"
        return false;
    }
    return true;
}



function showThirdBlock() {
    document.getElementById('second').style.display = 'none';
    document.getElementById('third').style.display = 'block';
    const activeSegment = document.querySelector('.segment.third');
    for (const element of activeSegment.querySelectorAll('.circle, .label')) {
        if (element.classList.contains('circle'))
            element.style.backgroundColor ='#007bff';
        else
            element.style.color ='#007bff';
    }
    event.preventDefault();
}

function backToFirst() {
    document.getElementById('second').style.display = 'none';
    document.getElementById('first').style.display = 'block';
    const activeSegment = document.querySelector('.segment.second');

    for (const element of activeSegment.querySelectorAll('.circle, .label, .line')) {
        if (element.classList.contains('circle'))
            element.style.backgroundColor = '#A8A9AD';
        else if ( element.classList.contains('line')) {
            element.style.color = '#A8A9AD';
            element.style.backgroundColor = '#A8A9AD';
        }
        else
            element.style.color = '#A8A9AD';
    }
    event.preventDefault();
}

function send()
{
    let result = validateThirdBlock();
    if (!result)
        alert(errorStringThird);
    else
        document.getElementById("form").submit();
}

function validateThirdBlock()
{
    let nickname = document.getElementById('nickname').value;
    if (nickname === '') {
        errorStringThird = "Please, fill nickname fild"
        return false;
    }
    return true;
}
function backToSecond() {
    document.getElementById("second").style.display = "block";
    document.getElementById("third").style.display = "none";

    const activeSegment = document.querySelector('.segment.third');
    for (const element of activeSegment.querySelectorAll('.circle, .label')) {
        if (element.classList.contains('circle'))
            element.style.backgroundColor ='#A8A9AD';
        else if ( element.classList.contains('line')) {
            element.style.color ='#A8A9AD';
            element.style.backgroundColor ='#A8A9AD';
        }
        else
            element.style.color ='#A8A9AD';
    }
    event.preventDefault();
}

/*function changeFirst(event) {
    document.getElementById("first").style.display = "none";
    document.getElementById("second").style.display = "block";

    const activeSegment = document.querySelector('.segment.second');

    for (const element of activeSegment.querySelectorAll('.circle, .label, .line')) {
        if (element.classList.contains('circle'))
            element.style.backgroundColor = '#007bff'; // Cambia il colore del cerchio in blu
        else if ( element.classList.contains('line')) {
            element.style.color = '#007bff';
            element.style.backgroundColor = '#007bff';// Cambia il colore della label e della line in blu
        }
        else
            element.style.color = '#007bff';
    }

    event.preventDefault();
}
function changeSecond(){
    document.getElementById("second").style.display = "none";
    document.getElementById("third").style.display = "block";

    const activeSegment = document.querySelector('.segment.third');
    for (const element of activeSegment.querySelectorAll('.circle, .label')) {
        if (element.classList.contains('circle'))
            element.style.backgroundColor = '#007bff'; // Cambia il colore del cerchio in blu
        else
            element.style.color = '#007bff';
    }

    event.preventDefault();
}*/