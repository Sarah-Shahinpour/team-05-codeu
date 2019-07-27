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


	private Datastore datastore;

	@Override
	public void init() {
		datastore = new Datastore();
	}



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
	 	String currentWord="";
		int currentIndex=0;

		while(output.length()>0){
			currentIndex=output.indexOf('_');
			currentWord=output.substring(0,currentIndex);
			System.out.println(currentWord);

			updateWord(currentWord);
			//datastore.checkingMessage(currentWord);
			output=output.substring(currentIndex+1);
			System.out.println("Length now is:"+output.length());
	  }


		System.out.println("\n\n\n\n\n -------------------FINISHED UPDATE \n\n\n\n");


		}
		public void updateWord(String id){

			//datastore.storeMessage(message);

			Message wordMessage=datastore.readyToLike(id);
			
			if(wordMessage.getCategory().equals("test")){

			}
			else{
				//Now I have access to it, I need to make it a copy, increment, then create a entitiy for it
				Message copyMessage= new Message(wordMessage.getUser(),wordMessage.getText(),wordMessage.getScore(),wordMessage.getLongitude(),wordMessage.getLatitude(),wordMessage.getCategory(),wordMessage.getLike());

				copyMessage.setLike(copyMessage.getLike()+1);
				copyMessage.setId(wordMessage.getId());
				datastore.storeMessage(copyMessage);
			}




			//f

			//f
	}
	public double hashFunction(String x){
		int hash = 7;
		for (int i = 0; i < x.length(); i++) {
    		hash = hash*31 + x.charAt(i);
		}
		return hash;
	}
}
