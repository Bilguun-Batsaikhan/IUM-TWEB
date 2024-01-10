function init() {
    /* The code for obtaining URL parameters has been adapted from:
     https://www.sitepoint.com/get-url-parameters-with-javascript/
    */
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const playerId = urlParams.get('player_id')
    if (!playerId || isNaN(playerId) || !/^\d+$/.test(playerId)) {
        window.location.href = '/error';
    } else {
        //console.log('player:', parseInt(playerId));
        sendAxiosQuery('/valutation/player', playerId);
    }
}

// Fetch club data for given club ID
function sendAxiosQuery(url, playerId) {
    axios.post(url, {
        player_id: playerId
    })
        .then(function (dataR) {
            let playerData = dataR.data;
            //console.log(playerData);
            if (!playerData)
                window.location.href = '/error';
            fillHTML(playerData);
        })
        .catch(function (error) {
            (JSON.stringify(error));
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
    var today = new Date();
    var birthDate = new Date(birthDateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return birthDateString + ' (' + age + ')';
}

function fillHTML(playerData) {
    document.getElementById('results').innerHTML = "The result is: " + JSON.stringify(playerData);
}

