document.addEventListener('DOMContentLoaded', function () {
    // Get the competition name from the query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const competitionName = urlParams.get('competition');
    console.log('competitionName ' + competitionName);

    const country = urlParams.get('country')
    console.log('country ' + country);
    // Fetch the competition data and display it in a table
    //fetchCompetitionData(competitionName).then(displayCompetitionData);

    // Fetch countries at the time of page loads
    fetchCountries().then(init);

    if (!country || !competitionName) {
        window.location.href = '/error';
    } else {
        // I'll add this part later
        // sendAxiosQuery('/retrieveCompetitionID', country, competitionName);
    };
});

function init() {
    console.log('init()');
    const competitionNames = document.getElementsByClassName('competition-name');
    
    Array.from(competitionNames).forEach(competitionName => {
        competitionName.addEventListener('click', function (event) {
            event.preventDefault();
            console.log('Clicked on ' + competitionName.textContent);

            // Navigate to competition-table.html with the competition name as a query parameter
            window.location.href = '/competition-table.html?competition=' + encodeURIComponent(competitionName.textContent);
        });
    });
}

//fetch competition ID for given country and competition name
function sendAxiosQuery(url, country, competitionName) {
    axios.post(url, {country_name: country, name: competitionName})
        .then(function (dataR) {
            var competitionID = dataR.data;
            console.log(competitionID)
            if(!competitionID)
                window.location.href = '/error';
                console.log(competitionID);
        })
        .catch(function (error) {
            alert(JSON.stringify(error));
        });
}

//fetches countries from SpringBoot then populates the dropdown menu 'country'
function fetchCountries() {
    return axios.get('http://localhost:8082/competitions/countries')
        .then(function (response) {
            const countries = response.data;
            const dropDownCountry = document.getElementById("country");
            const promises = countries.map(country => {
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
                return fetchCompetitionNames(country, ul, li);
            });
            return Promise.all(promises);
        })
        .catch(function (error) {
            console.log('Error fetching countries ' + error);
        });
}

//fetches competition names from SpringBoot then populates the dropdown menu 'competition'
function fetchCompetitionNames(country, ul, li) {
    return axios.post('http://localhost:8082/competitions/countriesData', { country: country })
                    .then(function (response) {
                        const countryData = response.data;
                        countryData.forEach(data => {
                            const li2 = document.createElement('li');
                            const a2 = document.createElement('a');
                            a2.textContent = data;
                            a2.className = 'dropdown-item competition-name';
                            a2.href = '#';
                            li2.appendChild(a2);
                            ul.appendChild(li2);
                        });
                    })
                    .catch(function (error) {
                        console.log('Error fetching country data for ' + country + ':', error);
                    })
                    .finally(function () {
                        console.log('Finished request for ' + country);
                    });
}