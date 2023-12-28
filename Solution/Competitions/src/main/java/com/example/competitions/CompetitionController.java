package com.example.competitions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
}