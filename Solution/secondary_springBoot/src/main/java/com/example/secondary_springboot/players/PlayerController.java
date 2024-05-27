package com.example.secondary_springboot.players;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/players")
public class PlayerController {
    private final PlayerService playerService;

    @Autowired
    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    /**
     * Returns a ResponseEntity containing a list of players belonging to the specified club ID.
     * @param body Map containing the club ID.
     * @return ResponseEntity containing a list of players.
     */
    @PostMapping("/getplayersbyclub")
    public ResponseEntity<List<Player>> getPlayersByClubId(@RequestBody Map<String, String> body) {
        int clubId = Integer.parseInt(body.get("club_id"));
        System.out.println(clubId);
        List<Player> players = playerService.getPlayersByClubId(clubId);
        return ResponseEntity.ok(players);
    }

    /**
     * Returns a ResponseEntity containing a list of players with the specified player ID.
     * @param body Map containing the player ID.
     * @return ResponseEntity containing a list of players.
     */
    @PostMapping("/getplayerbyid")
    public ResponseEntity<List<Player>> getPlayerById(@RequestBody Map<String, String> body) {
        int playerId = Integer.parseInt(body.get("player_id"));
        List<Player> players = playerService.getPlayerById(playerId);
        return ResponseEntity.ok(players);
    }

    /**
     * Returns a ResponseEntity containing a list of player names matching the given search criteria.
     * @param body Map containing the player name.
     * @return ResponseEntity containing a list of player names.
     */
    @PostMapping("/getsearchplayer")
    public ResponseEntity<List<String>> getSearchPlayer(@RequestBody Map<String, String> body){
        String playerName = body.get("player_name");
        List<String> searchPlayers = playerService.searchPlayer(playerName);
        return ResponseEntity.ok(searchPlayers);
    }

    /**
     * Returns a ResponseEntity containing a list of popular players.
     * @return ResponseEntity containing a list of popular players.
     */
    @PostMapping("/getpopularplayers")
    public ResponseEntity<List<Player>> getPopularPlayers(){
        List<Player> players = playerService.getPopularPlayers();
        return ResponseEntity.ok(players);
    }

}