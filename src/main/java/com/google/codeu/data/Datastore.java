/*
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.google.codeu.data;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Query.SortDirection;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.*;

/** Provides access to the data stored in Datastore. */
public class Datastore {

	private DatastoreService datastore;

	public Datastore() {
		datastore = DatastoreServiceFactory.getDatastoreService();
	}

	/** Stores the Message in Datastore. */
	public void storeMessage(Message message) {
		System.out.println("Store Message\n\n\n");

		Entity messageEntity = new Entity("Message", message.getId().toString());
		messageEntity.setProperty("user", message.getUser());
		messageEntity.setProperty("text", message.getText());
		messageEntity.setProperty("score",message.getScore());
		messageEntity.setProperty("timestamp", message.getTimestamp());
		messageEntity.setProperty("longitude", message.getLongitude());
		messageEntity.setProperty("latitude", message.getLatitude());
		messageEntity.setProperty("category", message.getCategory());
		messageEntity.setProperty("like", message.getLike());
		messageEntity.setProperty("id",message.getId().toString());

		datastore.put(messageEntity);
	}

	/**
	 * Gets messages posted by a specific user.
	 *
	 * @return a list of messages posted by the user, or empty list if user has
	 *         never posted a message. List is sorted by time descending.
	 */

	public Message foundMessage(Entity entity, String user) {
		String idString = entity.getKey().getName();
		UUID id = UUID.fromString(idString);
		String text = (String) entity.getProperty("text");
		long timestamp = (long) entity.getProperty("timestamp");
		double score = (double)entity.getProperty("score");
		double longitude=(double) entity.getProperty("longitude");
		double latitude=(double) entity.getProperty("latitude");

		String category= (String) entity.getProperty("category");
		double like=(double) entity.getProperty("like");
		
		Message message = new Message(id, user, text, timestamp, score,longitude,latitude,category,like);
		return message;
	}

	public List<Message> getMessages(String user) {
		List<Message> messages = new ArrayList<>();
		System.out.println("getMessage\n\n\n");
		// setFiler shouldnt be present because it uses user
		Query query = new Query("Message").setFilter(new Query.FilterPredicate("user", FilterOperator.EQUAL, user))
				.addSort("timestamp", SortDirection.DESCENDING);
		PreparedQuery results = datastore.prepare(query);

		for (Entity entity : results.asIterable()) {
			try {

				messages.add(foundMessage(entity, user));

			} catch (Exception e) {
				System.err.println("Error reading message.");
				System.err.println(entity.toString());
				e.printStackTrace();
			}
		}

		return messages;
	}

	public List<Message> getAllMessages() {
		List<Message> messages = new ArrayList<>();

		Query query = new Query("Message").addSort("timestamp", SortDirection.DESCENDING);
		PreparedQuery results = datastore.prepare(query);

		for (Entity entity : results.asIterable()) {
			try {
				String user = (String) entity.getProperty("user");

				messages.add(foundMessage(entity, user));
			} catch (Exception e) {
				System.err.println("Error reading message.");
				System.err.println(entity.toString());
				e.printStackTrace();
			}
		}

		return messages;
	}

	/** Stores the User in Datastore. */
	public void storeUser(User user) {
		Entity userEntity = new Entity("User", user.getEmail());
		userEntity.setProperty("email", user.getEmail());
		userEntity.setProperty("aboutMe", user.getAboutMe());
		datastore.put(userEntity);
	}

	/**
	 * Returns the User owned by the email address, or null if no matching User was
	 * found.
	 */
	public User getUser(String email) {

		Query query = new Query("User").setFilter(new Query.FilterPredicate("email", FilterOperator.EQUAL, email));
		PreparedQuery results = datastore.prepare(query);
		Entity userEntity = results.asSingleEntity();
		if (userEntity == null) {
			return null;
		}

		String aboutMe = (String) userEntity.getProperty("aboutMe");
		User user = new User(email, aboutMe);

		return user;
	}
	public Message readyToLike(String idFound){
		//f
		List<Message> messages = new ArrayList<>();

		Query query = new Query("Message").addSort("timestamp", SortDirection.DESCENDING);
		PreparedQuery results = datastore.prepare(query);

		for (Entity entity : results.asIterable()) {
			try {
				String user = (String) entity.getProperty("user");

				messages.add(foundMessage(entity, user));
			} catch (Exception e) {
				System.err.println("Error reading message.");
				System.err.println(entity.toString());
				e.printStackTrace();
			}
		}
		//
		for(Message x:messages){
			if(x.getId().toString().equals(idFound)){
				System.out.println("Found id"+idFound);
				//Found it, now we can update it. 
				return x;

			}
		}
		Message temp= new Message("test","test",0,0,0,"test",0);

		return temp;






	}
	public Set<String> getUsers() {
		Set<String> users = new HashSet<>();
		Query query = new Query("Message");
		PreparedQuery results = datastore.prepare(query);
		for (Entity entity : results.asIterable()) {
			users.add((String) entity.getProperty("user"));
		}
		return users;
	}

}
