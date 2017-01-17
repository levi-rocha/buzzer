/**
 * 
 */

var wsPort = settings.ws_port;
var serverDomain = settings.server_domain;

var socket;
var sent = 0;
var firstBuzz = 0;
var connectionAccepted = 0;
var connectionsDisabled = 0;
var buzzAudio = [];
var id;
var connectedPlayers = [];

function giveBirthToSocket() {
	socket = new WebSocket("ws:" + serverDomain + ":" + wsPort);

	socket.onopen = function(event) {

	};

	socket.onclose = function(event) {

	};

	// Received a message from the server
	socket.onmessage = function(event) {
		var msg = JSON.parse(event.data);
		switch (msg.label) {
		case 'accepted host connection':
			if (msg.id == id) {
				connectionAccepted = 1;
			} else {
				window.location.href = "connection_refused.html";
			}
			break;
		case 'abort host connection':
			if (msg.id == id) {
				window.location.href = "connection_refused.html";
			}
			break;
		case 'accepted client connection':
			addToConnected(msg.pid);
			break;
		case 'client disconnected':
			removeFromConnected(msg.pid);
			break;
		case 'buzz order':
			var buzzOrder = msg.order;
			setBuzzOrder(buzzOrder);
			break;
		default:
			// Nothing
		}
	};
	setTimeout(function() {
		socket.send(JSON.stringify({
			'id'	: id,
			'label' : 'host connection'
		}));
	}, 500);
}

function addToConnected(pid) {
	connectedPlayers.push(pid);
	refreshConnectedDisplay();
}

function removeFromConnected(pid) {
	var index = connectedPlayers.indexOf(pid);
	if (index > -1) {
		connectedPlayers.splice(index, 1);
	}
	refreshConnectedDisplay();
}

function refreshConnectedDisplay() {
	var content = "<h2>Connected players:</h2>";
	for (var i = 0; i < connectedPlayers.length; i++) {
		content += "<h2>Player "+connectedPlayers[i]+"</h2>";
	}
	$('#players').html(content);
}

function enableBuzz() {
	$('#bstatus').html("<h2 class='enabled'>Buzzers: Enabled</h2>");
	$('#rheader').html("<h1>Buzz order:</h1>");
	$('#order').html("<h2> Waiting for buzzers...</h2>");
	socket.send(JSON.stringify({
		'id'	: id,
		'label' : 'enable buzz'
	}));
}

function disableBuzz() {
	$('#bstatus').html("<h2 class='disabled'>Buzzers: Disabled</h2>");
	socket.send(JSON.stringify({
		'id'	: id,
		'label' : 'disable buzz'
	}));
	
}

function toggleConnections() {
	if (connectionsDisabled) {
		connectionsDisabled = 0;
		$('#togbutt').html("Disable Connections");
	} else {
		connectionsDisabled = 1;
		$('#togbutt').html("Enable Connections");
	}
	socket.send(JSON.stringify({
		'id'	: id,
		'label' : 'toggle connections'
	}));
}

function playBuzzSound(pid) {
	var audioToPlay = 0;
	if (1 <= pid && pid <= 11) {
		audioToPlay = pid;
	}
	buzzAudio[audioToPlay].currentTime=0;
	buzzAudio[audioToPlay].play();
}

function setBuzzOrder(order) {
	if (order.length == 1) {
		playBuzzSound(order[0]);
	}
	var content = "<h1>";
	for (var i = 0; i < order.length; i++) {
		var p = order[i];
		content += String(p);
		if (i < order.length-1) {
			content += " | "
		}
	}
	content += "</h1>";
	$('#order').html(content);
}

function hguid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return 'h' + s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function loadAudioFiles() {
	buzzAudio[0] = new Audio("audio/john-cena.mp3");
	buzzAudio[1] = new Audio("audio/mayushii-tuturu.mp3");
	buzzAudio[2] = new Audio("audio/rengechon-nyanpasu.mp3");
	buzzAudio[3] = new Audio("audio/asuka-antabaka.mp3");
	buzzAudio[4] = new Audio("audio/pikachu-pikachu.mp3");
	buzzAudio[5] = new Audio("audio/yuruyuri-akarin.mp3");
	buzzAudio[6] = new Audio("audio/jojo-ohno.mp3");
	buzzAudio[7] = new Audio("audio/nico-nii.mp3");
	buzzAudio[8] = new Audio("audio/shia-doit.mp3");
	buzzAudio[9] = new Audio("audio/ghost-busters.mp3");
	buzzAudio[10] = new Audio("audio/air-horns.mp3");
	buzzAudio[11] = new Audio("audio/dog-bark.mp3");
}

$(function() {
	id = hguid();
	loadAudioFiles();
	$('#togbutt').on('click', function() {
		toggleConnections();
	});
	$('#enabutt').on('click', function() {
		enableBuzz();
	});
	$('#disbutt').on('click', function() {
		disableBuzz();
	});
	giveBirthToSocket();
});