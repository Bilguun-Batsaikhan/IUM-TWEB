// variables for pagination
let currentPage = 1;
let lastPage = 1;
let itemsPerPage = 10;
let gamesData = null;

document.addEventListener('DOMContentLoaded', async function () {
    document.getElementById('graphContainer').style.display = 'none';
    // Get the competition name from the query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const competitionName = urlParams.get('competition');
    const country = urlParams.get('country');

    if (!country || !competitionName) {
        window.location.href = '/error';
        return;
    }

    let ID = await fetchCompetitionIDbyName('/retrieveCompetitionIDbyName', competitionName);
    let gamesData = await fetchGamesTable(ID);

    gamesData.games.result.sort((a, b) => new Date(b.date) - new Date(a.date));

    displayGamesData(gamesData, currentPage);
    init(gamesData);

    const imgElement = document.createElement('img');
    fetchGraphImage(ID.competitionID)
        .then(imgUrl => {
            imgElement.src = imgUrl;
            document.getElementById('graphContainer').appendChild(imgElement);
        })
        .catch(error => {
            console.error('Error:', error);
        });

    let dateSelect = document.getElementById('dateSelect');
    let uniqueYears = [...new Set(gamesData.games.result.map(game => game.date.substring(0, 4)))];

    uniqueYears.forEach(year => {
        let option = document.createElement('option');
        option.value = year;
        option.text = year;
        dateSelect.appendChild(option);
    });

    // Add event listeners for navigation buttons
    document.querySelectorAll('.nav-bar button').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.nav-bar button').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            switch (button.id) {
                // case 'switchButton':
                //     handleSwitch();
                //     break;
                case 'matchButton':
                    handleMatch();
                    break;
                // case 'statisticButton':
                //     handleStatistic();
                //     break;
                case 'graphButton':
                    handleGraph();
                    break;
                default:
                    break;
            }
        });
    });
});

function init(gamesData) {
    console.log('init()');
    document.getElementById('nextButton').addEventListener('click', () => {
        if (currentPage < lastPage)
            currentPage++;
        displayGamesData(gamesData, currentPage, dateSelect.value);
    });
    document.getElementById('prevButton').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayGamesData(gamesData, currentPage, dateSelect.value);
        }
    });

    let button = document.getElementById('expandButton');

    button.addEventListener('click', () => {
        if (button.id === 'expandButton') {
            itemsPerPage += 10;
            button.textContent = 'Show Less';
            button.id = 'shrinkButton';
        } else if (button.id === 'shrinkButton' && itemsPerPage > 10) {
            itemsPerPage -= 10;
            button.textContent = 'Show More';
            button.id = 'expandButton';

            // Update currentPage to stay on the correct page after changing itemsPerPage
            const totalPages = Math.ceil(lastPage / itemsPerPage);
            currentPage = Math.min(currentPage, totalPages);
        }

        displayGamesData(gamesData, currentPage, dateSelect.value);
    });


    let topButton = document.getElementById('topButton');

    topButton.addEventListener('click', () => {
        window.scrollTo(0, 0);
    });

    let dateSelect = document.getElementById('dateSelect');

    dateSelect.addEventListener('change', () => {
        currentPage = 1;
        displayGamesData(gamesData, currentPage, dateSelect.value);
    });
}

//fetch competition ID for given competition name, retrieveCompetitionIDbyName
async function fetchCompetitionIDbyName(url, competitionName) {
    try {
        const response = await axios.post(url, { name: competitionName });
        return response.data; // assuming the ID is in the response data
    } catch (error) {
        console.error("Error fetching competition ID:", error);
        // Handle the error appropriately
    }
}

