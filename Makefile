install:
	@if [ -f "cypress.json" ]; then\
		echo "\033[33mSkipping copy:\033[0m The file \033[36mcypress.json\033[0m \033[33malready exists\033[0m";\
	else\
		cp cypress.json.dist cypress.json ||:;\
		echo "\033[32mSuccessful:\033[0m Created \033[36mcypress.json\033[0m from \033[36mcypress.json.dist\033[0m";\
	fi

	npm install

launch:
	npx cypress open
	
run:
	npx cypress run --reporter mochawesome \
	&& npx mochawesome-merge cypress/report/mochawesome-report/*.json > cypress/report/output.json \
	&& npx marge cypress/report/output.json --reportDir ./ --inline \
	&& open ./output.html