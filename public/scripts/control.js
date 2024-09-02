// const io = $.getScript('../../node_modules/socket.io/socket.io.js');
$(document).ready(function () {
  // $('.textContent').scrollTop = $('.textContent').scrollHeight;
  $(document).scrollTop($(document).height());

  const socket = io();
  let ip = location.host;
  let userN = '';
  let placeholder = $('.inpText');
  let nname = '';

  function playEnter() {
    let playOnEnter = new Audio('../assets/send.mp3');
    playOnEnter.play();
  }

  function playNotif() {
    let playNotif = new Audio('../assets/receive.mp3');
    playNotif.play();
  }
  const newUserConnected = (user) => {
    nname = user || `User${Math.floor(Math.random() * 1000000)}`;
    socket.emit('new user', nname);
  };

  // $('.edwyn').on('click', function () {
  //   user = 'Edwynn';
  //   userClass = 'edwy';
  //   placeholder.attr('placeholder', user);
  // });

  // $('.fulguts').on('click', function () {
  //   user = 'Fulgutsa';
  //   userClass = 'fulgutsa';
  //   placeholder.attr('placeholder', user);
  // });

  // Write in chat
  function chatMessages({ name, text }) {
    let currentDate = new Date();
    let minutes = String(currentDate.getMinutes());
    let hours = String(currentDate.getHours());
    if (hours.length < 2) hours = '0' + hours;
    if (minutes.length < 2) minutes = '0' + minutes;

    const myMsg = `<p class="messenger edwy"><span class="userNameReceiver">${name}</span>${text}<span class="messageHours">${hours}:${minutes}</span></p>`;

    const recMsg = `<p class="messenger fulgutsa"><span class="userNameSender">${name}</span>${text}<span class="messageHours">${hours}:${minutes}</span></p>`;

    const myMsgLink = `<p class="messenger edwy"><span class="userNameReceiver">${name}</span><a href="${text}", target="_blank">${text}</a><span class="messageHours">${hours}:${minutes}</span></p>`;

    const recMsgLink = `<p class="messenger fulgutsa"><span class="userNameSender">${name}</span><a href="${text}", target="_blank">${text}<span class="messageHours">${hours}:${minutes}</span></p>`;

    if (name === nname) {
      if (text.includes('https')) {
        $('.messages').append(myMsgLink);
        playEnter();
      } else {
        $('.messages').append(myMsg);
        playEnter();
      }
    } else {
      if (text.includes('https')) {
        $('.messages').append(recMsgLink);
        playNotif();
      } else {
        $('.messages').append(recMsg);
        playNotif();
      }
    }
    // console.log(text);
    $(document).scrollTop($(document).height());
  }

  // let name = '';

  $('.show').on('keypress', function (e) {
    nname = $('.show').val();
    if (e.which == 13) {
      if (nname == '') {
        return;
      }
      newUserConnected(nname);
      $('.formName').addClass('invisible');
    }
  });

  $('.inpText').on('keypress', function (e) {
    let message = $('.inpText').val();

    if (e.which == 13) {
      if (message == '') {
        return;
      }
      sendMessage({
        name: nname,
        text: message,
      });
      socket.emit('chat message', {
        name: nname,
        text: message,
      });
      // getMessages();
      // .console.log(ip);
      // alert('You pressed enter!');

      //- if (hours.length < 2) hours = '0' + hours;
      //- if (minutes.length < 2) minutes = '0' + minutes;
      //- $('.messages').append(
      //- `<p class="messenger ${userClass}"><span class="${
      //-     userClass == 'edwy' ? 'userNameReceiver' : 'userNameSender'
      //- }">${user}</span>${message}<span class="messageHours">${hours}:${minutes}</span></p>`
      //- );

      // console.log(message);

      $('.inpText').val('');
    }

    function sendMessage(message) {
      $.post(`http://${ip}/api/chat`, message);
    }
  });

  $('.inpText').on('keyup', () => {
    socket.emit('typing', {
      isTyping: $('.inpText').val().length > 0,
      name: nname,
    });
  });

  socket.on('chat message', function (data) {
    chatMessages({ name: data.name, text: data.text });
  });

  socket.on('typing', function (data) {
    const { isTyping, name } = data;

    if (!isTyping) {
      $('.fallback').html('');
      return;
    }

    $('.fallback').html(`<p>${name} is typing...</p>`);
  });
});
