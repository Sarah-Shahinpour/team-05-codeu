  var imgs = [];
  var imgText = [];
 // Fetch messages and add them to the slideshow.
  function fetchMessages(){
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



        imgs[count]=messageToImage(message); 
        //This stores all the messages in an array
        
        imgText[count]=message.text;


        count=count+1;

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
    fetchMessages();
    //var bob=getDistance(-73.946665,40.831498,-73.929216,40.857461);
    //console.log(bob);
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
    var distance=d* 0.00062137;
    return distance;
  }
  
  function rad(x) {
    return x * Math.PI / 180;
  
  }
  function imgCycle(event){
    if(event.keyCode == '37'){
      changeImage(-1);
    } else if(event.keyCode == '39'){
      changeImage(1);
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