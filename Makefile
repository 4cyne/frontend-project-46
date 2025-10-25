# .PHONY: gendiff

install:
	npm ci

lint:
	npx eslint .

lint--json: 
	npx eslint . --format json
	
publish:
	npm publish --dry-run
	
link:
	npm link

unlink:
	npm unlink

test:
	npm test

test-coverage: 
	npm test -- --coverage