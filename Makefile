TEST_DIR = test

setup:
	mkdir -p pgdata
	chmod 700 pgdata
	make run
run:
	docker compose up -d
stop:
	docker compose down
delete:
	docker stop my_postgres
	docker rm my_postgres
teste:
	cd $(TEST_DIR) && npm i && npm start