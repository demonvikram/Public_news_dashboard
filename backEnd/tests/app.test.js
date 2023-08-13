const request = require("supertest");
const app = require("../app"); // Assuming your app setup is in app.js

describe("API tests", () => {
  it("should get the list of news articles", async () => {
    const res = await request(app).get("/api/news");
    expect(res.status).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should add a new news article", async () => {
    const newArticle = { title: "New Article", content: "New content" };
    const res = await request(app)
      .post("/api/news")
      .send(newArticle)
      .set("Accept", "application/json");
    expect(res.status).toEqual(201);
    expect(res.body.title).toBe(newArticle.title);
    expect(res.body.content).toBe(newArticle.content);
  });
});
