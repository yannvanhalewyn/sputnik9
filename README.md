# Sputnik 9

This is the repo for the [Spuntik9](https://www.sputnik9.nl) website.

## Installation

For local setup, clone the repo, make sure mongodb is running on default port 21017. Then
you should create a `.env` file and supply the values. There is an example env file

`$ cp .env.example .env`

Next install all the packages

`$ npm install`

And compile the assets

`$ gulp build:production`

You can seed the database with some data. Note that all data that is supposed to
be paid is not included as seed in this repo.

`$ ./scripts/seed`

The seed added an admin user. Admin credentials are

- **email**: *admin@example.com*
- **password**: *adminpassword*

Start up the server using `$ npm start`. This uses nodemon. If you don't have
nodemon installed you can run `$ node -r dotenv/config ./bin/server`

Now go to *localhost:3000/admin* and add an entry for the premium page.

## Deploying

Flightplan is in charge of deploying. Flightplan uses `git ls-files` and rsyncs
those to the server, so don't think any uncommited changes won't fly away.
`flightplan.js` contains the deploy script that is to be run locally and
remotely. You can deploy using `$ fly production` to the DigitalOcean droplet, or
start up a vm using vagrant (`$ vagrant up`) and deploy to that box with `$ fly vm`.
