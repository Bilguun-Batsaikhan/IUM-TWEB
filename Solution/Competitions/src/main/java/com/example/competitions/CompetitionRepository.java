package com.example.competitions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CompetitionRepository extends JpaRepository<Competition, Long> {
    @Query("SELECT DISTINCT countryName FROM Competition WHERE countryName IS NOT NULL")
    List<String> findAllDistinctCountries();
}
