# mp2-todo

## Requirements
This project is built with [Docker](https://www.docker.com/). To run this project with Docker, first you need to create a `password.txt` file in the db folder and a `key.txt` file in the backend folder.

`password.txt` sets the password for the MySQL database, while `key.txt` is used for JWT secret keys.

## Usage
```bash
docker compose -f "docker-compose.yml" up -d --build
```