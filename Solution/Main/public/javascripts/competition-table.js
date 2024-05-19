// variables for pagination
let currentPage = 1;
let lastPage = 1;
let itemsPerPage = 10;
let gamesData = null;

let ID;
document.addEventListener('DOMContentLoaded', async function () {
    // Get the competition name from the query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const competitionName = urlParams.get('competition');
    console.log('competitionName ' + competitionName);

    const country = urlParams.get('country')
    console.log('country ' + country);
    // Fetch the competition data and display it in a table
    //fetchCompetitionData(competitionName).then(displayCompetitionData);

    try {
        const countries = await sendAxiosQuery('/competition');
        console.log("countries", countries);
    } catch (error) {
        console.error("Error fetching countries:", error);
        // Handle the error appropriately
    }

    if (!country || !competitionName) {
        window.location.href = '/error';
    } else {
        ID = await fetchCompetitionID('/retrieveCompetitionID', country, competitionName);
        console.log('ID ' + JSON.stringify(ID, null, 2));
        gamesData = await fetchGamesTable(ID);
        // Sort gamesData by date in descending order
        gamesData.games.result.sort((a, b) => new Date(b.date) - new Date(a.date));

        //console.log(JSON.stringify(games, null, 2));
        displayGamesData(gamesData, currentPage);
        init(gamesData);

        const imgElement = document.createElement('img');
        // console.log("ID: " + ID.competitionID)
        fetchGraphImage(ID.competitionID)
        .then(imgUrl => {
            imgElement.src = imgUrl;
            document.getElementById('graphContainer').appendChild(imgElement);
        })
        .catch(error => {
            // Handle the error
            console.error('Error:', error);
        });
    };

    let dateSelect = document.getElementById('dateSelect');
    let uniqueYears = [...new Set(gamesData.games.result.map(game => game.date.substring(0, 4)))];
    
    uniqueYears.forEach(year => {
        let option = document.createElement('option');
        option.value = year;
        option.text = year;
        dateSelect.appendChild(option);
    });
});

function init(gamesData) {
    console.log('init()');
    document.getElementById('nextButton').addEventListener('click', () => {
        if(currentPage < lastPage)
        currentPage++;
        displayGamesData(gamesData, currentPage, dateSelect.value);
    });
    document.getElementById('prevButton').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayGamesData(gamesData,currentPage, dateSelect.value);
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

    dateSelect.addEventListener('change', () => {
        currentPage = 1;
        displayGamesData(gamesData, currentPage, dateSelect.value);
    });
}

//fetch competition ID for given country and competition name
async function fetchCompetitionID(url, country, competitionName) {
    try {
        const response = await axios.post(url, {country_name: country, name: competitionName});
        return response.data; // assuming the ID is in the response data
    } catch (error) {
        console.error("Error fetching competition ID:", error);
        // Handle the error appropriately
    }
}

async function sendAxiosQuery(url) {
    try {
        const response = await axios.post(url);
        return response.data;
    } catch (error) {
        throw error;
    }
}

//request graph image from main server then dynamically create the graph image in html file
async function fetchGraphImage(competitionId) {
    try {
        console.log("LALLAL" + competitionId)
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
        // Create anchor for home club
        const homeClubAnchor = document.createElement('a');
        homeClubAnchor.href = '/valutation/club?club_id=' + game.home_club_id;
        homeClubAnchor.textContent = game.home_club_name;

        // Create anchor for away club
        const awayClubAnchor = document.createElement('a');
        awayClubAnchor.href = '/valutation/club?club_id=' + game.away_club_id;
        awayClubAnchor.textContent = game.away_club_name;

        // Append home club anchor to cell
        const homeCell = row.insertCell();
        homeCell.appendChild(homeClubAnchor);

        // Append away club anchor to cell
        const awayCell = row.insertCell();
        awayCell.appendChild(awayClubAnchor);

        // Add other game information
        row.insertCell().textContent = game.home_club_goals;
        row.insertCell().textContent = game.away_club_goals;
        row.insertCell().textContent = new Date(game.date).toLocaleDateString();
        row.insertCell().textContent = game.stadium;
    });
    lastPage = Math.ceil(totalRows / itemsPerPage);
    document.getElementById('currentPage').innerText = page + "/" + lastPage;
}
