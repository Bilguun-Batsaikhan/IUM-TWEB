package com.example.secondary_springboot.competitions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CompetitionService {
    private final CompetitionRepository competitionRepository;

    @Autowired
    public CompetitionService(CompetitionRepository competitionRepository) {
        this.competitionRepository = competitionRepository;
    }
    // returns a list of all distinct countries in competition table
    public List<String> getAllCountries() {
        return competitionRepository.findAllDistinctCountries();
    }

    // returns a list of all distinct competition types in competition table
    public List<String> getAllCompetitionTypes() {
        // Fetch all distinct competition types from the repository
        List<String> allCompetitionTypes = competitionRepository.findAllDistinctCompetitionTypes();

        List<String> requiredSubTypes = List.of(
                "europa_league",
                "europa_league_qualifying",
                "uefa_champions_league",
                "uefa_champions_league_qualifying",
                "uefa_europa_conference_league_qualifiers",
                "fifa_club_world_cup"
        );

        List<String> filteredCompetitionTypes = allCompetitionTypes.stream()
                .filter(requiredSubTypes::contains)
                .collect(Collectors.toList());
        System.out.println(filteredCompetitionTypes);
        return filteredCompetitionTypes;
    }
    // returns a list of all competition names in a given country
    public List<String> getCompetitionsByCountry(String country) {
        return competitionRepository.findAllByCountry(country);
    }

    public Optional<String> findCompetitionIdByCountryAndName(String country, String name) {
        return competitionRepository.findCompetitionIdByCountryAndName(country, name);
    }


    public Optional<String> findCompetitionIdByName(String name) {
        return competitionRepository.findCompetitionIdByName(name);
    }
}
