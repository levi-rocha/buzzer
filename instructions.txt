Changing settings:
	When changing settings, make sure values are the same in both settings.json and server_settings.json.

Setting up (requires node.js installed):
	Run (from domain):
		node server.js 
	Open host view on browser:
		DOMAIN_NAME:SERVER_PORT/host.html
	Each client (buzzer) connects to:
		DOMAIN_NAME:SERVER_PORT/button.html

Utilizing buzzers:
	Host presses "Enable Buzzers".
	Clients' buttons will turn green. Clients press their buzzer.
	Host view will display the order in which the buzzers were pressed.
	A soundbyte corresponding to the first player to press the buzz will be played on the host view.
	
