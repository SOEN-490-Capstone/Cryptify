# Cryptify

## Getting Started

### Prerequisites

Before you continue, ensure you have installed the following requirements:
- [Docker](https://www.docker.com/)
- [pgAdmin](https://www.pgadmin.org/)
- [yarn](https://classic.yarnpkg.com/en/)

The Cryptify project is setup using a monorepo, so a single repository, that contains all the different software services used in the project. This is done by using yarn workspaces and gives us the advantage of sharing code between our different services and using the same core infrastructure and configuration across all our services.

### Setup

*Note:* On a Linux environment, run all docker and docker-compose commands as `sudo`

#### API

1. Clone the repository
    ```sh
    $ git clone git@github.com:SOEN-490-Capstone/Cryptify.git
    ```
2. Install all dependencies
    ```sh
    $ cd Cryptify
    $ yarn install
    ```
3. Create the docker container and log output
    ```sh
    $ docker-compose up -d api
    $ docker-compose logs -f api
    ```
5. (Optional) Connect to the database on `localhost:5432` in pgAdmin

You can now access the server at http://localhost:3001

Ports:

>    By default, the client, server, database will be exposed on `localhost:3000`, `localhost:3001`, and `localhost:5432`, respectively. If you have a port conflict with either one, change their respective docker-compose entry ports as follows:
> - Client from `3000:19006` to `<new-port>:19006`
> - Server from `3001:80` to `<new-port>:80`
> - Database from `5432:5432` to `<new-port>:5432`.

#### Android Client

1. Install all dependencies
    ```sh
    $ cd Cryptify
    $ yarn install
    ```
2. Start the server and database
    ```sh
    $ docker-compose up -d api
    ```
3. Setup the environment variables required for your client app to talk to the backend api
   1. Make a copy of the `.env.dev` file and rename it to `.env`
   2. Find the ip address of your local machine and enter it on the line for `REACT_APP_API_URL=`
4. Setup `adb` and enable USB debugging on your device by following these [steps](https://reactnative.dev/docs/running-on-device)
5. Export the directory of your Android SDK, if your SDK is installed in the directory metro is expecting this step can be skipped
   ```sh
   $ export ANDROID_HOME=/path/to/Android/Sdk
   ```
6. Start the expo process through the debugger
    ```sh
    $ yarn run client:android:dev
    ```

#### Web Client

1. Install all dependencies
    ```sh
    $ cd Cryptify
    $ yarn install
    ```
2. Start the client, this will also bring up the server and database
    ```sh
    $ docker-compose up -d client
    ```
3. (Optional) Log the output of the client
    ```sh
    $ docker-compose logs -f client
    ```

You can now access the client at http://localhost:3000

### Linting and Formatting

Run linter and formatter with the following command in the root workspace `Cryptify` directory
```sh
$ yarn run lint:fix
```

### Resetting the Database

If you run into issues with the database or need to reset it for any reason follow the steps below

1. Delete the `pgdata` folder, this will delete the persistent docker postgresql volume
2. Start up the server and database through docker
    ```sh
    $ docker-compose up -d api
    ```

## Building for Production

1. Build the docker image with the production target
    ```
    $ docker build --target production -t cryptify-api-prod -f ./packages/docker/api.Dockerfile .
    ```
2. Create a container from the production image
    ```
    $ docker run -p 3001:80 cryptify-api-prod
    ```

## Server

### Style Guide

The server for this project uses the TypeScript language and follows the style guide defined by Google:
https://google.github.io/styleguide/tsguide.html

## Team
| Name                | StudentId  | GitHub Username | email                            |
|---------------------|------------|-----------------|----------------------------------|
| Jason Gerard        | 40079266   | jason-gerard    | jasongerard321@gmail.com         |
| Andre Ibrahim       | 40132881   | Andre-Ibrahim   | andre.khaled.ibrahim@gmail.com   |
| Domenic Seccareccia | 40063021   | domsec          | dom_seccareccia@hotmail.com      |
| Alexandru Bara      | 40132235   | alexbara2000    | alexandrubara2000@gmail.com      |
| Pola Farid          | 40125357   | PolaFarid       | polacris2@gmail.com              |
| Michael Warner      | 40124302   | narroarrow      | michael.gregory.warner@gmail.com |
