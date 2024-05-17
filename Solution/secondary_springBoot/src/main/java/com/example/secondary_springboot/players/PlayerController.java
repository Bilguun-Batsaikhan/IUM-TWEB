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

    @PostMapping("/getplayersbyclub")
    public ResponseEntity<List<Player>> getPlayersByClubId(@RequestBody Map<String, String> body) {
        int clubId = Integer.parseInt(body.get("club_id"));
        System.out.println(clubId);
        List<Player> players = playerService.getPlayersByClubId(clubId);
        return ResponseEntity.ok(players);
    }

    @PostMapping("/getplayerbyid")
    public ResponseEntity<List<Player>> getPlayerById(@RequestBody Map<String, String> body) {
        int playerId = Integer.parseInt(body.get("player_id"));
        List<Player> players = playerService.getPlayerById(playerId);
        return ResponseEntity.ok(players);
    }

    @PostMapping("/getsearchplayer")
    public ResponseEntity<List<String>> getSearchPlayer(@RequestBody Map<String, String> body){
        String playerName = body.get("player_name");
        List<String> searchPlayers = playerService.searchPlayer(playerName);
        return ResponseEntity.ok(searchPlayers);
    }

    @PostMapping("/getpopularplayers")
    public ResponseEntity<List<Player>> getPopularPlayers(){
        List<Player> players = playerService.getPopularPlayers();
        return ResponseEntity.ok(players);
    }

}