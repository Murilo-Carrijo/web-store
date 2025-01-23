const database = require("../setup");

describe("POST /user/create", () => {
  test("POST to /user/create returns 400 senha vazia", async () => {
    const response = await fetch("http://localhost:3000/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: "teste",
        email: "teste@teste.com",
        password: '',
      }),
    });

    expect(response.status).toBe(400);
    const result = JSON.parse(await response.text());
    expect(result.message).toBe("Missing parameters");
  });

  test("POST to /user/create returns 400 senha com menos de 6 caracteres", async () => {
    const response = await fetch("http://localhost:3000/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: "teste",
        email: "teste@teste.com",
        password: 'pass',
      }),
    });

    expect(response.status).toBe(400);
    const result = JSON.parse(await response.text());
    expect(result.message).toBe("The password must be at least 6 characters");
  });

  test("POST to /user/create returns 400 e-mail vazio", async () => {
    const response = await fetch("http://localhost:3000/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: "teste",
        email: "",
        password: 'password123',
      }),
    });

    expect(response.status).toBe(400);
    const result = JSON.parse(await response.text());
    expect(result.message).toBe("Missing parameters");
  });

  test("POST to /user/create returns 400 se o usuário não enviar o nome", async () => {
    const response = await fetch("http://localhost:3000/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: "  ",
        email: "teste@teste.com",
        password: "password123",
      }),
    });

    expect(response.status).toBe(400);
    const result = JSON.parse(await response.text());
    expect(result.message).toBe("Missing parameters");
  });

  test("POST to /user/create returns 400 se o usuário já existir", async () => {
    const response = await fetch("http://localhost:3000/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: "teste",
        email: "teste@teste.com",
        password: "password123",
      }),
    });

    expect(response.status).toBe(400);
    const result = JSON.parse(await response.text());
    expect(result.message).toBe("User already exists");
  });
});

describe.skip("POST users", () => {
  test("POST /login returns 200", async () => {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "teste@teste.com",
        password: "password123",
      }),
    });

    expect(response.status).toBe(200);
    const result = JSON.parse(await response.text());
    expect(result.id).toBeDefined();
    expect(result.email).toBeDefined();
    expect(result.createdAt).toBeDefined();
    expect(result.updateAt).toBeDefined();
    expect(result.password).not.toBeDefined();
  });

  test("POST /login returns 400 com a senha incorreta", async () => {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "teste@teste.com",
        password: "password1234",
      }),
    });

    expect(response.status).toBe(400);
    const result = JSON.parse(await response.text());
    expect(result.message).toBe("Email or password incorrect");
  });

  test("POST /login returns 400 com a email incorreta", async () => {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "testee@teste.com",
        password: "password123",
      }),
    });

    expect(response.status).toBe(400);
    const result = JSON.parse(await response.text());
    expect(result.message).toBe("Email or password incorrect");
  });

  test("POST /login returns 400 com a email invalido", async () => {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "@teste.com",
        password: "password123",
      }),
    });

    expect(response.status).toBe(400);
    const result = JSON.parse(await response.text());
    expect(result.message).toBe("This email is invalid");
  });

test("POST /login returns 400 com a senha com menos de 6 caractes", async () => {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "teste@teste.com",
        password: "pass",
      }),
    });

    expect(response.status).toBe(400);
    const result = JSON.parse(await response.text());
    expect(result.message).toBe("The password must be at least 6 characters");
  });
});
