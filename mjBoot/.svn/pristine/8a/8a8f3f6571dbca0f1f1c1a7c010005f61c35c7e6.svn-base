package com.mappingJourneys.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.mappingJourneys.entity.Events;

public interface EventsRepository extends CrudRepository<Events, Integer> {
	
	@Query(value = "select e from Events e where e.active=:active")
	List<Events> getEvents(@Param("active") boolean active);
	
	
	@Query(value = "select e from Events e where e.id=:id")
	Events getEventDetails(@Param("id") int id);
}
