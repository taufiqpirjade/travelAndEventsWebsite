package com.mappingJourneys.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "events")
public class Events {
	
	public Events() {
	}

	public Events(int id, String name, String description, Date eventDate,
			String thumbnailimagelink, boolean active, int amount) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.eventdate = eventDate;
		this.thumbnailimagelink = thumbnailimagelink;
		this.active = active;
		this.amount = amount;
	}
	
	@Id
	@NotNull
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
	@NotNull
	private String name;
	
	@Lob 
	private String description;
	
	@Temporal(TemporalType.TIMESTAMP)
	private Date eventdate;
	
	@NotNull
	private String thumbnailimagelink;
	
	@NotNull
	private boolean active;
	
	@NotNull
	private int amount;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getEventDate() {
		return eventdate;
	}

	public void setEventDate(Date eventDate) {
		this.eventdate = eventDate;
	}

	public String getThumbnailimagelink() {
		return thumbnailimagelink;
	}

	public void setThumbnailimagelink(String thumbnailimagelink) {
		this.thumbnailimagelink = thumbnailimagelink;
	}

	public boolean getActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

}
