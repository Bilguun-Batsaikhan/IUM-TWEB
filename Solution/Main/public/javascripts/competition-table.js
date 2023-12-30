const { fetchCountries } = require('./index.js');

document.addEventListener('DOMContentLoaded', function () {
    // Fetch countries at the time of page load
    fetchCountries().then(init);
});

function init() {
    console.log('init()');
    const competitionNames = document.getElementsByClassName('competition-name');
    
    Array.from(competitionNames).forEach(competitionName => {
        competitionName.addEventListener('click', function (event) {
            event.preventDefault();
            console.log('Clicked on ' + competitionName.textContent);

            // Upon clicking on a competition name, fetch the competition table and display it
        });
    });
}