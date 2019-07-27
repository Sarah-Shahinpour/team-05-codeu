  // Get ?user=XYZ parameter value
  const urlParams = new URLSearchParams(window.location.search);
  const parameterUsername = urlParams.get('user');
  // URL must include ?user=XYZ parameter. If not, redirect to homepage.
  if (!parameterUsername) {
    window.location.replace('/');
  }
  var imgs = [];
  var imgText = [];
  var like= [];
  var likeCurrent=0;
  var hasLiked= [];
  var messagID=[];
  var currentLong;
  var currentLat;
  var near=true;
  var emotion=true;
  var type="Gossip";
  var distanceApart=2.0;
  var messageFound=false;



  window.addEventListener('beforeunload',(event)=>{
    update();
  })
  function update(){
    console.log("UPDATING");
    var returnText="";
    for(var i=0;i<hasLiked.length;i++){
      if(hasLiked[i]==true){
        console.log("Found Something");
        returnText=returnText+messagID[i]+"_";
        //returnText=returnText+hashFunction(imgText[i])+"_";
      }
    }
    const params = new URLSearchParams();
  //params.append('lat', lat);
  //params.append('lng', lng);
  //params.append('content', content);

    const one = new URLSearchParams();

    one.append('sentText',returnText)
    console.log("About to Fetch");
    fetch('/update', {
      method: 'POST',
      body: one
    });
    console.log("Finished");

  }









  function likeButton(){
    if(hasLiked[likeCurrent]==false){
      document.getElementById("likeButton").style.color = "blue";
      value=like[likeCurrent]+1;
      document.getElementById("likeButton").innerHTML=value;
      like[likeCurrent]=value;
      hasLiked[likeCurrent]=true;
    }
  }

  function unLikeButton(){
    document.getElementById("likeButton").style.color = "black";
  }


  function decode(){
    var words=parameterUsername.split("_");
    if (words.length==4){
      if(words[0]=="notNear"){
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
  //Fetch messages and add them to the slideshow.
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
      var patt1 = /\d/g;
      var patt2 = /\s/g;
      messages.forEach((message) => {
        console.log(message.category);
        console.log("ID IS:"+message.id);
        console.log("LIKE IS:"+message.like);
        //This stores all the messages in an array
        //Don't Take Account of Type!!!, only emotion and Distance
        if(message.text.replace(patt1,'').replace(patt2,'').length){
          



          if(near==true){
            //This means user wants nearby Message
            if(getDistance(currentLong,currentLat,message.longitude,message.latitude)<=distanceApart){
              //This means they are within distanceApart miles away. Currently it is set to two miles.
              //Now check if they want positive or negative messages
              if(emotion && message.score>=0 && message.score<=1.0){

              //This means they want positive messages

              if(message.category==type){
                imgs[count]=messageToImage(type); 
                imgText[count]=message.text;
                like[count]=0;
                hasLiked[count]=false;
                messagID[count]=message.id;
                count=count+1; 
                messageFound=true;
              }

              }
              else if (emotion==false && message.score>=-1.0 && message.score<=0){
                //This means they want negative messages

                if(message.category==type){
                  imgs[count]=messageToImage(type); 
                  imgText[count]=message.text;
                  like[count]=0;
                  hasLiked[count]=false;
                  messagID[count]=message.id;
                  count=count+1;
                  messageFound=true;
                }
              }     
            }
          

          }

          else{
            //This means they don't care about distance preferences
            //This means they want positive messages
            if(emotion && message.score>=0 && message.score<=1.0){
              if(message.category==type){
                imgs[count]=messageToImage(type); 
                imgText[count]=message.text;
                like[count]=0;
                hasLiked[count]=false;
                messagID[count]=message.id;
                count=count+1;
                messageFound=true; 
              }
            }
            //This means they want negative messages
            else if (emotion==false && message.score>=-1.0 && message.score<=0){
              if(message.category==type){
                imgs[count]=messageToImage(type); 
                imgText[count]=message.text;
                like[count]=0;
                hasLiked[count]=false;
                messagID[count]=message.id;
                count=count+1;
                messageFound=true;
              }
            }  
          }
        


        }
      });
      if(messageFound==true){
        initialScreen();
        swal.fire("Stories Were Found!", "Click left or right arrows to cycle through stories", "success");

      }   
      noMessageAlert();
    });
  }
  //Takes in a message and returns the image URL
  function messageToImage(type){
    //gets a random image 400x400
    if(type == "Gossip"){
      return ("http://lorempixel.com/400/400/nightlife");
    }else if(type == "Economy"){
      return ("http://lorempixel.com/400/400/business");
    }else if(type == "Science"){
      return ("http://lorempixel.com/400/400/nature");
    }else{
      return ("http://lorempixel.com/400/400/abstract");
    }
    
  }
  // Fetch data and populate the UI of the page.
  document.addEventListener("keydown", imgCycle, false);
  
  function noMessageAlert(){
    if(messageFound==false){
      var x=document.getElementById("Message Title");
      //x.innerHTML = "No messages to your preferences found";
      swal.fire("Error: No Stories Found!", "Try to change your preferences, uploading a story, and/or trying at a later time", "warning");
    }
  }
  function buildUI(){
    getLocation();
    decode();
    fetchMessages();



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
        likeCurrent=changeImage(-1);
      } else if(event.keyCode == '39'){
        likeCurrent=changeImage(1);
      }
      document.getElementById("likeButton").innerHTML=like[likeCurrent];

      if(hasLiked[likeCurrent]==false){
        console.log("Turning Black");
        unLikeButton();
      }
      else{
        console.log("Turning Blue");
        document.getElementById("likeButton").style.color = "blue";

      }
    }
  }
  function initialScreen(){
    var img = document.getElementById("imgClickAndChange");
    img.src = imgs[0];
    img.style.filter = "blur(1.5px)";
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
    return current;
  }

