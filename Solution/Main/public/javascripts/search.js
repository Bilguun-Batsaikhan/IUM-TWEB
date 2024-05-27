document.addEventListener('DOMContentLoaded', async function () {
    // Get the competition name from the query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');

    if (!searchQuery) {
        window.location.href = '/error';
        return;
    }

    // Get the table headers
    const clubHead = document.getElementById('clubHead');
    const playerHead = document.getElementById('playerHead');

    // Hide headers by default
    clubHead.style.display = 'none';
    playerHead.style.display = 'none';

    // Fetch data
    let playerData = await fetchPlayerData(searchQuery);
    let clubData = await fetchClubData(searchQuery);

    // Display headers and render tables if data is available
    if (clubData && clubData.clubsData && clubData.clubsData.length > 0) {
        clubHead.style.display = 'table-header-group';
        renderClubsTable(clubData);
    }
    if (playerData && playerData.playersData && playerData.playersData.length > 0) {
        playerHead.style.display = 'table-header-group';
        renderPlayersTable(playerData);
    }
});


function fetchPlayerData(searchQuery) {
    return axios.post('/search/searchPlayer', { search: searchQuery })
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log('Error fetching player data:', error);
            return [];
        });
}

function fetchClubData(searchQuery) {
    return axios.post('/search/searchClub', { search: searchQuery })
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log('Error fetching club data:', error);
            return { clubsData: [] };
        });
}

// function test() {
//     const table = document.getElementById('players-table-container');
//     let test = document.createElement('h1');
//     test.textContent = 'Hello World';
//     table.appendChild(test);
// }

function renderPlayersTable(playerData) {
    const tableBody = document.getElementById('players-table-container');
    let playerD = playerData.playersData;

    tableBody.innerHTML = '';

    // Iterate over the player data and create table rows
    playerD.forEach(function (player) {
        // Split the player string into an array of [name, id, image]
        const playerInfo = player.split(',');
        const [name, id, imageUrl] = playerInfo;

        const row = tableBody.insertRow();
        row.classList.add('text-center');

        // Create a cell for the name
        const nameCell = row.insertCell();

        // Create an anchor element
        const nameLink = document.createElement('a');
        nameLink.href = "/valutation/player?player_id=" + id; // Imposta qui l'URL desiderato
        nameLink.textContent = name;

        // Append the anchor to the name cell
        nameCell.appendChild(nameLink);

        // Insert cells for id and image
        row.insertCell().textContent = id;
        const imgCell = row.insertCell();
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = name;
        img.classList.add('mx-auto', 'd-block');
        img.style.width = '50px';
        imgCell.appendChild(img);
    });
}

function renderClubsTable(clubData) {
    const tableBody = document.getElementById('clubs-table-container');
    tableBody.innerHTML = '';
    const clubsArray = clubData.clubsData;

    clubsArray.forEach(function (club) {
        const row = tableBody.insertRow();
        row.classList.add('text-center');

        const imgCell = row.insertCell(0);
        const img = document.createElement('img');
        img.src = "https://tmssl.akamaized.net/images/wappen/head/" + club.club_id + ".png?";
        img.alt = club.name;
        img.classList.add('mx-auto', 'd-block');
        img.style.width = '50px';
        imgCell.appendChild(img);

        const nameCell = row.insertCell();
        const nameLink = document.createElement('a');
        nameLink.href = "/valutation/club?club_id=" + club.club_id;
        nameLink.textContent = club.name;
        nameCell.appendChild(nameLink);
        row.insertCell().textContent = club.club_id;
    });
}



