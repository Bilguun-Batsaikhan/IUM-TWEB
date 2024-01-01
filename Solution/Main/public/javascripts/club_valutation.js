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
        //sendAxiosQuery('/valutation/club');
    }
}

function sendAxiosQuery(url) {
    axios.post(url)
        .then(function (dataR) {
            var clubData = dataR.data.clubData;
            console.log(clubData);
        })
        .catch(function (error) {
            alert(JSON.stringify(error));
        });
}


