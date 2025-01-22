test("POST to /status returns 200", async () => {
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