# Server Base - Proyecto ONG

## Envinroment setup

1. Create database
2. Copy .env.example to .env and fill with database credentials.

To install dependencies, run

```bash
npm install
```

3. Migrations:

```bash
npx sequelize-cli db:migrate
```

4. Seeders:

```bash
npx sequelize-cli db:seed:all
```

## Start local server

```bash
npm start
```

## Testing

#### running tests

```bash
npm run preTest
npm run test
```

##### seeds

Users seeded:

1. 10 admin users with credentials:

- email: test{1-10}@test.com
- password: 1234

2. 10 standard users with credentials:

- email: test{11-20}@test.com
- password: 1234

## Docker

- Copy docker.env.example to docker.env and fill with corresponding credentials.

- Start with `make runDev` or `make runBuild` (rebuilds containers)

- Migrations:

```bash
make migrate
```

- Seeds:

```bash
make seed
```
