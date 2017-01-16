Changing settings:
	When changing settings, change both the settings.json file and the server_settings.json file so that the port numbers match between files.

Setting up:
	Run (from domain):
		node server.js 
	Host connects to:
		DOMAIN_NAME:SERVER_PORT/host.html
	Host enables connections.
	Clients connect to:
		DOMAIN_NAME:SERVER_PORT/button.html

Utilizing buzzers:
	Host presses "Enable Buzz".
	Clients' buttons will turn green. Clients press their buzzer.
	Host will receive confirmation on which client pressed their buzzer first.