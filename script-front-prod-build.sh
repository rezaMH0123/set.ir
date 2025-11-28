#!/bin/bash

set -e  # Exit immediately if a command exits with a non-zero status.

# git pull
docker build -f Dockerfile --network host --build-arg DOCKER_REGISTRY=$DOCKER_REGISTRY --build-arg NPM_REGISTRY=$NPM_REGISTRY -t set-front-prod .
mkdir ~/frontend || true
docker save -o ~/frontend/frontend.tar set-front-prod
# docker rm -f set-front || true
# docker run --restart always -d --name set-front -p 3004:3000 set-front
