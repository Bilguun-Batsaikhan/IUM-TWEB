let currentPage = 1;
const MatchPerPage = 10;
let totalPages = 0;


function init() {
    /* The code for obtaining URL parameters has been adapted from:
     https://www.sitepoint.com/get-url-parameters-with-javascript/
    */
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const playerId = urlParams.get('player_id')
    //const club_id =
    if (!playerId || isNaN(playerId) || !/^\d+$/.test(playerId)) {
        window.location.href = '/error';
    } else {
        //console.log('player:', parseInt(playerId));
        sendAxiosQuery('/valutation/player', playerId);
        sendAxiosQuery2('/valutation/getAppearancesByPlayer', playerId);
    }
}

function sendAxiosQuery(url, playerId) {
    axios.post(url, {
        player_id: playerId
    })
        .then(function (dataR) {
            let playerData = dataR.data.playerData;
            //console.log("playerData: " + JSON.stringify(playerData));
            if (!playerData)
                window.location.href = '/error';
            fillHTML(playerData);
        })
        .catch(function (error) {
            (JSON.stringify(error));
        });
}

function sendAxiosQuery2(url, playerId) {
    axios.post(url, {
        player_id: playerId
    })
        .then(function (dataR) {
            let matchData = dataR.data.matchData.result;
            //console.log("MatchData: " + JSON.stringify(matchData));
            if (!matchData)
                window.location.href = '/error';
           // console.log("Playessss" + playerId);
            sendAxiosQuery3('/valutation/getGamesResultsByGameId', playerId, matchData);

        })
        .catch(function (error) {
            (JSON.stringify(error));
        });
}

function sendAxiosQuery3(url, playerClubId, matchData) {
    //console.log("Player " + playerClubId);
    axios.post(url, {
        player_club_id: playerClubId,
        match_data: matchData
    })
        .then(function (dataR) {
            let resultData = dataR.data.resultData.result;
            //console.log("resultData: " + JSON.stringify(resultData));
            resultData = clearData(resultData);
            statistics(resultData);
            updateMatchTable(resultData, playerClubId);
            handlePagination(resultData);
            totalPages = Math.ceil(resultData.length / MatchPerPage);
            updatePageNumber();
        })
        .catch(function (error) {
            console.log(JSON.stringify(error));
        });
}

