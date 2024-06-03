let currentPage = 1;
const playersPerPage = 5;
let totalPages = 0;

function init() {
    /* The code for obtaining URL parameters has been adapted from:
     https://www.sitepoint.com/get-url-parameters-with-javascript/
    */
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const clubId = urlParams.get('club_id')
    if (!clubId || isNaN(clubId) || !/^\d+$/.test(clubId)) {
        window.location.href = '/error';
    } else {
        //console.log('club_id:', parseInt(clubId));
        sendAxiosQuery('/valutation/club', clubId);
    }
}

// Fetch club data for given club ID
function sendAxiosQuery(url, clubId) {
    axios.post(url, {
        club_id: clubId
    })
        .then(function (dataR) {
            let clubData = dataR.data.clubData;
            let playersData = dataR.data.playersData;
            if (!clubData)
                window.location.href = '/error';
            //console.log(clubData);
            fillHTML(clubData, playersData);
        })
        .catch(function (error) {
            (JSON.stringify(error));
        });
}

function populatePlayersTable(playersData) {
    let tableBody = document.getElementById('players-table-body');
    playersData.forEach(function(player) {
        let imageUrl = player.imageUrl ? '<img src="' + player.imageUrl + '" alt="Player Image" style="width:50px; height:auto;">' : '';
        let name = player.name ? player.name : '';
        let dateOfBirth = player.dateOfBirth ? player.dateOfBirth : '';
        dateOfBirth = calculateAge(dateOfBirth);
        let countryOfBirth = player.countryOfBirth ? player.countryOfBirth : '';
        let marketValueInEur = player.marketValueInEur ? player.marketValueInEur: '';
        if (marketValueInEur!='')
        marketValueInEur = setEurValue(marketValueInEur);
        else marketValueInEur = "unknown";
        let row = '<tr>' +
            '<td class="noborder">' + imageUrl + '</td>' +
            '<td class="noborder"><a href="../valutation/player?player_id=' + player.playerId + '">' + name + '</a></td>' +
            '<td class="noborder">' + dateOfBirth + '</td>' +
            '<td class="noborder">' + countryOfBirth + '</td>' +
            '<td class="noborder">' + marketValueInEur + '</td>' +
            '</tr>';
        tableBody.innerHTML += row;
    });
}

/* function created using chatGPT */
function setEurValue(value) {
    if (value === '' || value === null) return '';
    let number = parseInt(value);
    if (isNaN(number)) return '';
    if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + 'm';
    } else if (number >= 1000) {
        return (number / 1000).toFixed(1) + 'k';
    } else {
        return number.toString();
    }
}

/* function created using chatGPT */
function calculateAge(birthDateString) {
    if (!birthDateString || isNaN(Date.parse(birthDateString))) {
        return '';
    }
    let today = new Date();
    let birthDate = new Date(birthDateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return birthDateString + ' (' + age + ')';
}

function paginatePlayers(playersData) {
    const start = (currentPage - 1) * playersPerPage;
    const end = start + playersPerPage;
    return playersData.slice(start, end);
}

function updatePageNumber(){
    let pageNumber = document.querySelector('#pagination_number');
    pageNumber.textContent = currentPage + '/' + totalPages;
}

function handlePagination(playersData) {
    document.getElementById('prevButton').addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            updatePlayersTable(playersData);
            updatePageNumber();
        }
    });

    document.getElementById('nextButton').addEventListener('click', function() {
        if (currentPage < Math.ceil(playersData.length / playersPerPage)) {
            currentPage++;
            updatePlayersTable(playersData);
            updatePageNumber();
        }
    });
}

function updatePlayersTable(playersData) {
    let tableBody = document.getElementById('players-table-body');
    tableBody.innerHTML = '';
    populatePlayersTable(paginatePlayers(playersData));
}

function fillHTML(clubData, playersData) {
    updatePlayersTable(playersData);
    handlePagination(playersData);
    totalPages = Math.ceil(playersData.length / playersPerPage);
    updatePageNumber();

    //document.getElementById('results').innerHTML = "The result is: " + JSON.stringify(clubData);
    // it set club name
    const clubNameElement = document.querySelector('#club_name');
    const clubName = clubData.name;
    clubNameElement.textContent = clubName;
    // it set image URL
    let imgElement = document.querySelector('#club_logo');
    imgElement.src = "https://tmssl.akamaized.net/images/wappen/head/" + clubData.club_id + ".png?";
    // it set club country
    let clubNetTransferElement = document.querySelector('#net_transfer');
    clubNetTransferElement.textContent = clubData.net_transfer_record;
    // it set squad size
    let clubSizeElement = document.querySelector('#squad_size');
    clubSizeElement.textContent = clubData.squad_size;

    let clubForeignersElement = document.querySelector('#foreigners_age');
    clubForeignersElement.textContent = clubData.foreigners_percentage;

    let clubNationalPlayersElement = document.querySelector('#national_players');
    clubNationalPlayersElement.textContent = clubData.national_team_players;

    let clubStadiumElement = document.querySelector('#stadium');
    clubStadiumElement.textContent = clubData.stadium_name;

    let clubStadiumSeatsElement = document.querySelector('#stadium_seats');
    clubStadiumSeatsElement.textContent = clubData.stadium_seats;

    //document.getElementById('players').innerHTML = "The result is: " + JSON.stringify(playersData);
    //populatePlayersTable(playersData);
    //console.log(playersData);
}

