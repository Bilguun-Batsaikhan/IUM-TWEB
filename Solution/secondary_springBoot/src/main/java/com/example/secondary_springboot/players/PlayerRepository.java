package com.example.secondary_springboot.players;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {

    @Query("SELECT p FROM Player p WHERE p.currentClubId = :clubId")
    List<Player> findAllByClubId(@Param("clubId") int clubId);

    @Query("SELECT p FROM Player p WHERE p.playerId = :playerId")
    List<Player> findPlayerByPlayerId(@Param("playerId") int playerId);

    @Query("SELECT p.name, p.playerId, p.imageUrl FROM Player p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :playerName, '%'))")
    List<String> searchPlayerByName(@Param("playerName") String playerName);

}
