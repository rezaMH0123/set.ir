ARG DOCKER_REGISTRY
FROM ${DOCKER_REGISTRY}/node:22-alpine

WORKDIR /app
COPY package*.json ./
ARG NPM_REGISTRY
RUN echo "registry=${NPM_REGISTRY}" > ./.npmrc
RUN npm config set fetch-retry-maxtimeout 60000 -g
RUN npm install --verbose
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]