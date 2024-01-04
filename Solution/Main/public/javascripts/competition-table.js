document.addEventListener('DOMContentLoaded', async function () {
    // Get the competition name from the query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const competitionName = urlParams.get('competition');
    console.log('competitionName ' + competitionName);

    const country = urlParams.get('country')
    console.log('country ' + country);
    // Fetch the competition data and display it in a table
    //fetchCompetitionData(competitionName).then(displayCompetitionData);

    try {
        const countries = await sendAxiosQuery('/competition');
        console.log("countries", countries);
        // Further processing or function calls can be done here
        await createCountryMenu(countries);
    } catch (error) {
        console.error("Error fetching countries:", error);
        // Handle the error appropriately
    }

    if (!country || !competitionName) {
        window.location.href = '/error';
    } else {
        // I'll add this part later
        const ID = fetchCompetitionID('/retrieveCompetitionID', country, competitionName);
    };
});

function init() {
    console.log('init()');
    const competitionNames = document.getElementsByClassName('competition-name');
    
    // Array.from(competitionNames).forEach(competitionName => {
    //     competitionName.addEventListener('click', function (event) {
    //         event.preventDefault();
    //         console.log('Clicked on ' + competitionName.textContent);
    //
    //         // Navigate to competition-table.html with the competition name as a query parameter
    //         window.location.href = '/competition-table.html?competition=' + encodeURIComponent(competitionName.textContent);
    //     });
    // });
}

//fetch competition ID for given country and competition name
function fetchCompetitionID(url, country, competitionName) {
    axios.post(url, {country_name: country, name: competitionName})
        .then(function (dataR) {
            var competitionID = dataR.data;
            console.log(competitionID)
            if(!competitionID) {
                window.location.href = '/error';
                console.log(competitionID);
            } else {
                return competitionID;
            }
        })
        .catch(function (error) {
            alert(JSON.stringify(error));
        });
}

async function sendAxiosQuery(url) {
    try {
        const response = await axios.post(url);
        return response.data;
    } catch (error) {
        throw error;
    }
}

//creates the dropdown menu 'country' and populates it with countries
async function createCountryMenu(countries) {
    const countriesArray = countries.countries;
    const dropDownCountry = document.getElementById("country");
    const promises = countriesArray.map(async country => {
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

        console.log('Doing the second request to SpringBoot');
        // Fetch second level data for this country
        await fetchCompetitionNames(country, ul, li);
    });

    // Wait for all promises to resolve
    await Promise.all(promises);
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
                            a2.href = '/competition-table.html?competition=' + encodeURIComponent(data) + '&country=' + encodeURIComponent(country);
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