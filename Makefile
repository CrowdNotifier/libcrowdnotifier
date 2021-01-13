build:
	make -C lib proto
	make -C app proto
	cd lib && npm run build
	cd app && npm run build

lint:
	cd lib && npm run lint:fix
	cd app && npm run lint:fix

publish:
	cd lib && make publish
	cd app && make publish
