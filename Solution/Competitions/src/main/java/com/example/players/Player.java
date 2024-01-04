package com.example.players;
import jakarta.persistence.*;

@Entity
@Table(name = "players")
public class Player {
    public Player(){}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "player_id")
    private Long playerId;

    @Column(name = "first_name")
    private String playerFirstName;

    @Column(name = "last_name")
    private String playerLastName;

    @Column(name = "name")
    private String playerName;

    @Column(name = "last_season")
    private Integer playerLastSeason;

    @Column(name = "current_club_id")
    private Long playerCurrentClubId;

    @Column(name = "player_code")
    private String playerCode;

    @Column(name = "country_of_birth")
    private String playerBirthCountry;

    @Column(name = "city_of_birth")
    private String playerBirthCity;

    @Column(name = "country_of_citizenship")
    private String playerCitizenshipCountry;

    @Column(name = "date_of_birth")
    private String playerBirthDate;

    @Column(name = "sub_position")
    private String playerSubPosition;

    @Column(name = "position")
    private String playerPosition;

    @Column(name = "height_in_cm")
    private Integer playerHeight;

    @Column(name = "market_value_in_eur")
    private Integer playerMarketValue;

    @Column(name = "highest_market_value_in_eur")
    private Integer playerHighestMarketValue;

    @Column(name = "contract_expiration_date")
    private Integer playerContractExpiration;

    @Column(name = "agent_name")
    private String playerAgentName;

    @Column(name = "image_url")
    private String playerImageUrl;

    @Column(name = "url")
    private String playerUrl;

    @Column(name = "current_club_domestic_competition_id")
    private Integer playerCurrentDomesticClubId;

    @Column(name = "current_club_name")
    private String playerCurrentClubName;

    public Long getPlayerId() {
        return playerId;
    }

    public String getPlayerFirstName() {
        return playerFirstName;
    }

    public String getPlayerLastName() {
        return playerLastName;
    }

    public String getPlayerName() {
        return playerName;
    }

    public Integer getPlayerLastSeason() {
        return playerLastSeason;
    }

    public Long getPlayerCurrentClubId() {
        return playerCurrentClubId;
    }

    public String getPlayerCode() {
        return playerCode;
    }

    public String getPlayerBirthCountry() {
        return playerBirthCountry;
    }

    public String getPlayerBirthCity() {
        return playerBirthCity;
    }

    public String getPlayerCitizenshipCountry() {
        return playerCitizenshipCountry;
    }

    public String getPlayerBirthDate() {
        return playerBirthDate;
    }

    public String getPlayerSubPosition() {
        return playerSubPosition;
    }

    public String getPlayerPosition() {
        return playerPosition;
    }

    public Integer getPlayerHeight() {
        return playerHeight;
    }

    public Integer getPlayerMarketValue() {
        return playerMarketValue;
    }

    public Integer getPlayerHighestMarketValue() {
        return playerHighestMarketValue;
    }

    public Integer getPlayerContractExpiration() {
        return playerContractExpiration;
    }

    public String getPlayerAgentName() {
        return playerAgentName;
    }

    public String getPlayerImageUrl() {
        return playerImageUrl;
    }

    public String getPlayerUrl() {
        return playerUrl;
    }

    public Integer getPlayerCurrentDomesticClubId() {
        return playerCurrentDomesticClubId;
    }

    public String getPlayerCurrentClubName() {
        return playerCurrentClubName;
    }

    public void setPlayerId(Long playerId) {
        this.playerId = playerId;
    }

    public void setPlayerFirstName(String playerFirstName) {
        this.playerFirstName = playerFirstName;
    }

    public void setPlayerLastName(String playerLastName) {
        this.playerLastName = playerLastName;
    }

    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }

    public void setPlayerLastSeason(Integer playerLastSeason) {
        this.playerLastSeason = playerLastSeason;
    }

    public void setPlayerCurrentClubId(Long playerCurrentClubId) {
        this.playerCurrentClubId = playerCurrentClubId;
    }

    public void setPlayerCode(String playerCode) {
        this.playerCode = playerCode;
    }

    public void setPlayerBirthCountry(String playerBirthCountry) {
        this.playerBirthCountry = playerBirthCountry;
    }

    public void setPlayerBirthCity(String playerBirthCity) {
        this.playerBirthCity = playerBirthCity;
    }

    public void setPlayerCitizenshipCountry(String playerCitizenshipCountry) {
        this.playerCitizenshipCountry = playerCitizenshipCountry;
    }

    public void setPlayerBirthDate(String playerBirthDate) {
        this.playerBirthDate = playerBirthDate;
    }

    public void setPlayerSubPosition(String playerSubPosition) {
        this.playerSubPosition = playerSubPosition;
    }

    public void setPlayerPosition(String playerPosition) {
        this.playerPosition = playerPosition;
    }

    public void setPlayerHeight(Integer playerHeight) {
        this.playerHeight = playerHeight;
    }

    public void setPlayerMarketValue(Integer playerMarketValue) {
        this.playerMarketValue = playerMarketValue;
    }

    public void setPlayerHighestMarketValue(Integer playerHighestMarketValue) {
        this.playerHighestMarketValue = playerHighestMarketValue;
    }

    public void setPlayerContractExpiration(Integer playerContractExpiration) {
        this.playerContractExpiration = playerContractExpiration;
    }

    public void setPlayerAgentName(String playerAgentName) {
        this.playerAgentName = playerAgentName;
    }

    public void setPlayerImageUrl(String playerImageUrl) {
        this.playerImageUrl = playerImageUrl;
    }

    public void setPlayerUrl(String playerUrl) {
        this.playerUrl = playerUrl;
    }

    public void setPlayerCurrentDomesticClubId(Integer playerCurrentDomesticClubId) {
        this.playerCurrentDomesticClubId = playerCurrentDomesticClubId;
    }

    public void setPlayerCurrentClubName(String playerCurrentClubName) {
        this.playerCurrentClubName = playerCurrentClubName;
    }

    public Player(Long playerId, String playerFirstName, String playerLastName, String playerName, Integer playerLastSeason, Long playerCurrentClubId, String playerCode, String playerBirthCountry, String playerBirthCity, String playerCitizenshipCountry, String playerBirthDate, String playerSubPosition, String playerPosition, Integer playerHeight, Integer playerMarketValue, Integer playerHighestMarketValue, Integer playerContractExpiration, String playerAgentName, String playerImageUrl, String playerUrl, Integer playerCurrentDomesticClubId, String playerCurrentClubName) {
        this.playerId = playerId;
        this.playerFirstName = playerFirstName;
        this.playerLastName = playerLastName;
        this.playerName = playerName;
        this.playerLastSeason = playerLastSeason;
        this.playerCurrentClubId = playerCurrentClubId;
        this.playerCode = playerCode;
        this.playerBirthCountry = playerBirthCountry;
        this.playerBirthCity = playerBirthCity;
        this.playerCitizenshipCountry = playerCitizenshipCountry;
        this.playerBirthDate = playerBirthDate;
        this.playerSubPosition = playerSubPosition;
        this.playerPosition = playerPosition;
        this.playerHeight = playerHeight;
        this.playerMarketValue = playerMarketValue;
        this.playerHighestMarketValue = playerHighestMarketValue;
        this.playerContractExpiration = playerContractExpiration;
        this.playerAgentName = playerAgentName;
        this.playerImageUrl = playerImageUrl;
        this.playerUrl = playerUrl;
        this.playerCurrentDomesticClubId = playerCurrentDomesticClubId;
        this.playerCurrentClubName = playerCurrentClubName;
    }
}