function clearData(resultData) {
    return resultData.filter(row => row.match_found !== false);
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

function fillHTML(playerData) {
    //console.log("Test " + JSON.stringify(playerData));
    const playerImage = document.getElementById('playerImage');
    playerImage.src = playerData[0].imageUrl;
    const playerName = document.getElementById('playerName');
    playerName.textContent = playerData[0].name;
    const playerNationality = document.getElementById('playerNationality');
    playerNationality.textContent = playerData[0].countryOfCitizenship;
    const playerClub = document.getElementById('playerClub');
    playerClub.textContent = playerData[0].currentClubName;
    const playerClubImage = document.getElementById('playerClubImage');
    playerClubImage.src = "https://tmssl.akamaized.net/images/wappen/head/" + playerData[0].currentClubId + ".png";

    const playerRole = document.getElementById('playerRole');
    playerRole.textContent = playerData[0].position;
    const playerAge = document.getElementById('playerAge');
    playerAge.textContent = playerData[0].dateOfBirth;
    const playerHeight = document.getElementById('playerHeight');
    playerHeight.textContent = playerData[0].heightInCm;
    const playerMarketValue = document.getElementById('playerMarketValue');
    playerMarketValue.textContent = setEurValue(playerData[0].marketValueInEur);
    const playerFoot = document.getElementById('playerFoot');
    playerFoot.textContent = playerData[0].foot;
    const playerHighestMarketValue = document.getElementById('playerHighestMarketValue');
    playerHighestMarketValue.textContent = setEurValue(playerData[0].highestMarketValueInEur);
}

/* functions created using chatGPT */
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

function populateMatchTable(matchData, playerClubId) {
    let tableBody = document.getElementById('match-table-body');
    matchData.forEach(function(match) {
        let date = match.date ? match.date : '';
        const readableDate = formatReadableDate(date);
        let home_club_id = match.home_club_id;
        let away_club_id = match.away_club_id;
        let result = "1 - 1"
        let goals = match.goals ? match.goals : '0';
        let assists = match.assists ? match.assists: '0';
        let row = '<tr>' +
            '<td>' + readableDate + '</td>' +
            //'<td><img src="https://tmssl.akamaized.net/images/wappen/head/' + match.home_club_id + '.png" style="max-width: 25px;"><a href="/valutation/club?club_id=' + match.home_club_id + '">' + match.home_club_name + '</a></td>' +
            '<td><a href="/valutation/club?club_id=' + match.home_club_id + '"><img src="https://tmssl.akamaized.net/images/wappen/head/' + match.home_club_id + '.png" style="max-width: 25px;"></a></td>' +
            '<td>' + match.home_club_goals + " - " + match.away_club_goals + '</td>' +
            //'<td><img src="https://tmssl.akamaized.net/images/wappen/head/' + match.away_club_id + '.png" style="max-width: 25px;"><a href="/valutation/club?club_id=' + match.away_club_id + '">' + match.away_club_name + '</a></td>' +
            '<td><a href="/valutation/club?club_id=' + match.away_club_id + '"><img src="https://tmssl.akamaized.net/images/wappen/head/' + match.away_club_id + '.png" style="max-width: 25px;"></a></td>' +
            '<td>' + goals + '</td>' +
            '<td>' + assists + '</td>' +
            '</tr>';
        tableBody.innerHTML += row;
    });
}

function paginateMatch(matchData) {
    const start = (currentPage - 1) * MatchPerPage;
    const end = start + MatchPerPage;
    return matchData.slice(start, end);
}

function updatePageNumber(){
    let pageNumber = document.querySelector('#pagination_number');
    pageNumber.textContent = currentPage + '/' + totalPages;
}

function handlePagination(matchData) {
    document.getElementById('prevButton').addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            updateMatchTable(matchData);
            updatePageNumber();
        }
    });

    document.getElementById('nextButton').addEventListener('click', function() {
        if (currentPage < Math.ceil(matchData.length / MatchPerPage)) {
            currentPage++;
            updateMatchTable(matchData);
            updatePageNumber();
        }
    });
}

function updateMatchTable(matchData, playerClubId) {
    let tableBody = document.getElementById('match-table-body');
    tableBody.innerHTML = '';
    populateMatchTable(paginateMatch(matchData), playerClubId);
}

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

function formatReadableDate(isoDate) {
    const date = new Date(isoDate);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const readableDate = date.toLocaleDateString('en-GB', options);
    return readableDate;
}

function statistics(matchData){
    let totalYellowCards = 0;
    let totalRedCards = 0;
    let totalGoals = 0;
    let totalAssists = 0;
    let totalMinPlayed = 0;
    let totalGames = 0;
    matchData.forEach(function(match){
        totalYellowCards += match.yellow_cards;
        totalRedCards += match.red_cards;
        totalGoals += match.goals;
        totalAssists += match.assists;
        totalMinPlayed += match.minutes_played;
        totalGames += 1;
    });
    const playerYCards = document.getElementById('playerYCards');
    playerYCards.textContent = totalYellowCards;
    const playerRCards = document.getElementById('playerRCards');
    playerRCards.textContent = totalRedCards;
    const playerGoals = document.getElementById('playerGoals');
    playerGoals.textContent = totalGoals;
    const playerAssists = document.getElementById('playerAssists');
    playerAssists.textContent = totalAssists;
    const playerMinutes = document.getElementById('playerMinutes');
    playerMinutes.textContent = totalMinPlayed;
    const playerGames = document.getElementById('playerGames');
    playerGames.textContent = totalGames;
}





