import request from "supertest";
import server from "../../../index";

describe("api/books", () => {
  afterEach(async () => {
    server.close();
  });

  describe("GET/", () => {
    it("should return all books", async () => {
      const res = await request(server).get("/api/books");
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);

      expect(res.body[0]).toHaveProperty("uuid");
      expect(res.body[0]).toHaveProperty("title");
      expect(res.body[0]).toHaveProperty("author");
      expect(res.body[0]).toHaveProperty("language");
    });

    it("should return filtered books", async () => {
      const res = await request(server).get(`/api/books?page=1&limit=10`);
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });
});
