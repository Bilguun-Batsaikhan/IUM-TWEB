async function getPopularPlayers() {
    try {
        const responseData = await sendAxiosIndexQuery('/getpopularplayers');
        const players = responseData.popPlayers;
        //console.log("Popular Players: " + JSON.stringify(players));
        for (let i = 0; i < players.length; i++) {
            const player = players[i];
            const imgElement = document.getElementById(`player-${i + 1}`);

            if (imgElement) {
                const linkElement = document.createElement('a');
                linkElement.href = '../valutation/player?player_id=' + player.playerId;

                imgElement.parentNode.insertBefore(linkElement, imgElement);
                linkElement.appendChild(imgElement);

                imgElement.src = player.imageUrl;
            }
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
