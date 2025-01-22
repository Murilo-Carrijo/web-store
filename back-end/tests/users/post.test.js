const database = require("../setup");

describe("POST /users", () => {
  beforeAll(async () => {
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
  });

  afterAll(async () => {
    await database.query('DROP TABLE IF EXISTS users;');
  });

  test("POST to /users returns 201", async () => {
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "teste@teste.com",
        password: "password123",
      }),
    });

    expect(response.status).toBe(201);
  });

  test("POST to /users returns 400 se o usuário já existir", async () => {
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "teste@teste.com",
        password: "password123",
      }),
    });

    expect(response.status).toBe(400);
  });

  test("POST to /users returns 400", async () => {
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "teste@teste.com",
        password: '',
      }),
    });

    expect(response.status).toBe(400);
  });

  test("POST to /users returns 400", async () => {
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "",
        password: 'password123',
      }),
    });

    expect(response.status).toBe(400);
  });
});