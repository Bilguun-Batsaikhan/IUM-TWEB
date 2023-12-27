document.addEventListener('DOMContentLoaded', function () {
    // Fetch countries at the time of page load
    fetchCountries();
});

function init() {
    const buttonForm = document.getElementById("submitForm")
    
}
/*
function fetchCountries() {
    axios.get('/competitions/countries')
        .then(function (response) {
            const countries = response.data;
            const select = document.getElementById("country");
            countries.forEach(country => {
                const option = document.createElement("option");
                option.value = country.id;
                option.text = country.name;
                select.appendChild(option);
            });
        }
}
*/