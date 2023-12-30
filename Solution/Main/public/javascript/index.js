document.addEventListener('DOMContentLoaded', function () {
    // Fetch countries at the time of page load
    fetchCountries();
});

function init() {
    const buttonForm = document.getElementById("submitForm")
    const buttonSignUp = document.getElementById("signUp")
    buttonSignUp.addEventListener('click', function (){
        window.location.href =
    })
}

function fetchCountries() {
    axios.get('http://localhost:8082/competitions/countries')
        .then(function (response) {
            const countries = response.data;
            const dropDownCountry = document.getElementById("country");
            countries.forEach(country => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.textContent = country;
                a.className = 'dropdown-item';
                a.href = '#';
                li.appendChild(a);
                dropDownCountry.appendChild(li);
            });
        })
        .catch(function (error) {
            console.log('Error fetching countries ' + error);
        });
}
