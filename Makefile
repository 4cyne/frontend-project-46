# .PHONY: gendiff

install:
	npm ci

lint:
	npx eslint .
	
publish:
	npm publish --dry-run
	
link:
	npm link

unlink:
	npm unlink

