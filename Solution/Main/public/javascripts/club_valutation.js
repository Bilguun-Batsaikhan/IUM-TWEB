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
        console.log('club_id:', parseInt(clubId));
        sendAxiosQuery('/valutation/club', clubId);
    }
}

function sendAxiosQuery(url, clubId) {
    axios.post(url, {
        club_id: clubId
    })
        .then(function (dataR) {
            var clubData = dataR.data.clubValutation;
            if (!clubData)
                window.location.href = '/error';
            console.log(clubData);
            fillHTML(clubData);
        })
        .catch(function (error) {
            (JSON.stringify(error));
        });
}

function fillHTML(clubData) {
    document.getElementById('results').innerHTML = "The result is: " + JSON.stringify(clubData);
    // it set club name
    const clubNameElement = document.querySelector('#club_name');
    const clubName = clubData.name;
    clubNameElement.textContent = clubName;
    // it set image URL
    var imgElement = document.querySelector('#club_logo');
    imgElement.src = "https://tmssl.akamaized.net/images/wappen/head/" + clubData.club_id + ".png?";
    // it set club country
    var clubNetTransferElement = document.querySelector('#net_transfer');
    clubNetTransferElement.textContent = clubData.net_transfer_record;
    // it set squad size
    var clubSizeElement = document.querySelector('#squad_size');
    clubSizeElement.textContent = clubData.squad_size;

    //var clubAvgAgeElement = document.querySelector('#average_age');
    //clubAvgAgeElement.textContent = clubData.average_age;

    var clubForeignersElement = document.querySelector('#foreigners_age');
    clubForeignersElement.textContent = clubData.foreigners_percentage;

    var clubNationalPlayersElement = document.querySelector('#national_players');
    clubNationalPlayersElement.textContent = clubData.national_team_players;

    var clubStadiumElement = document.querySelector('#stadium');
    clubStadiumElement.textContent = clubData.stadium_name;

    var clubStadiumSeatsElement = document.querySelector('#stadium_seats');
    clubStadiumSeatsElement.textContent = clubData.stadium_seats;


}

