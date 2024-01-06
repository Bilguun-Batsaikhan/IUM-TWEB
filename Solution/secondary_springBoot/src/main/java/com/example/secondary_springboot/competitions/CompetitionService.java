package com.example.secondary_springboot.competitions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

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
    // returns a list of all competition names in a given country
    public List<String> getCompetitionsByCountry(String country) {
        return competitionRepository.findAllByCountry(country);
    }

    public Optional<String> findCompetitionIdByCountryAndName(String country, String name) {
        return competitionRepository.findCompetitionIdByCountryAndName(country, name);
    }
}
