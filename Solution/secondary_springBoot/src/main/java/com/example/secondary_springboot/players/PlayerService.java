package com.example.secondary_springboot.players;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PlayerService {
    private final PlayerRepository playerRepository;

    @Autowired
    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    public List<Player> getPlayersByClubId(int club_id) {
        return playerRepository.findAllByClubId(club_id);
    }

    public List<Player> getPlayerById(int player_id) {
        return playerRepository.findPlayerByPlayerId(player_id);
    }

    public List<String> searchPlayer(String playerName) {
        return playerRepository.searchPlayerByName(playerName);
    }

    public List<Player> getPopularPlayers() {
        return playerRepository.searchPlayers();
    }
}
