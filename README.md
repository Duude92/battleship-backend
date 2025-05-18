# Battleship game websocket server

This project is a websocket server backend for [battleship rs.chool frontend](https://github.com/rolling-scopes-school/websockets-ui).
It designed as session-based backend, which supports multiple simultaneous session games. It features player-versus-player, or player-versus-bot modes.

## Features

 - Player vs Player sessions
 - Player vs Bot sessions
 - Multiple sessions simultaneously
 - Winners table
 - Random attacks

## Requirments

Node.js v22.14.0 or higher

## Installation

1. Clone this repository with command `git clone -b dev --recursive https://github.com/Duude92/battleship-backend.git` to checkout directly dev branch and clone front-end submodule
2. Run `npm install` from local project directory to install dependencies.
3. Rename .env.example to .env to provide application settings

## Usage

Start service with following commands:
If you cloned repository without front-end submodule, checkout to dev branch, and run command: `git submodule update --init --recursive`
- `npm run start:front` to run front-end service
- `npm run start:dev` to run backend service in development mode
- `npm run start:prod` to build & run backend service in production mode

## Licensing

This project is available under the MIT License.
