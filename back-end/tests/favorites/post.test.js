const database = require("../setup");

describe("POST /favorites", () => {
  beforeAll(async () => {
    await database.query('DROP TABLE IF EXISTS favorites;');
    await database.query('DROP TABLE IF EXISTS users;');
    await database.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(50) NOT NULL,
        password VARCHAR(50) NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updateAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await database.query(`
      CREATE TABLE favorites (
        id SERIAL PRIMARY KEY,
        "externalId" VARCHAR(50) NOT NULL,
        title VARCHAR(50) NOT NULL,
        price VARCHAR(50) NOT NULL,
        category VARCHAR(50) NOT NULL,
        description VARCHAR(1000) NOT NULL,
        image VARCHAR(50) NOT NULL,
        "userId" INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updateAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await database.query('CREATE INDEX ON favorites("userId");');
  });

  afterAll(async () => {
    await database.query('DROP TABLE IF EXISTS favorites;');
    await database.query('DROP TABLE IF EXISTS users;');
  });

  test("POST to /favorites returns 400 title is required", async () => {
    const response = await fetch("http://localhost:3000/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment: 'comment',
      }),
    });

    expect(response.status).toBe(400);
    const result = JSON.parse(await response.text());
    expect(result.message).toBe("Missing parameters");
  });

  test("POST to /favorites returns 400 comment is required", async () => {
    const response = await fetch("http://localhost:3000/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: 'title',
      }),
    });

    expect(response.status).toBe(400);
    const result = JSON.parse(await response.text());
    expect(result.message).toBe("Missing parameters");
  });

  test("POST to /favorites returns 400 user not found", async () => {
    const response = await fetch("http://localhost:3000/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: 'title',
        comment: 'comment',
        userId: 1,
      }),
    });

    expect(response.status).toBe(400);
    const result = JSON.parse(await response.text());
  });
});