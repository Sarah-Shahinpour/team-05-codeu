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