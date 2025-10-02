# .PHONY: gendiff

install:
	npm ci

lint:
	npx eslint .
	
gendiff -h:
	node bin/gendiff.js -h


