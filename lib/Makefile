
proto: src/v1/messages.json src/v1_1/messages.json src/v2/messages.json src/v3/messages.json

src/v1/messages.json: src/v1/messages.proto
	npx pbjs -t json $< > $@

src/v1_1/messages.json: src/v1_1/messages.proto
	npx pbjs -t json $< > $@

src/v2/messages.json: src/v2/messages.proto
	npx pbjs -t json $< > $@

src/v3/messages.json: src/v3/messages.proto
	npx pbjs -t json $< > $@

publish: proto
	rm -rf dist
	npm run build
	npm publish --dry-run
	echo
	echo "Going to publish if you confirm with <enter>, abort with <ctrl-c>"
	read
	npm publish
