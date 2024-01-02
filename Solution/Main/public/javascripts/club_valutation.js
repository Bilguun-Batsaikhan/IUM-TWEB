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
    axios.post(url, {club_id: clubId
    })
        .then(function (dataR) {
            var clubData = dataR.data.clubValutation;
            if(!clubData)
                window.location.href = '/error';
            console.log(clubData);
            document.getElementById('results').innerHTML= "The result is: "+JSON.stringify(clubData);
        })
        .catch(function (error) {
            alert(JSON.stringify(error));
        });
}

