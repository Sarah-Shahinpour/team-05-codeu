  /*
     //This stores all the messages in an array
        if(near==true){
        //Pick Nearby Messages Only
        if(getDistance(currentLong,currentLat,message.longitude,))
        }
        else{
        //Every Message
        imgs[count]=messageToImage(message); 
        imgText[count]=message.text;
        count=count+1;
        }

*/


  // Get ?user=XYZ parameter value
  const urlParams = new URLSearchParams(window.location.search);
  const parameterUsername = urlParams.get('user');
  // URL must include ?user=XYZ parameter. If not, redirect to homepage.
  if (!parameterUsername) {
    window.location.replace('/');
  }
  var imgs = [];
  var imgText = [];
  var currentLong;
  var currentLat;
  var near=true;
  var emotion=true;
  var type="Gossip";
  var distanceApart=2.0;
  var messageFound=false;

  function decode(){
    var words=parameterUsername.split("_");
    if (words.length==4){
      if(near=="notNear"){
      near=false;
      }
      if(words[1]=="negative"){
        emotion=false;
      }

      type=words[2];
    }
    else{
      console.log("NOOOO")
      window.location.replace('/');

    }
  }
  function getLocation() {
    var x=document.getElementById("Message Title");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }




  function showPosition(position) {
    currentLong=position.coords.longitude;
    currentLat=position.coords.latitude;
  }
 // Fetch messages and add them to the slideshow.
  function fetchMessages(){
  
  /*
  var imgs = [];
  var imgText = [];
  var currentLong;
  var currentLat;
  var near=true;
  var emotion=true;
  var type="Gossip";
  function getDistance(long1, lat1,long2,lat2) 
*/

    const url = '/feed';
    fetch(url).then((response) => {
      return response.json();
    }).then((messages) => {
      const messageContainer = document.getElementById('message-container');
      if(messages.length == 0){
       messageContainer.innerHTML = '<p>There are no posts yet.</p>';
      }
      else{
       messageContainer.innerHTML = '';
      }
      var count=0;
      messages.forEach((message) => {
       //This stores all the messages in an array
       //Don't Take Account of Type!!!, only emotion and Distance
        if(near==true){
          //This means user wants nearby Message
          if(getDistance(currentLong,currentLat,message.longitude,message.latitude)<=distanceApart){
            //This means they are within distanceApart miles away. Currently it is set to two miles.
            //Now check if they want positive or negative messages
            if(emotion && message.score>=0 && message.score<=1.0){
              //This means they want positive messages
            imgs[count]=messageToImage(message); 
            imgText[count]=message.text;
            count=count+1; 
            messageFound=true;

            }
            else if (emotion==false && message.score>=-1.0 && message.score<=0){
              //This means they want negative messages
              imgs[count]=messageToImage(message); 
              imgText[count]=message.text;
              count=count+1;
              messageFound=true;
            }     
          }
        

        }

        else{
          //This means they don't care about distance preferences

          //This means they want positive messages
            if(emotion && message.score>=0 && message.score<=1.0){

            imgs[count]=messageToImage(message); 
            imgText[count]=message.text;
            count=count+1;
            messageFound=true; 

            }
            //This means they want negative messages
            else if (emotion==false && message.score>=-1.0 && message.score<=0){
            imgs[count]=messageToImage(message); 
            imgText[count]=message.text;
            count=count+1;
            messageFound=true;
            }  
        }

      

      });
      initialScreen();    
    });
  }
  //Takes in a message and returns the image URL
  function messageToImage(message){
    //gets a random image 400x400
    return ("http://lorempixel.com/400/400");
  }
  // Fetch data and populate the UI of the page.
  document.addEventListener("keydown", imgCycle, false);
  function buildUI(){
    getLocation();
    decode();
    fetchMessages();
    //var bob=getDistance(-73.946665,40.831498,-73.929216,40.857461);
    //console.log(bob);
    console.log("URLParams:" +urlParams);
    console.log("----");
    //This one would have what is next to the equals sign. The User's input.
    console.log("URLParams:" +parameterUsername);


  }
  //Used Haversine formula located here: https://stackoverflow.com/questions/1502590/calculate-distance-between-two-points-in-google-maps-v3
  //With some modifications to the code
  function getDistance(long1, lat1,long2,lat2) {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = rad(lat2 - lat1);
    var dLong = rad(long2 - long1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(lat1)) * Math.cos(rad(lat2)) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    //return d; // returns the distance in meter
    //Distance is distance in miles now
    var distance=d* 0.00062137;
    return distance;
  }
  function rad(x) {
    return x * Math.PI / 180;
  }
  function imgCycle(event){
    if(messageFound==true){
      if(event.keyCode == '37'){
        changeImage(-1);
      } else if(event.keyCode == '39'){
        changeImage(1);
      }
    }
  }
  function initialScreen(){
    var img = document.getElementById("imgClickAndChange");
    img.src = imgs[0];
    var messageText = document.getElementById("messageText");
    messageText.innerHTML = imgText[0];
  }
  var current=0;
  function changeImage(dir){
    var img = document.getElementById("imgClickAndChange");
    //img.src = imgs[imgs.indexOf(img.src) + (dir || 1)] || imgs[dir ? imgs.length - 1 : 0];
    var messageText = document.getElementById("messageText");
    //messageText.innerHTML = imgText[imgText.indexOf(messageText.innerHTML) + (dir || 1)] || imgText[dir ? imgText.length - 1 : 0];
    if(dir==1){
      //Going Right
      //0 1 2 3     Current ranges between it, length is 3
      if(current==imgText.length-1){
        current=0;
      }
      else{
        current=current+1;
      }
    }
    else{
      //Going Left
      if(current==0){
        current=imgText.length-1;
      }
      else{
        current=current-1;
      } 
    } 
  img.src = imgs[current];
  messageText.innerHTML = imgText[current];
  }

