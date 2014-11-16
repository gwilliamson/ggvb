REPORTER = list

test:
	clear
	./node_modules/mocha/bin/mocha --recursive --reporter $(REPORTER) test

.PHONY: test