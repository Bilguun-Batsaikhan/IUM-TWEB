package com.example.secondary_springboot.competitions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/competitions")
public class CompetitionController {
    private final CompetitionService competitionService;
    
    @Autowired
    public CompetitionController(CompetitionService competitionService) {
        this.competitionService = competitionService;
    }

    @GetMapping("/countries")
    public ResponseEntity<List<String>> getAllCompetitions() {
        List<String> countries = competitionService.getAllCountries();
        return ResponseEntity.ok(countries);
    }
    @GetMapping("/competitionTypes")
    public ResponseEntity<List<String>> getAllCompetitionTypes() {
        List<String> competitionTypes = competitionService.getAllCompetitionTypes();
        return ResponseEntity.ok(competitionTypes);
    }
    @PostMapping("/countriesData")
    public ResponseEntity<List<String>> getCompetitionsByCountry(@RequestBody Map<String, String> body) {
        String country = body.get("country");
        List<String> competitions = competitionService.getCompetitionsByCountry(country);
        return ResponseEntity.ok(competitions);
    }

    @PostMapping("/competitionID")
    public ResponseEntity<String> getCompetitionId(@RequestBody Map<String, String> body) {
    String country = body.get("country");
    String name = body.get("name");
    Optional<String> competitionId = competitionService.findCompetitionIdByCountryAndName(country, name);
        return competitionId.map(s -> new ResponseEntity<>(s, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
}
}