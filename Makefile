REPORTER = nyan

test:
	clear
	@NODE_ENV=test ./node_modules/mocha/bin/mocha --recursive --reporter $(REPORTER) test

.PHONY: test