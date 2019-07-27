package com.google.codeu.servlets;

import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.codeu.data.Datastore;
import com.google.codeu.data.Message;
import com.google.gson.Gson;
import java.io.IOException;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.jsoup.Jsoup;
import org.jsoup.safety.Whitelist;

import com.google.cloud.language.v1.Document;
import com.google.cloud.language.v1.LanguageServiceClient;
import com.google.cloud.language.v1.Sentiment;

/** Handles fetching and saving {@link Message} instances. */
@WebServlet("/update")
public class UpdateLike extends HttpServlet {



	@Override
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
	String output=request.getParameter("sentText");
	System.out.println("Get");
	System.out.println(output);
	}

	@Override
	public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
	String output=request.getParameter("sentText");
	System.out.println("Post");
	System.out.println(output);	

	}
	public double hashFunction(String x){
		int hash = 7;
		for (int i = 0; i < x.length(); i++) {
    		hash = hash*31 + x.charAt(i);
		}
		return hash;
	}
}
