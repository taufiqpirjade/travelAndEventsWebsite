package com.mappingJourneys;

import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Scanner;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;

/**
 * @author Flex-Grow Developers
 * Push notification service
 *
 */
@EnableAsync(proxyTargetClass=true)
@Service
public class PushNotificationHandler {
	
	@Value("${pushnotification.appid}")
	private String appid; 
	
	@Value("${pushnotification.auth}")
	private String auth;
	
	@Value("${pushnotification.url}")
	private String pushUrl; 
	
	public void sendPush(String eventname){
		try {
			   String jsonResponse;
			   
			   URL url = new URL(pushUrl);
			   HttpURLConnection con = (HttpURLConnection)url.openConnection();
			   con.setUseCaches(false);
			   con.setDoOutput(true);
			   con.setDoInput(true);
	
			   con.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
			   con.setRequestProperty("Authorization", "Basic"+" "+auth+"");
			   con.setRequestMethod("POST");
			   String strJsonBody = "";
			   
				  strJsonBody = "{"
		                      +   "\"app_id\": \""+appid+"\","
		                      +   "\"included_segments\": [\"All\"],"
		                      +   "\"data\": {\"foo\": \"bar\"},"
		                      +   "\"contents\": {\"en\": \""+eventname+"\"}"
		                      + "}";
			   
			   
			   System.out.println("strJsonBody:\n" + strJsonBody);
	
			   byte[] sendBytes = strJsonBody.getBytes("UTF-8");
			   con.setFixedLengthStreamingMode(sendBytes.length);
	
			   OutputStream outputStream = con.getOutputStream();
			   outputStream.write(sendBytes);
	
			   int httpResponse = con.getResponseCode();
			   System.out.println("httpResponse: " + httpResponse);
	
			   if (  httpResponse >= HttpURLConnection.HTTP_OK
			      && httpResponse < HttpURLConnection.HTTP_BAD_REQUEST) {
			      Scanner scanner = new Scanner(con.getInputStream(), "UTF-8");
			      jsonResponse = scanner.useDelimiter("\\A").hasNext() ? scanner.next() : "";
			      scanner.close();
			   }
			   else {
			      Scanner scanner = new Scanner(con.getErrorStream(), "UTF-8");
			      jsonResponse = scanner.useDelimiter("\\A").hasNext() ? scanner.next() : "";
			      scanner.close();
			   }
			   System.out.println("jsonResponse:\n" + jsonResponse);
			   
			} catch(Throwable t) {
			   t.printStackTrace();
			}
	}
}
