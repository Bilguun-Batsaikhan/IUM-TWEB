package com.example.secondary_springboot.competitions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface CompetitionRepository extends JpaRepository<Competition, Long> {

    // This method returns a list of all distinct country names from the Competition table where the country name is not null
    @Query("SELECT DISTINCT countryName FROM Competition WHERE countryName IS NOT NULL")
    List<String> findAllDistinctCountries();

    // This method returns a list of competition names from the Competition table where the country name matches the provided country and the country name is not null
    @Query("SELECT c.name FROM Competition c WHERE c.countryName = ?1 AND c.countryName IS NOT NULL")
    List<String> findAllByCountry(String country);

    // This method returns the competition ID from the Competition table where the country name and competition name match the provided country and name
    @Query("SELECT c.competitionId FROM Competition c WHERE c.countryName = :country AND c.name = :name")
    Optional<String> findCompetitionIdByCountryAndName(@Param("country") String country, @Param("name") String name);

    // This method returns a list of all distinct competition types (subType) from the Competition table where the subType is not null
    @Query("SELECT DISTINCT subType FROM Competition WHERE subType IS NOT NULL")
    List<String> findAllDistinctCompetitionTypes();
}
