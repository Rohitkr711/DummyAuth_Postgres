## Prisma Setup and configuration

```bash
npx prisma init --datasource-provider postgresql
```

This will create a new folder called "prisma" in the root directory of your project. Inside this folder, you will find the following files:

- `schema.prisma`: This file contains the database schema definition.

## env file

In the root directory of your project, create a file called `.env` and add the following environment variables:

```bash
DATABASE_URL="postgresql://<username>:<password>@<host>:<port>/<database>"
```

## Prisma Client

In your code, you can use the Prisma Client to interact with your database. The Prisma Client is a TypeScript library that allows you to write queries and mutations directly in your JavaScript code.

- create your generator block in prisma file
- create your model in generator file.
- Prisma client is useful for ==giving suggestion== of functions(like findUnique, update etc.) & already created fields of a DB schema during writing code.4

## Prisma Migrations

Prisma migrations allow you to manage the database schema over time. You can use migrations to add or remove fields, tables, or relationships in your database.

```bash
npx prisma migrate dev
```

This command will generate a new migration file and apply it to the database.

## Prisma deploy

```bash
npx prisma migrate deploy
```

This command will apply all pending migrations to the database.

## Formating

```bash
npx prisma format
```

This command will format your Prisma schema file.

## ==*Extra but Imp*==
- Planet scale, Aiven are the alternative of Neon for using postgres.
- Prisma automatically connects with DB we just need to provide DB's URL & DB type.
- In prisma cuid is useful for creating primary key.
