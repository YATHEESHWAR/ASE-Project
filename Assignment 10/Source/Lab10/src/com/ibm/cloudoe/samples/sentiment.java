package com.ibm.cloudoe.samples;
 
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@Path("/sentiment")
public class sentiment {
 
	@GET
	@Path("{input}")
	public Response getMsg(@PathParam("input") String input) throws IOException, Exception {
		StringBuilder result = new StringBuilder();
		String urlToRead = "http://gateway-a.watsonplatform.net/calls/text/TextGetTextSentiment"
				+ "?apikey=0841f9bb26eac105e6a99b5c8afb4f223e2f47b8&outputMode=json&text="+URLEncoder.encode(input, "UTF-8");
		System.out.println(urlToRead);
	      URL url = new URL(urlToRead);
	      HttpURLConnection conn = (HttpURLConnection) url.openConnection();
	      conn.setRequestMethod("GET");
	      BufferedReader rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
	      String line;
	      while ((line = rd.readLine()) != null) {
	         result.append(line);
	      }
	      JSONObject json = (JSONObject)new JSONParser().parse(result.toString());
	      JSONObject docSentiment = (JSONObject) json.get("docSentiment");
	      rd.close();
		return Response.status(200).entity(docSentiment.toString()).build();
	}
 
}