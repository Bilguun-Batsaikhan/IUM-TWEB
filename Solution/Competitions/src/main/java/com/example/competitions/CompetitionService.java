package com.example.competitions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

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
}
