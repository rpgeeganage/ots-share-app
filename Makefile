DOCKER_COMPOSE		:= ./docker-compose.yml

RUN_PROJECT_NAME		:= ots-share-run
RUN_SERVICE_NAME		:= ots-share-run

BUILD_PROJECT_NAME		:= ots-share-build
BUILD_SERVICE_NAME		:= ots-share-build

install: 
	docker-compose -f ${DOCKER_COMPOSE} run --rm --name ${BUILD_PROJECT_NAME} --entrypoint "npm install" ${BUILD_SERVICE_NAME}

build: 
	-docker-compose -f ${DOCKER_COMPOSE} run --rm --name ${BUILD_PROJECT_NAME} --entrypoint "npm run build" ${BUILD_SERVICE_NAME}

up-background upb:
	docker-compose -p ${RUN_PROJECT_NAME} -f ${DOCKER_COMPOSE} up -d ${RUN_SERVICE_NAME}

up-only-api api:
	docker-compose -f ${DOCKER_COMPOSE} run --service-ports --rm --name ${RUN_PROJECT_NAME}-api --entrypoint "npm run app:dev:api" ${RUN_SERVICE_NAME}

connect-to-command-line cmd:
	docker-compose -p ${RUN_PROJECT_NAME} -f ${DOCKER_COMPOSE} exec ${RUN_SERVICE_NAME} /bin/sh

down:
	-docker-compose -p ${BUILD_PROJECT_NAME} down
	-docker-compose -p ${RUN_PROJECT_NAME} down

test:
	docker-compose -f ${DOCKER_COMPOSE} run --rm --name ${BUILD_PROJECT_NAME}-test --entrypoint "npm t" ${BUILD_PROJECT_NAME}

execute:
	docker-compose -f ${DOCKER_COMPOSE} run --service-ports --rm --name ${RUN_PROJECT_NAME}-app --entrypoint "npm run start" ${RUN_SERVICE_NAME}

remove-node-modules rmn:
	@rm -rf ./node_modules
	@rm -rf packages/*/node_modules
	@rm -rf packages/**/*/node_modules

remove-builds rmb:
	@rm -rf packages/*/build
	@rm -rf packages/**/*/build

start: rmn rmb install build execute

clean:
	docker rm $$(docker ps -q -f status=exited)
