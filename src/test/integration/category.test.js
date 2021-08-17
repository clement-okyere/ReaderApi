import request from "supertest";
import server from "../../../index";

describe("api/categories", () => {
  afterEach(async () => {
    server.close();
  });

  describe("GET/", () => {
    it("should return category tree structure", async () => {
      const res = await request(server).get("/api/categories");
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);

      expect(res.body[0]).toHaveProperty("iconcolor");
      expect(res.body[0]).toHaveProperty("iconurl");
      expect(res.body[0]).toHaveProperty("name");
      expect(res.body[0]).toHaveProperty("description");
      expect(res.body[0]).toHaveProperty("listorder");
    });
  });
});
