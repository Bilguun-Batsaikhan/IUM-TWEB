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
        const ID = await fetchCompetitionID('/retrieveCompetitionID', country, competitionName);
        console.log('ID ' + JSON.stringify(ID, null, 2));
        const games = await fetchGamesTable(ID);
        console.log(JSON.stringify(games, null, 2));
        displayGamesData(games, 10);
    };
});

function init() {
    console.log('init()');
    const competitionNames = document.getElementsByClassName('competition-name');
    
}

//fetch competition ID for given country and competition name
async function fetchCompetitionID(url, country, competitionName) {
    try {
        const response = await axios.post(url, {country_name: country, name: competitionName});
        return response.data; // assuming the ID is in the response data
    } catch (error) {
        console.error("Error fetching competition ID:", error);
        // Handle the error appropriately
    }
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

// function sendAxiosQuery(url, queryParameter) {
//     axios.post(url, {club_id: clubId
//     })
//         .then(function (dataR) {
//             var clubData = dataR.data.clubValutation;
//             if(!clubData)
//                 window.location.href = '/error';
//             console.log(clubData);
//             fillHTML(clubData);
//         })
//         .catch(function (error) {
//             alert(JSON.stringify(error));
//         });
// }

//fetch games table data for given competition ID
async function fetchGamesTable(competition_id) {
    try {
        const response = await axios.post('/retrieveGames', { competition_id: competition_id });
        const games = response.data;
        console.log('Games:', games);
        return games;
    } catch (error) {
        console.log('Error fetching games data for ' + competition_id + ':', error);
    } finally {
        console.log('Finished request for ' + competition_id);
    }
}

//displays the games table for give games table
// displays the games table for given games data
function displayGamesData(gamesData, limit) {
    const tableBody = document.getElementById('competition-table-body');
    const gamesToDisplay = gamesData.games.result.slice(0, limit);

    gamesToDisplay.forEach(game => {
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td>${game.home_club_name}</td>
            <td>${game.away_club_name}</td>
            <td>${game.home_club_goals}</td>
            <td>${game.away_club_goals}</td>
            <td>${new Date(game.date).toLocaleDateString()}</td>
            <td>${game.stadium}</td>
        `;
    });
}



//fetches competition names from SpringBoot then populates the dropdown menu 'competition'
function fetchCompetitionNames(country, ul, li) {
    return axios.post('/competitionNames', { country: country })
                    .then(function (response) {
                        const countryData = response.data;
                        countryData.countryData.forEach(data => {
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