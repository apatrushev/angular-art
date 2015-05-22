all: js/deps run

run: node_modules
	/bin/bash -c 'sleep 1; open http://127.0.0.1:8080'
	node_modules/.bin/http-server

node_modules: package.json
	@npm install

js/deps: node_modules js/config.js scripts/fetch.js
	@node scripts/fetch.js

dist: clean js/deps
	@rm -rf node_modules

clean:
	@rm -rf js/deps
	@rm -rf node_modules
