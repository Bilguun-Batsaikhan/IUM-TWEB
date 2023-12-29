document.addEventListener('DOMContentLoaded', function () {
    // Fetch countries at the time of page load
    fetchCountries();
});

function init() {
    const buttonForm = document.getElementById("submitForm")

}

function fetchCountries() {
    axios.get('http://localhost:8082/competitions/countries')
        .then(function (response) {
            const countries = response.data;
            const dropDownCountry = document.getElementById("country");
            countries.forEach(country => {
                const li = document.createElement('li');
                li.className = 'dropdown-submenu';
                const a = document.createElement('a');
                a.textContent = country;
                a.className = 'dropdown-item dropdown-toggle';
                a.href = '#';
                li.appendChild(a);
                const ul = document.createElement('ul');
                ul.className = 'dropdown-menu';
                li.appendChild(ul);
                dropDownCountry.appendChild(li);
                console.log('Doing the second request to SpringBoot')
                // Fetch second level data for this country
                axios.post('http://localhost:8082/competitions/countriesData', { country: country })
                    .then(function (response) {
                        const countryData = response.data;
                        console.log('Received data for ' + country + ':', countryData);
                        countryData.forEach(data => {
                            const li2 = document.createElement('li');
                            const a2 = document.createElement('a');
                            a2.textContent = data;
                            a2.className = 'dropdown-item';
                            a2.href = '#';
                            li2.appendChild(a2);
                            ul.appendChild(li2);
                        });
                    })
                    .catch(function (error) {
                        console.log('Error fetching country data for ' + country + ':', error);
                    })
                    .finally(function () {
                        console.log('Finished request for ' + country); // Add this line
                    });
            });
        })
        .catch(function (error) {
            console.log('Error fetching countries ' + error);
        });
}
