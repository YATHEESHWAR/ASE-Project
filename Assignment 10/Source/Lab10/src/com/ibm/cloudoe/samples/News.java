package com.ibm.cloudoe.samples;
 
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@Path("/news")
public class News {
 
	@GET
	@Path("{category}")
	public Response getMsg(@PathParam("category") String category) throws IOException, Exception {
		StringBuilder result = new StringBuilder();
		String urlToRead = "https://gateway-a.watsonplatform.net/calls/data/GetNews"
				+ "?apikey=0841f9bb26eac105e6a99b5c8afb4f223e2f47b8&"
				+ "outputMode=json&start=now-1d&end=now&count=10&"
				+ "q.enriched.url.enrichedTitle.taxonomy.taxonomy_=|label="+category+","
				+ "score=%3E0.4|&return=enriched.url.url,enriched.url.title,enriched.url.text";
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
	      JSONObject resultjson = (JSONObject) json.get("result");
	      org.json.simple.JSONArray resultlist = (org.json.simple.JSONArray) resultjson.get("docs");
	      JSONArray outputArray = new JSONArray();
	      for (int i = 0; i < resultlist.size(); i++) {
	    	  JSONObject temp1 =(JSONObject) resultlist.get(i);
	    	  JSONObject source = (JSONObject) temp1.get("source");
	    	  JSONObject enriched = (JSONObject) source.get("enriched");
	    	  JSONObject urlobject = (JSONObject) enriched.get("url");
	    	  JSONObject out = new JSONObject();
	    	  out.put("title", urlobject.get("title"));
	    	  out.put("url", urlobject.get("url"));
	    	  outputArray.add(out);
	    	}
	      JSONObject output = new JSONObject();
	      output.put("results", outputArray);
	    rd.close();
		return Response.status(200).entity(output.toString()).build();
	}
 
}