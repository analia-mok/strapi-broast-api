# Strapi Broast API

A Strapi implementation of my older [Broast](https://github.com/analia-mok/broast) - a trade coffee
distribution company's - api.

Corresponding NextJS Front-End: _Coming Soon_

## Setup Instruction
1. Clone this repo
2. Run `yarn install`
3. Setup a Postgres v12 database. This project comes with a simple [lando](https://docs.lando.dev/) configuration to spin one up for you. Simply run `lando start` and use `lando info -s database` to get your database credentials. (Make sure to use the external connection).
4. Copy the `.env.example` file to create you `.env` file. __NOTE__: If using the lando configuration,
know that the external port changes dynamically. Make sure that the `DATABASE_PORT` matches your running database port on each start up.
5. If all configured, run `yarn run develop`. You should now have a running Strapi installation of the Broast API.

## Deployment Instructions
Make sure to follow your hosting provider's instruction on Strapi's official documentation: https://strapi.io/documentation/v3.x/getting-started/deployment.html

This project is pre-configured to use [Cloudinary](https://cloudinary.com/) for media storage when in __production__. All other environments will default to the local filesystem.
