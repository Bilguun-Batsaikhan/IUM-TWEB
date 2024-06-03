let name = null;
let roomNo = null;
let chat= io.connect('/chat');

function init() {
   document.getElementById('initial_form').style.display = 'block';
   document.getElementById('chat_interface').style.display = 'none';
   checkLogin();
}

function checkLogin(){
      const itemStr = localStorage.getItem('nicknameData');
      const item = JSON.parse(itemStr);
      const now = new Date();
      let time = now.getTime();

      if (!item || (time - item.timestamp) > 220000) {
         localStorage.removeItem('nicknameData');
         console.log("You are not logged!");
         window.location.href = '/login';
      } else {
         console.log("Welcome " + item.nickname);
         name = item.nickname;
         console.log(item.nickname);

          sendAxiosQuery('/chat');
          initChatSocket();
      }
}


/**
 * it initialises the socket for /chat
 */
function initChatSocket() {
   // called when someone joins the room. If it is someone else it notifies the joining of the room
   chat.on('joined', function (room, userId) {
      if (userId === name) {
         // it enters the chat
         hideLoginInterface(room, userId);
      } else {
         // notifies that someone has joined the room
         writeOnChatHistory('<b>' + userId + '</b>' + ' joined room ' + room);
      }
   });
   // called when a message is received
   chat.on('chat', function (room, userId, chatText) {
      let who = userId
      if (userId === name) who = 'Me';
      writeOnChatHistory('<b>' + who + ':</b> ' + chatText);
   });

}



/**
 * called when the Send button is pressed. It gets the text to send from the interface
 * and sends the message via  socket
 */
function sendChatText() {
   let chatText = document.getElementById('chat_input').value;
   chat.emit('chat', roomNo, name, chatText);
}

/**
 * used to connect to a room. It gets the user name and room number from the
 * interface
 * It connects both chat and news at the same time
 */
function connectToRoom() {
    roomNo = document.getElementById('roomNo').value;

    if (roomNo === "null")
        alert("Please select a room before proceeding.");
    else
       chat.emit('create or join', roomNo, name);
}

/**
 * it appends the given html text to the history div
 * @param text: teh text to append
 */
function writeOnChatHistory(text) {
   let history = document.getElementById('chat_history');
   let paragraph = document.createElement('div');
   paragraph.innerHTML = text;
   paragraph.classList.add('chat-message');
    var mytext = '<b>' + 'Me' + ':</b> ';

    if (text.startsWith(mytext)) {
        paragraph.classList.add('my-message');
        paragraph.classList.add('force-text-right');
    } else {
        paragraph.classList.add('others-message');
    }

   history.appendChild(paragraph);
   document.getElementById('chat_input').value = '';
    var chatHistory = document.getElementById('chat_history');
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

/**
 * it appends the given html text to the history div
 * @param text: teh text to append
 */
function writeOnNewsHistory(text) {
   let history = document.getElementById('news_history');
   let paragraph = document.createElement('p');
   paragraph.innerHTML = text;
   history.appendChild(paragraph);
   document.getElementById('news_input').value = '';
}

/**
 * it hides the initial form and shows the chat
 * @param room the selected room
 * @param userId the user name
 */
function hideLoginInterface(room, userId) {
   document.getElementById('initial_form').style.display = 'none';
   document.getElementById('chat_interface').style.display = 'block';
   document.getElementById('who_you_are').innerHTML= name;
   document.getElementById('in_room').innerHTML= ' '+room;
   console.log("name: "+ name);
}

function sendAxiosQuery(url){
   axios.post(url)
       .then(function (dataR) {
          // it updates the select with the list of rooms
          var clubNames = dataR.data.clubNames;
          //console.log(clubNames);
          var select = document.getElementById('roomNo');
          select.innerHTML = '';
          for(var i = 0; i < clubNames.length; i++) {
             var option = document.createElement('option');
             option.value = clubNames[i];
             option.textContent = clubNames[i];
             select.appendChild(option);
          }
       })
       .catch(function (error) {
           console.error('Error in Axios request:', error);
           document.getElementById('error').classList.remove('d-none');
       });
}


