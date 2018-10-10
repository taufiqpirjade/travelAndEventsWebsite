package com.mappingJourneys.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mappingJourneys.PushNotificationHandler;
import com.mappingJourneys.entity.Description;
import com.mappingJourneys.entity.Events;
import com.mappingJourneys.repositories.DescriptionRepository;
import com.mappingJourneys.repositories.EventsRepository;
import com.mappingJourneys.vo.Postevent;

/**
 * @author admin
 *
 */
@Controller
public class PageLoaderController {
	
	@Autowired
	private EventsRepository eventsRepository;
	
	@Autowired
	private DescriptionRepository descriptionRepository;
	
	@Autowired
	private PushNotificationHandler pushNotificationHandler;
	
	@GetMapping("/")
	public String loadIndex(Model model) {
		return "index";
	}
	
	@GetMapping("/mail")
	public String loadmail(Model model) {
		return "mail";
	} 
	
	@GetMapping("/about")
	public String loadAbout(Model model) {
		return "about";
	}  
	
	@GetMapping("/blog")
	public String loadBlog(Model model) {
		return "blog";
	}  
	
	@GetMapping("/customized")
	public String loadCustomized(Model model) {
		return "customized";
	} 
	
	@GetMapping("/fixeddepartures")
	public String loadFixedDepartures(Model model) {
		return "fixeddepartures";
	}
	
	@GetMapping("/admin") 
	public String loadAdmin(Model model) {
		model.addAttribute("postevent", new Postevent());
		return "admindashboard";
	} 
	
	@GetMapping("/terms_and_conditions")
	public String getTermsAndConditions(Model model) {
		model.addAttribute("postevent", new Postevent());
		return "termsandconditions";
	} 
	
	@PostMapping("/getEventForIndex")
	public @ResponseBody List<Events> getEvents() {
		List<Events> events =(List<Events>) eventsRepository.getEvents(true);
		return events;
	}
	
	@PostMapping("/postevent")
	public @ResponseBody String postEvent(@RequestBody Postevent postevent, Model model) throws ParseException {
	  Events events = new Events();
	  events.setActive(true);
	  events.setName(postevent.getName());
	  events.setDescription(postevent.getDescription());
	  String date = postevent.getDate();
	  Date date1 = new SimpleDateFormat("MM/dd/yyyy").parse(date);
	  events.setEventDate(date1);
	  events.setThumbnailimagelink(postevent.getFile());
	  events.setAmount(Integer.valueOf(postevent.getAmount()));
	  saveEvents(events,postevent.getDescription());
	  pushNotificationHandler.sendPush(postevent.getName());
	  return "/";
	}
	
	@GetMapping("/sendwebsitepush/{eventname}")
	public String sendPush(@PathVariable("eventname") String eventname) {
		pushNotificationHandler.sendPush(eventname);
		return "";
	} 
	
	@Transactional
	public void saveEvents(Events eventsVO,String descriptionString) throws ParseException {
		Events events = eventsRepository.save(eventsVO);
		Description description = new Description();
		description.setEvent_id(events.getId());
		description.setDescription(descriptionString);
		descriptionRepository.save(description);
	}
	  
	@RequestMapping(value = "/getEventDetails/{id}", method = RequestMethod.POST)
	public  @ResponseBody Events getEventDetails(@PathVariable("id") int id) {
		Events event = eventsRepository.getEventDetails(id);
		return event;
	}  
}
