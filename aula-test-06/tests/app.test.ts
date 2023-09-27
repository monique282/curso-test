import supertest from "supertest";

import app from "./../src/app";

const api = supertest(app);

describe("API test", () => {
  // TODO
});

describe("API test", () => {
  it("should return 200 when ask /health", async () => {
    const result = await api.get("/health");
    expect(result.status).toBe(200);

  })

  it("validar o array", async () => {
    const result = await api.get("/event");
    expect(result.status).toBe(200);
    expect(result.body).toHaveLength(1);
    expect(result.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          title: expect.any(String),
          image: expect.any(String),
          date: expect.any(String)
        })
      ])
    )
  })
})