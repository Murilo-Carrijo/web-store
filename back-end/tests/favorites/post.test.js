const database = require("../setup");

describe("POST /favorites", () => {
  test("POST to /favorites returns 400 title is required", async () => {
    const response = await fetch("http://localhost:3000/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        externalId: 1,
        title: "",
        price: "50.0",
        category: "papelaria",
        description: "descrição",
        image: "https://img.freepik.com/fotos-gratis/caderno_74190-4422.jpg",
        userId: 1,
        createdAt: new Date().toISOString(),
        updateAt: new Date().toISOString()
      }),
    });

    expect(response.status).toBe(400);
    const result = JSON.parse(await response.text());
    expect(result.message).toBe("The title is missing parameters");
  });

  test("POST to /favorites returns 400 externalId is required", async () => {
    const response = await fetch("http://localhost:3000/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        externalId: null,
        title: "title",
        price: "50.0",
        category: "papelaria",
        description: "descrição",
        image: "https://img.freepik.com/fotos-gratis/caderno_74190-4422.jpg",
        userId: 1,
        createdAt: new Date().toISOString(),
        updateAt: new Date().toISOString()
      }),
    });

    expect(response.status).toBe(400);
    const result = JSON.parse(await response.text());
    expect(result.message).toBe("The externalId is missing parameters");
  });
});