buildDev:
	docker-compose up --build
runDev:
	docker-compose up 
dropDev:
	docker-compose down 

migrate:
	docker exec ot125-server npx sequelize-cli db:migrate
seed:
	docker exec ot125-server npx sequelize-cli db:seed:all


.PHONY: buildDev runDev dropDev migrate
