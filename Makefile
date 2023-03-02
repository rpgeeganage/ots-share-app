DOCKER_COMPOSE		:= ./docker-compose.yml
DOCKER_COMPOSE_E2E		:= ./docker-compose.e2e.yml

RUN_PROJECT_NAME		:= ots-share-run
RUN_SERVICE_NAME		:= ots-share-run

BUILD_PROJECT_NAME		:= ots-share-build
BUILD_SERVICE_NAME		:= ots-share-build

RUN_NO_DB_PROJECT_NAME		:= ots-share-run-no-db
RUN_NO_DB_SERVICE_NAME		:= ots-share-run-no-db

RUN_E2E_PROJECT_NAME		:= e2e
RUN_E2E_SERVICE_NAME		:= e2e

DEV_E2E_PROJECT_NAME		:= e2e-dev
DEV_E2E_SERVICE_NAME		:= e2e-dev

install: 
	docker-compose -f ${DOCKER_COMPOSE} run --rm --name ${BUILD_PROJECT_NAME} --entrypoint "npm install" ${BUILD_SERVICE_NAME}

build: 
	-docker-compose -f ${DOCKER_COMPOSE} run --rm --name ${BUILD_PROJECT_NAME} --entrypoint "npm run build" ${BUILD_SERVICE_NAME}

upb up-background:
	docker-compose -p ${RUN_PROJECT_NAME} -f ${DOCKER_COMPOSE} up -d ${RUN_SERVICE_NAME}

upbndb up-background-no-db:
	docker-compose -p ${RUN_NO_DB_PROJECT_NAME} -f ${DOCKER_COMPOSE} up -d ${RUN_NO_DB_SERVICE_NAME}

api up-only-api:
	docker-compose -f ${DOCKER_COMPOSE} run --service-ports --rm --name ${RUN_PROJECT_NAME}-api --entrypoint "npm run app:dev:api" ${RUN_SERVICE_NAME}

apindb up-only-api-no-db:
	docker-compose -f ${DOCKER_COMPOSE} run --service-ports --rm --name ${RUN_NO_DB_PROJECT_NAME}-api --entrypoint "npm run app:dev:api" ${RUN_NO_DB_SERVICE_NAME}

cmd connect-to-command-line:
	docker-compose -p ${RUN_PROJECT_NAME} -f ${DOCKER_COMPOSE} exec ${RUN_SERVICE_NAME} /bin/sh

cmdndb connect-to-command-line-no-db:
	docker-compose -p ${RUN_NO_DB_PROJECT_NAME} -f ${DOCKER_COMPOSE} exec ${RUN_NO_DB_SERVICE_NAME} /bin/sh

down:
	-docker-compose -p ${BUILD_PROJECT_NAME} down
	-docker-compose -p ${RUN_PROJECT_NAME} down
	-docker-compose -p ${RUN_NO_DB_PROJECT_NAME} down

test:
	docker-compose -f ${DOCKER_COMPOSE} run --rm --name ${BUILD_PROJECT_NAME}-test --entrypoint "npm t" ${BUILD_PROJECT_NAME}

execute exec:
	docker-compose -f ${DOCKER_COMPOSE} run --service-ports --rm --name ${RUN_PROJECT_NAME}-app --entrypoint "npm run start" ${RUN_SERVICE_NAME}

execute-no-db execndb:
	docker-compose -f ${DOCKER_COMPOSE} run --service-ports --rm --name ${RUN_NO_DB_PROJECT_NAME}-app --entrypoint "npm run start" ${RUN_NO_DB_PROJECT_NAME}

e2e-run:
	-docker-compose -p ${RUN_E2E_PROJECT_NAME} -f ${DOCKER_COMPOSE_E2E} up ${RUN_E2E_SERVICE_NAME} --abort-on-container-exit --exit-code-from ${RUN_E2E_SERVICE_NAME}
	docker-compose -p ${RUN_E2E_PROJECT_NAME} down

e2e-dev:
	docker-compose -f ${DOCKER_COMPOSE_E2E} run --service-ports --rm --name ${DEV_E2E_PROJECT_NAME} ${DEV_E2E_SERVICE_NAME}

remove-node-modules rmn:
	@rm -rf ./node_modules
	@rm -rf packages/*/node_modules
	@rm -rf packages/**/*/node_modules

remove-builds rmb:
	@rm -rf packages/*/build
	@rm -rf packages/**/*/build

start: rmn rmb install build execute
start-no-db: rmn rmb install build execute-no-db
e2e: e2e-run
e2e-dev: e2e-dev

clean:
	docker rm $$(docker ps -q -f status=exited)
