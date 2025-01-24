describe("/GET favorites", () => {
  test("GET /favorites returns 200 e retorna um array", async () => {
    const response = await fetch("http://localhost:3000/favorites/1");
    expect(response.status).toBe(200);
    const result = JSON.parse(await response.text());
    expect(Array.isArray(result)).toEqual(true);
  });
});