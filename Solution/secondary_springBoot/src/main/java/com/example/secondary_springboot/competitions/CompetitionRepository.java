package com.example.secondary_springboot.competitions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface CompetitionRepository extends JpaRepository<Competition, Long> {
    @Query("SELECT DISTINCT countryName FROM Competition WHERE countryName IS NOT NULL")
    List<String> findAllDistinctCountries();
    @Query("SELECT c.name FROM Competition c WHERE c.countryName = ?1 AND c.countryName IS NOT NULL")
    List<String> findAllByCountry(String country);
    @Query("SELECT c.competitionId FROM Competition c WHERE c.countryName = :country AND c.name = :name")
    Optional<String> findCompetitionIdByCountryAndName(@Param("country") String country, @Param("name") String name);
}
