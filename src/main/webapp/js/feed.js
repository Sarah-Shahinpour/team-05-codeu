 // Fetch messages and add them to the page.
  function fetchMessages(){
    const url = '/feed';
    //In this commented section I tried iterating through the message 
    //objects differently where it would return an array of 
    //the image URLs

    // var response = fetch(url).json();
    // //This will be a list of the message URLs to put in the slider
    // var messageImages = [];
    // for (var message in response){
    //   messageImages.push(messageToImage(message));
    // }
    // return messageImages; 

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

      //This will be a list of the message URLs to put in the slider
      messages.forEach((message) => {
        imgs.push(messageToImage(message)); 
      });
    });
  }

  //Takes in a message and returns the image URL
  function messageToImage(message){
    //This is one method where it would create an image using canvas
    // var canvas = document.createElement("CANVAS");
    // canvas.fillstyle = "red";
    // var dataURL = canvas.toDataURL("image/png");
    // return dataURL;
    
    //The rest of this function grabs a random image from flickr we could
    //possibly use as a background. I saw this code a few times when
    //I was searching online
    var keyword = "mountains";

    $(document).ready(function(){

        $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
        {
            tags: keyword,
            tagmode: "any",
            format: "json"
        },
        function(data) {
            var rnd = Math.floor(Math.random() * data.items.length);

            var image_src = data.items[rnd]['media']['m'].replace("_m", "_b");

        });

    });
    return ('" + image_src + "');
  }

  // Fetch data and populate the UI of the page.
  function buildUI(){
   //fetchMessages();
  }


  var imgs = [];
  fetchMessages();
  document.addEventListener("keydown", imgCycle, false);

  function imgCycle(event){
    if(event.keyCode == '37'){
      changeImage(-1);
    } else if(event.keyCode == '39'){
      changeImage();
    }
  }

  function changeImage(dir){
    var img = document.getElementById("imgClickAndChange");
    img.src = imgs[imgs.indexOf(img.src) + (dir || 1)] || imgs[dir ? imgs.length - 1 : 0];
  }

    
