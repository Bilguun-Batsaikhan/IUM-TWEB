package com.example.players;
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
        Long clubId = Long.valueOf(body.get("club_id"));
        System.out.println(clubId);
        List<Player> players = playerService.getPlayersByClubId(clubId);
        return ResponseEntity.ok(players);
    }


    @PostMapping("/hello")
    public String hello() {
        return "Ciao2!";
    }

}