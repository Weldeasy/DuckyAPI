__NOTE:__ This project is still a work in progress. You can already check it out if you're curious. The API may change in the future.

# DuckyAPI

API that interacts with the [WildDuck](https://github.com/nodemailer/wildduck) API. Mostly built as a backend to [DuckyPanel](https://github.com/louis-lau/DuckyPanel).


![We need to go deeper](docs/images/deeper.jpg)

## Why?
In WildDuck a user is a single Email Account, using the api as an end-user you can add address aliases to that inbox. You can not add extra email accounts or manage domain level functionality like DKIM. The aim of DuckyAPI is to offer an end-user API that allows complete management of domains and email accounts within those domains.

## How?
DuckyAPI stores its users in MongoDB, this can be the same instance that you're already using for WildDuck. Each user owns a list of domains, granting permission to manage dkim or add/edit email accounts and forwarders under that domain. Each user can be assigned a package, containing quotas and limits for the user. Currently nothing happens when quota is exceeded, this may change in the future.

Like WildDuck, this application does not depend on memory for anything. Users etc are stored in mongodb, queue management is done in redis. This application is stateless.

## Features
See [DuckyPanel features](https://github.com/louis-lau/DuckyPanel/blob/master/README.md#current-features).

## Dependencies
* Node.js
* MongoDB
* Redis
* WildDuck

## Installation
```bash
$ git clone https://github.com/louis-lau/DuckyAPI.git
$ cd DuckyAPI
$ npm install
```

## Configuration
Copy `config/example.env` to `config/production.env` or `config/development.env` depending on your environment. You must change the configuration for the application to start. If you've misconfigured something the application should tell you on start.

## Usage
```bash
$ npm run clean
$ npm run build
$ npm start

# Create your first admin user, admin users are
# only meant for adding and updating users/packages
$ node dist/cli create-admin <username>
# Create an api key for your admin user
$ node dist/cli create-apikey <username> <keyName>

# Add a normal user using the api, be sure to replace
# the access token with the one you just got from create-apikey
curl -X POST "http://localhost:3000/users" \
-H "Authorization: Bearer YOUR-ACCESS-TOKEN-HERE" \
-H "Content-Type: application/json" \
-d '{"username":"johndoe", "password":"supersecret"}'

# Now use the normal user to log in to DuckyPanel,
# or request an access token from the /authentication endpoint
```

Visit http://localhost:3000/swagger for the rest of the API documentation. You can also try it out live on swagger.
If you want to do something cooler than staring at JSON you can now try configuring [DuckyPanel](https://github.com/louis-lau/DuckyPanel).

![Swagger API documentation screenshot](docs/images/swagger.png)

Any created background tasks and their progress can be viewed on http://localhost:3000/arena with basicauth if you've enabled this in the configuration. Removing an entire domain or suspending a user will trigger a background task.