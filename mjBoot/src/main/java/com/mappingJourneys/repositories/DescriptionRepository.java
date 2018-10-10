package com.mappingJourneys.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.mappingJourneys.entity.Description;
import com.mappingJourneys.entity.Events;

public interface DescriptionRepository extends CrudRepository<Description, Integer> {
	

}
