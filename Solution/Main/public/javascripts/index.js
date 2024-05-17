let nickname;

document.addEventListener('DOMContentLoaded', async function () {
    hideDiv();
    const logout = document.getElementById('logoutButton');
    logout.addEventListener('click', function () {
        localStorage.clear();
        hideDiv();
    });
    
    getPopularPlayers();

    try {
        const countries = await sendAxiosIndexQuery('/competition');
        await createDropDownMenu(countries.countries, "country", "#");
        const competitionType = await sendAxiosIndexQuery('/competitionType');
        console.log("competitionType", competitionType.competitionTypes)
        await createDropDownMenu(competitionType.competitionTypes, "competitionType", "/competition-table");
    } catch (error) {
        console.error("Error fetching data:", error);
    }
});

function hideDiv() {
    const itemStr = localStorage.getItem('nicknameData');
    const item = JSON.parse(itemStr);
    const now = new Date();
    let time = now.getTime();

    if (!item || (time - item.timestamp) > 220000) {
        localStorage.removeItem('nicknameData');
        console.log("Nickname not found. Hiding elements.");
        document.getElementById('nickNameLabel').classList.add('d-none');
        document.getElementById('buttonUser').classList.remove('d-none');
    } else {
        console.log("Nickname found. Displaying elements.");
        console.log(item.nickname);
        document.getElementById('buttonUser').classList.add('d-none');
        document.getElementById('nickNameLabel').classList.remove('d-none');
        document.getElementById('nickNameP').innerHTML = item.nickname;
    }
}


async function sendAxiosIndexQuery(url) {
    try {
        const response = await axios.post(url);
        return response.data;
    } catch (error) {
        throw error;
    }
}

//fetches countries from SpringBoot then populates the dropdown menu 'country'
async function createDropDownMenu(data, elementID, url) {
    const dropDownCountry = document.getElementById(elementID);
    console.log("data", data);
    const promises = data.map(async data => {
        const li = document.createElement('li');
        li.className = 'dropdown-submenu';
        const a = document.createElement('a');
        a.textContent = data;
        a.className = 'dropdown-item dropdown-toggle';
        a.href = url;
        li.appendChild(a);
        dropDownCountry.appendChild(li);

        // Only create second dropdown if elementID is 'country'
        if(elementID === "country") {
            console.log('Doing the second request to SpringBoot');
            const ul = document.createElement('ul');
            ul.className = 'dropdown-menu';
            li.appendChild(ul);
            // Fetch second level data for this country
            await fetchCompetitionNames(data, ul, li);
        }
    });

    // Wait for all promises to resolve
    await Promise.all(promises);
}



//fetches competition names from SpringBoot then populates the dropdown menu 'competition'
function fetchCompetitionNames(country, ul, li) {
    return axios.post('/competitionNames', { country: country })
                    .then(function (response) {
                        let countryData = response.data;
                        countryData.countryData.forEach(data => {
                            const li2 = document.createElement('li');
                            const a2 = document.createElement('a');
                            a2.textContent = data;
                            a2.className = 'dropdown-item competition-name';
                            a2.href = '/competition-table?competition=' + encodeURIComponent(data) + '&country=' + encodeURIComponent(country);
                            li2.appendChild(a2);
                            ul.appendChild(li2);
                        });
                    })
                    .catch(function (error) {
                        console.log('Error fetching country data for ' + country + ':', error);
                    })
                    .finally(function () {
                        //console.log('Finished request for ' + country);
                    });
}

function goLogin(){
    window.location.href = "/login";
}

function getPopularPlayers(){
    console.log("J");
    try {
        const popPlayers = sendAxiosIndexQuery('/getpopularplayers');
        //await createDropDownMenu(countries.countries, "country", "#");
        //const competitionType = await sendAxiosIndexQuery('/competitionType');
        console.log("Popular Players: "+ popPlayers)
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
//export {fetchCountries, fetchCompetitionNames};