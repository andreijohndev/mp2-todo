# mp2-todo

## Requirements
This project is built with [Docker](https://www.docker.com/). To run this project with Docker, first you need to create a `password.txt` file in the db folder.

`password.txt` sets the password for the MySQL database.

## Usage
```bash
docker compose -f "docker-compose.yml" up -d --build
```