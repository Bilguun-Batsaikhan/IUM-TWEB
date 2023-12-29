package com.example.competitions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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
        System.out.println(countries);
        return ResponseEntity.ok(countries);
    }

    @PostMapping("/countriesData")
    public ResponseEntity<List<String>> getCompetitionsByCountry(@RequestBody Map<String, String> body) {
        String country = body.get("country");
        List<String> competitions = competitionService.getCompetitionsByCountry(country);
        return ResponseEntity.ok(competitions);
    }
}