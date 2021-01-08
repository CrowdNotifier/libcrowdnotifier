lint:
	cd lib && npm run lint:fix
	cd app && npm run lint:fix

publish:
	cd lib && make publish
	cd app && make publish
