.PHONY: build

build: static/js/bundle.js
	hugo

custom-js/node_modules:
	cd custom-js && yarn install

custom-js/bundle.js: custom-js/index.js custom-js/examples.js | custom-js/node_modules
	./custom-js/node_modules/.bin/browserify $< -o $@

static/js/bundle.js: custom-js/bundle.js
	mv $< static/js/bundle.js

