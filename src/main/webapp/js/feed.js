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


  function changeImage(dir){
    var img = document.getElementById("imgClickAndChange");
    img.src = imgs[imgs.indexOf(img.src) + (dir || 1)] || imgs[dir ? imgs.length - 1 : 0];
    var messageText = document.getElementById("messageText");
    messageText.innerHTML = imgText[imgText.indexOf(messageText.innerHTML) + (dir || 1)] || imgText[dir ? imgText.length - 1 : 0];
  }