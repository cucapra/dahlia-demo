#!/bin/bash

set -uex -o pipefail

./custom-js/node_modules/.bin/browserify ./custom-js/index.js -o ./custom-js/bundle.js

mv ./custom-js/bundle.js ./static/js/
