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

import java.util.UUID;

/** A single message posted by a user. */
public class Message {

  private UUID id;
  private String user;
  private String text;
  private double latitude;
  private double longitude;
  private long timestamp;
  private double score;

  /**
   * Constructs a new {@link Message} posted by {@code user} with {@code text} content. Generates a
   * random ID and uses the current system time for the creation time.
   */
  public Message(String user, String text, double score) {
    this(UUID.randomUUID(), user, text, System.currentTimeMillis(), score);
  }
  
  public Message(String user, String text, double score, double longitude, double latitude ) {
	    this(UUID.randomUUID(), user, text, System.currentTimeMillis(), score,longitude, latitude);
	  }
  

  public Message(UUID id, String user, String text, long timestamp, double score, double longitude, double latitude) {
    this.id = id;
    this.user = user;
    this.text = text;
    this.timestamp = timestamp;
    this.score = score;
    this.longitude=longitude;
    this.latitude=latitude;
    
  }

  public UUID getId() {
    return id;
  }

  public String getUser() {
    return user;
  }

  public String getText() {
    return text;
  }

  public long getTimestamp() {
    return timestamp;
  }

  public double getScore() {
    return score;
  }
  public double getLongitude() {
	    return longitude;
	  }
  public double getLatitude() {
	    return latitude;
	  }
}
