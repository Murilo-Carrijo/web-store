const utils = require("./utils");

describe("POST /favorites", () => {
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

  test("POST to /favorites returns 201", async () => {
    utils.fiveItens.forEach(async (item, index) => {
      const response = await fetch("http://localhost:3000/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(item),
      });

      expect(response.status).toBe(201);
    });
    await fetch("http://localhost:3000/favorites", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
  });

  test("POST to /favorites returns 400 title is required", async () => {
    const response = await fetch("http://localhost:3000/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        externalId: 1,
        title: "",
        price: "50.0",
        category: "papelaria",
        description: "descrição",
        image: "https://img.freepik.com/fotos-gratis/caderno_74190-4422.jpg",
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
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        externalId: null,
        title: "title",
        price: "50.0",
        category: "papelaria",
        description: "descrição",
        image: "https://img.freepik.com/fotos-gratis/caderno_74190-4422.jpg",
      }),
    });

    expect(response.status).toBe(400);
    const result = JSON.parse(await response.text());
    expect(result.message).toBe("The externalId is missing parameters");
  });

  test("POST to /favorites returns 400 price is required", async () => {
    const response = await fetch("http://localhost:3000/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        externalId: 1,
        title: "title",
        price: "",
        category: "papelaria",
        description: "descrição",
        image: "https://img.freepik.com/fotos-gratis/caderno_74190-4422.jpg",
      }),
    });

    expect(response.status).toBe(400);
    const result = JSON.parse(await response.text());
    expect(result.message).toBe("The price is missing parameters");
  });

  test("POST to /favorites returns 400 category is required", async () => {
    const response = await fetch("http://localhost:3000/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        externalId: 1,
        title: "title",
        price: "50.0",
        category: "",
        description: "descrição",
        image: "https://img.freepik.com/fotos-gratis/caderno_74190-4422.jpg",
      }),
    });

    expect(response.status).toBe(400);
    const result = JSON.parse(await response.text());
    expect(result.message).toBe("The category is missing parameters");
  });

  test("POST to /favorites returns 400 description is required", async () => {
    const response = await fetch("http://localhost:3000/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        externalId: 1,
        title: "title",
        price: "50.0",
        category: "papelaria",
        description: "",
        image: "https://img.freepik.com/fotos-gratis/caderno_74190-4422.jpg",
      }),
    });

    expect(response.status).toBe(400);
    const result = JSON.parse(await response.text());
    expect(result.message).toBe("The description is missing parameters");
  });

  test("POST to /favorites returns 400 image is required", async () => {
    const response = await fetch("http://localhost:3000/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        externalId: 1,
        title: "title",
        price: "50.0",
        category: "papelaria",
        description: "descrição",
        image: "",
      }),
    });

    expect(response.status).toBe(400);
    const result = JSON.parse(await response.text());
    expect(result.message).toBe("The image is missing parameters");
  });

  test("POST to /favorites returns 400 if the list alrady have 5 items", async () => {
    utils.fiveItens.forEach(async (item, index) => {
      await fetch("http://localhost:3000/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(item),
      });
    });
    const response = await fetch("http://localhost:3000/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(utils.sixthItem),
    });

    expect(response.status).toBe(400);
    const result = JSON.parse(await response.text());
    expect(result.message).toBe("The user already has 5 favorites");
  });

  test("POST to /favorites returns 400 if the element alrady exist", async () => {
    const response = await fetch("http://localhost:3000/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(utils.oneIetem),
    });

    expect(response.status).toBe(400);
     const result = JSON.parse(await response.text());
     console.log('result', result);
    expect(result.message).toBe("The element already exist");

    await fetch("http://localhost:3000/favorites", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    await fetch("http://localhost:3000/user/delete", {
      method: "DELETE",
      headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
      },
    });
  });
});
