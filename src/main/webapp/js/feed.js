 // Fetch messages and add them to the page.
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
      messages.forEach((message) => {
       const messageDiv = buildMessageDiv(message);
       messageContainer.appendChild(messageDiv);
      });
    });
  }

  function buildMessageDiv(message){
   const usernameDiv = document.createElement('div');
   usernameDiv.classList.add("left-align");
   usernameDiv.appendChild(document.createTextNode(message.user));

   const timeDiv = document.createElement('div');
   timeDiv.classList.add('right-align');
   timeDiv.appendChild(document.createTextNode(new Date(message.timestamp)));

   const headerDiv = document.createElement('div');
   headerDiv.classList.add('message-header');
   headerDiv.appendChild(usernameDiv);
   headerDiv.appendChild(timeDiv);

   const bodyDiv = document.createElement('div');
   bodyDiv.classList.add('message-body');
   bodyDiv.appendChild(document.createTextNode(message.text));

   const messageDiv = document.createElement('div');
   messageDiv.classList.add("message-div");
   messageDiv.appendChild(headerDiv);
   messageDiv.appendChild(bodyDiv);

   return messageDiv;
  }

  // Fetch data and populate the UI of the page.
  function buildUI(){
   fetchMessages();
  }

  var imgs = ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQcFxcDSZWY92zdxEtntOW-nF3DWBFZww9jSjj740LmE22z2iy",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyj7x-LZMI6Gb-kZsbFVsRD5tZsqepp_PdqrX0PEnRINeFqyEW",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtqKb83jtoOxZMaVp66yopGaWWzTVImiK2M25CZSucfNPiy8YV"];

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
