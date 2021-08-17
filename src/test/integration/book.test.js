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

//   Book statistics take too long to fetch.
//   Logs table has to be optmized

    describe("GET /:id/statistics", () => {
     it("should return book statistics", async () => {
       const bookId = "54281c97-e81e-4694-bcb9-28d3ac0925a5";
         const res = await request(server)
             .get(`/api/books/${bookId}/statistics`)
             .timeout(300000);

       expect(res.status).toBe(200);
       expect(res.body).toHaveProperty("uniqueClients");
       expect(res.body).toHaveProperty("uniqueUsers");
       expect(res.body).toHaveProperty("clientCountrySummary");
     }, 300000);
  });
});
