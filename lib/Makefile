
proto: v1/messages.json v1_1/messages.json v2/messages.json

v1/messages.json: v1/messages.proto
	npx pbjs -t json $< > $@

v1_1/messages.json: v1_1/messages.proto
	npx pbjs -t json $< > $@

v2/messages.json: v2/messages.proto
	npx pbjs -t json $< > $@
