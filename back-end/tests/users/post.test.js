const UserModal = require("../../models/users.model");

describe("POST /user/create", () => {
  test("POST to /user/create returns 400 senha vazia", async () => {
    const response = await fetch("http://localhost:3000/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "teste",
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
        name: "teste",
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
        name: "teste",
        email: "",
        password: 'password123',
      }),
    });

    expect(response.status).toBe(400);
    const result = JSON.parse(await response.text());
    expect(result.message).toBe("Missing parameters");
  });

  test("POST to /user/create returns 400 e-mail invalido teste", async () => {
    const response = await fetch("http://localhost:3000/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "teste",
        email: "teste",
        password: 'password123',
      }),
    });

    expect(response.status).toBe(400);
    const result = JSON.parse(await response.text());
    expect(result.message).toBe("This email is invalid");
  });

  test("POST to /user/create returns 400 e-mail invalido teste@", async () => {
    const response = await fetch("http://localhost:3000/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "teste",
        email: "teste@",
        password: 'password123',
      }),
    });

    expect(response.status).toBe(400);
    const result = JSON.parse(await response.text());
    expect(result.message).toBe("This email is invalid");
  });

  test("POST to /user/create returns 400 e-mail invalido teste@test", async () => {
    const response = await fetch("http://localhost:3000/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "teste",
        email: "teste@test",
        password: 'password123',
      }),
    });

    expect(response.status).toBe(400);
    const result = JSON.parse(await response.text());
    expect(result.message).toBe("This email is invalid");
  });

  test("POST to /user/create returns 400 e-mail invalido teste.com", async () => {
    const response = await fetch("http://localhost:3000/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "teste",
        email: "teste.com",
        password: 'password123',
      }),
    });

    expect(response.status).toBe(400);
    const result = JSON.parse(await response.text());
    expect(result.message).toBe("This email is invalid");
  });

  test("POST to /user/create returns 400 se o usuário não enviar o name", async () => {
    const response = await fetch("http://localhost:3000/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "  ",
        email: "teste@teste.com",
        password: "password123",
      }),
    });

    expect(response.status).toBe(400);
    const result = JSON.parse(await response.text());
    expect(result.message).toBe("Missing parameters");
  });

  test("POST to /user/create returns 201 ao criar um usuário", async () => {
    // Limpa o banco de dados
    const modal = new UserModal();
    const user = await modal.getByEmail("teste@teste.com");
    if (user) {
      await modal.deleteUserById(user.id);
    }
    const response = await fetch("http://localhost:3000/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "teste",
        email: "teste@teste.com",
        password: "password123",
      }),
    });

    expect(response.status).toBe(201);
    const result = JSON.parse(await response.text());
    expect(result.message).toBe("User created");
  });

  test("POST to /user/create returns 400 se o usuário já existir", async () => {
    const response = await fetch("http://localhost:3000/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "teste",
        email: "teste@teste.com",
        password: "password123",
      }),
    });

    expect(response.status).toBe(400);
    const result = JSON.parse(await response.text());
    expect(result.message).toBe("User already exists");
  });
});

describe("POST users", () => {
  let token = ""
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
    expect(result.token).toBeDefined();
    token = result.token;
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
