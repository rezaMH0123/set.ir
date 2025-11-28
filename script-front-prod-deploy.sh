#!/bin/bash

set -e  # Exit immediately if a command exits with a non-zero status.

# git pull
# docker build -f Dockerfile.prod -t set-front .
docker load -i /home/setrebornsrv/frontend/frontend.tar
docker rm -f set-front || true
docker run --restart always -d --name set-front -p 3004:3000 set-front-prod
