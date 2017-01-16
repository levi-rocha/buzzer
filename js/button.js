/**
 * 
 */

var wsPort = settings.ws_port;
var serverDomain = settings.server_domain;

var socket;
var pid;
var id;

function giveBirthToSocket() 
{	socket = new WebSocket("ws:" + serverDomain + ":" + wsPort);

	socket.onopen = function(event) {

	};

	socket.onclose = function(event) {

	};

	// Received a message from the server
	socket.onmessage = function(event) {
		var msg = JSON.parse(event.data);
		switch (msg.label) {
		case 'accepted client connection':
			if (msg.id == id) {
				pid = msg.pid;
				$('#player').html("<h1>Conncted as Player " + pid + "</h1>");
			}
			break;
		case 'abort player connection':
			if (msg.id == id) {
				window.location.href = "connection_refused.html";
			}
			break;
		case 'enable buzz':
			enableBuzz();
			break;
		case 'disable buzz':
			disableBuzz();
			break;
		default:
			// Nothing
		}
	}
	setTimeout(function() {
		socket.send(JSON.stringify({
			'label' : 'client connection',
			'id'	: id
		}));
	}, 500);
}

function enableBuzz() {
	$("#buzzbutt").attr("src", "img/enabutton.png");
	$("input").prop('disabled', false);
}

function disableBuzz() {
	$("#buzzbutt").attr("src", "img/disbutton.png");
	$("input").prop('disabled', true);
}

function sendBuzz() {
	socket.send(JSON.stringify({
		'label' : 'buzz',
		'pid' : pid
	}));
}

function cguid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return 'c' + s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

$(function() {
	pid = -1;
	id = cguid();
	$('#buzzbutt').on('click', function() {
		sendBuzz();
	});
	giveBirthToSocket();
});