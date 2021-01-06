
proto: src/v1/messages.json src/v1_1/messages.json src/v2/messages.json

src/v1/messages.json: src/v1/messages.proto
	npx pbjs -t json $< > $@

src/v1_1/messages.json: src/v1_1/messages.proto
	npx pbjs -t json $< > $@

src/v2/messages.json: src/v2/messages.proto
	npx pbjs -t json $< > $@
