publish: 
	rm -rf dist
	npm run build
	npm publish --dry-run
	echo
	echo "Going to publish if you confirm with <enter>, abort with <ctrl-c>"
	read
	npm publish 
