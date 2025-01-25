describe("/GET favorites", () => {
  let token;

  test("Preper the database to the teset", async () => {
    await fetch("http://localhost:3000/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "teste",
        email: "teste4@teste.com",
        password: "password123",
      }),
    });

    const user = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "teste4@teste.com",
        password: "password123",
      }),
    });

    token = (await user.json()).token;
  });

  test("GET /favorites returns 200 e retorna um array", async () => {
    const response = await fetch("http://localhost:3000/favorites", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });
    expect(response.status).toBe(200);
    const result = JSON.parse(await response.text());
    expect(Array.isArray(result)).toEqual(true);
  });
});
