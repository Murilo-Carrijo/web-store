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
        userId: 1
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
        userId: 1
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
      },
      body: JSON.stringify({
        externalId: 1,
        title: "title",
        price: "",
        category: "papelaria",
        description: "descrição",
        image: "https://img.freepik.com/fotos-gratis/caderno_74190-4422.jpg",
        userId: 1
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
      },
      body: JSON.stringify({
        externalId: 1,
        title: "title",
        price: "50.0",
        category: "",
        description: "descrição",
        image: "https://img.freepik.com/fotos-gratis/caderno_74190-4422.jpg",
        userId: 1
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
      },
      body: JSON.stringify({
        externalId: 1,
        title: "title",
        price: "50.0",
        category: "papelaria",
        description: "",
        image: "https://img.freepik.com/fotos-gratis/caderno_74190-4422.jpg",
        userId: 1
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
      },
      body: JSON.stringify({
        externalId: 1,
        title: "title",
        price: "50.0",
        category: "papelaria",
        description: "descrição",
        image: "",
        userId: 1
      }),
    });

    expect(response.status).toBe(400);
    const result = JSON.parse(await response.text());
    expect(result.message).toBe("The image is missing parameters");
  });

  test("POST to /favorites returns 400 userId is required", async () => {
    const response = await fetch("http://localhost:3000/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        externalId: 1,
        title: "title",
        price: "50.0",
        category: "papelaria",
        description: "descrição",
        image: "https://img.freepik.com/fotos-gratis/caderno_74190-4422.jpg",
        userId: null
      }),
    });

    expect(response.status).toBe(400);
    const result = JSON.parse(await response.text());
    expect(result.message).toBe("The userId is missing parameters");
  });

  test("POST to /favorites returns 400 if the list alrady have 5 items", async () => {
    const response = await fetch("http://localhost:3000/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        externalId: 6,
        title: "title",
        price: "50.0",
        category: "papelaria",
        description: "descrição",
        image: "https://img.freepik.com/fotos-gratis/caderno_74190-4422.jpg",
        userId: 1
      }),
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
      },
      body: JSON.stringify({
        externalId: '2',
        title: 'title',
        price: '50.0',
        category: 'papelaria',
        description: 'descrição',
        image: 'https://img.freepik.com/fotos-gratis/caderno_74190-4422.jpg',
        userId: 1,
      }),
    });

    expect(response.status).toBe(400);
     const result = JSON.parse(await response.text());
     console.log('result', result);
    expect(result.message).toBe("The element already exist");
  });
});
