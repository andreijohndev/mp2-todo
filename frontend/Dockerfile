# Build react app
FROM node:alpine AS development

WORKDIR /app
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

# Install dependencies
RUN npm ci
COPY . /app

ENV CI=true
ENV PORT=3000

CMD [ "npm", "start" ]