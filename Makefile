all: deps
	node_modules/.bin/http-server

node_modules: package.json
	@npm install

deps: node_modules js/config.js scripts/fetch.js
	@node scripts/fetch.js

deps_clean: clean deps
	@rm -rf node_modules

clean:
	@rm -rf js/deps
	@rm -rf node_modules