async function sendAxiosQueryGet(url) {
    try {
        const response = await axios.get(url); // Use axios.get for fetching data
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}


//request graph image from main server then dynamically create the graph image in html file
async function fetchGraphImage(competitionId) {
    try {
        // Make request to Express server using axios
        const response = await axios.get(`/retrieveGraph?competition_id=${competitionId}`, {
            responseType: 'arraybuffer', // Specify the response type as arraybuffer to handle binary data
        });

        // Convert the array buffer to a blob
        const blob = new Blob([response.data], { type: 'image/png' });

        // Create a temporary URL for the blob
        const imgUrl = URL.createObjectURL(blob);

        return imgUrl;
    } catch (error) {
        console.error('Error fetching graph:', error);
        throw error; // Propagate the error for handling in the calling code
    }
}

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


function displayGamesData(gamesData, page, year) {
    const tableBody = document.getElementById('competition-table-body');
    tableBody.innerHTML = ''; // Clear existing rows

    let gamesToDisplay = gamesData.games.result;

    // Filter gamesData by year if a year is selected
    if (year) {
        gamesToDisplay = gamesToDisplay.filter(game => game.date.substring(0, 4) === year);
    }

    // Apply pagination to gamesToDisplay
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    gamesToDisplay = gamesToDisplay.slice(startIndex, endIndex);

    const totalRows = year ? gamesData.games.result.filter(game => game.date.substring(0, 4) === year).length : gamesData.games.result.length;

    gamesToDisplay.forEach(game => {
        const row = tableBody.insertRow();

        row.insertCell().textContent = new Date(game.date).toLocaleDateString();

        // Create anchor for home club
        const homeClubAnchor = document.createElement('a');
        homeClubAnchor.href = '/valutation/club?club_id=' + game.home_club_id;
        homeClubAnchor.textContent = game.home_club_name;

        // Create img element for home club icon
        const homeClubImg = document.createElement('img');
        homeClubImg.src = "https://tmssl.akamaized.net/images/wappen/head/" + game.home_club_id + ".png?";
        homeClubImg.alt = "Club Logo";
        homeClubImg.className = "club_logo";
        homeClubImg.style.maxWidth = "25px";

        // Create a div to wrap the anchor and image
        const homeClubWrapper = document.createElement('div');
        homeClubWrapper.className = 'club-wrapper';
        homeClubWrapper.appendChild(homeClubImg);
        homeClubWrapper.appendChild(homeClubAnchor);

        // Append home club wrapper to cell
        const homeCell = row.insertCell();
        homeCell.appendChild(homeClubWrapper);

        // Add other game information
        row.insertCell().textContent = game.home_club_goals + ' - ' + game.away_club_goals;

        // Create anchor for away club
        const awayClubAnchor = document.createElement('a');
        awayClubAnchor.href = '/valutation/club?club_id=' + game.away_club_id;
        awayClubAnchor.textContent = game.away_club_name;

        // Create img element for away club icon
        const awayClubImg = document.createElement('img');
        awayClubImg.src = "https://tmssl.akamaized.net/images/wappen/head/" + game.away_club_id + ".png?";
        awayClubImg.alt = "Club Logo";
        awayClubImg.className = "club_logo";
        awayClubImg.style.maxWidth = "25px";

        // Create a div to wrap the anchor and image
        const awayClubWrapper = document.createElement('div');
        awayClubWrapper.className = 'club-wrapper';
        awayClubWrapper.appendChild(awayClubImg);
        awayClubWrapper.appendChild(awayClubAnchor);

        // Append away club wrapper to cell
        const awayCell = row.insertCell();
        awayCell.appendChild(awayClubWrapper);


        row.insertCell().textContent = game.stadium;
    });

    lastPage = Math.ceil(totalRows / itemsPerPage);
    document.getElementById('currentPage').innerText = page + "/" + lastPage;
}

function createClubAnchor(clubId, clubName) {
    const anchor = document.createElement('a');
    anchor.href = '/valutation/club?club_id=' + clubId;
    anchor.textContent = clubName;

    // Create img element for club icon
    const img = document.createElement('img');
    img.src = "https://tmssl.akamaized.net/images/wappen/head/" + clubId + ".png?";
    img.alt = "Club Logo";
    img.className = "club_logo";
    img.style.maxWidth = "25px";

    // Create a div to wrap the anchor and image
    const wrapper = document.createElement('div');
    wrapper.className = 'club-wrapper';
    wrapper.appendChild(img);
    wrapper.appendChild(anchor);

    return wrapper;
}

function handleGraph() {
    document.getElementById('graphContainer').style.display = 'block';
    document.getElementById('competition-table-body').style.display = 'none';
    document.getElementById('tableHead').style.display = 'none';
    document.getElementById('pagination').style.display = 'none';
}

function handleMatch() {
    document.getElementById('graphContainer').style.display = 'none';
    document.getElementById('competition-table-body').style.display = 'table-row-group';
    document.getElementById('tableHead').style.display = 'table-row';
    document.getElementById('pagination').style.display = 'flex';
}


