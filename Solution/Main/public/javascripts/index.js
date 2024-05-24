let nickname;

document.addEventListener('DOMContentLoaded', async function () {
    hideDiv();
    //X ALEX1: ho commentato temporaneamente finchè non viene reinserito il pulsante di logout
    /*
    const logout = document.getElementById('logoutButton');
    logout.addEventListener('click', function () {
        localStorage.clear();
        hideDiv();
    });
    */

    // Funzione che chiama getPopularPlayers
    callGetPopularPlayers()

    try {
        const countries = await sendAxiosIndexQuery('/competition');
        await createDropDownMenu(countries.countries, "country", "#");
        const competitionType = await sendAxiosIndexQuery('/competitionType');
        console.log("competitionType", competitionType.competitionTypes)
        await createDropDownMenu(competitionType.competitionTypes, "competitionType", "#");
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
        //X ALEX 2: ho commentato momentaneamente finchè non viene rimesso il label per il nickname
        //document.getElementById('nickNameLabel').classList.add('d-none');
        //document.getElementById('buttonUser').classList.remove('d-none');
    } else {
        console.log("Nickname found. Displaying elements.");
        console.log(item.nickname);
        //document.getElementById('buttonUser').classList.add('d-none');
        //document.getElementById('nickNameLabel').classList.remove('d-none');
        //document.getElementById('nickNameP').innerHTML = item.nickname;
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

//fetches countries from SpringBoot then populates the dropdown menu 'country' and 'competitionType'
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
        // if(elementID === "country") {
            console.log('Doing the second request to SpringBoot');
            const ul = document.createElement('ul');
            ul.className = 'dropdown-menu';
            li.appendChild(ul);
            // Fetch second level data for this country
            await fetchCompetitionNames(data, ul, li, elementID);
        // }
        // else if(elementID === "competitionType") {
        //     console.log('Doing the second request to SpringBoot');
        //     const ul = document.createElement('ul');
        //     ul.className = 'dropdown-menu';
        //     li.appendChild(ul);
        //     // Fetch second level data for this competition Type
        //     await fetchCompetitionNames(data, ul, li);
        // }
    });

    // Wait for all promises to resolve
    await Promise.all(promises);
}



//fetches competition names from SpringBoot then populates the dropdown menu 'competitions -> country -> competitionName
function fetchCompetitionNames(data, ul, li, elementID) {
    let requestData = {};
    if (elementID === "country") {
        requestData = { type: "country", value: data };
    } else if (elementID === "competitionType") {
        requestData = { type: "competitionType", value: data };
    }
    return axios.post('/competitionNames', requestData)
        .then(function (response) {
            let responseData = response.data;
            let dataToUse = responseData.data;
            console.log('dataToUse', dataToUse)
            dataToUse.forEach(item => {
                const li2 = document.createElement('li');
                const a2 = document.createElement('a');
                a2.textContent = item;
                a2.className = 'dropdown-item competition-name';

                let url;
                let urlParams = new URLSearchParams();
                urlParams.append('competition', item);
                if (requestData.type === 'country') {
                    urlParams.append('country', requestData.value);
                    url = '/competition-table?' + urlParams.toString();
                } else if (requestData.type === 'competitionType') {
                    urlParams.append('competitionType', requestData.value);
                    url = '/competition-league?' + urlParams.toString();
                }

                a2.href = url;
                li2.appendChild(a2);
                ul.appendChild(li2);
            });
        })
        .catch(function (error) {
            console.log('Error fetching data:', error);
        })
        .finally(function () {
            //console.log('Finished request');
        });
}


// fetch competition names for given competition type (sub) then populates the menu 'competions -> competitionType -> competitionName
// function fetchCompetitionNamesByType(competitionType, ul, li) {
//     return axios.post('/competitionNames', { competitionType: competitionType })
//                     .then(function (response) {
//                         let competitionTypeData = response.data;
//                         competitionTypeData.competitionTypeData.forEach(data => {
//                             const li2 = document.createElement('li');
//                             const a2 = document.createElement('a');
//                             a2.textContent = data;
//                             a2.className = 'dropdown-item competition-name';
//                             a2.href = '/competition-league?competition=' + encodeURIComponent(data) + '&competitionType=' + encodeURIComponent(competitionType);
//                             li2.appendChild(a2);
//                             ul.appendChild(li2);
//                         });
//                     })
//                     .catch(function (error) {
//                         console.log('Error fetching competition type data for ' + competitionType + ':', error);
//                     })
//                     .finally(function () {
//                         //console.log('Finished request for ' + competitionType);
//                     });
// }


function goLogin(){
    window.location.href = "/login";
}


function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.style.display = navLinks.style.display === 'block' ? 'none' : 'block';
}


function callGetPopularPlayers() {
    if (typeof getPopularPlayers === 'function') {
        getPopularPlayers();
    } else {
        //console.error("getPopularPlayers is not defined in this page.");
    }
}

//export {fetchCountries, fetchCompetitionNames};