import request from "supertest";
import server from "../../../index";

describe("api/users", () => {
  afterEach(async () => {
    server.close();
  });

  describe("GET/", () => {
    it("should return all users", async () => {
      const res = await request(server).get("/api/users");
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);

      expect(res.body[0]).toHaveProperty("id");
      expect(res.body[0]).toHaveProperty("gender");
      expect(res.body[0]).toHaveProperty("age");
      expect(res.body[0]).toHaveProperty("createdat");
      expect(res.body[0]).toHaveProperty("updatedat");
    });

    it("should return filtered users by gender and age range", async () => {
      const res = await request(server).get(
        `/api/users?gender=male&agestart=25&ageend=54`
      );
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it("should return filtered users by gender, age range and sortby createdat", async () => {
      const res = await request(server).get(
        `/api/users?gender=male&agestart=25&ageend=54&sortby=createdat`
      );
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it("should return filtered users by gender, age range and sortby updatedat", async () => {
      const res = await request(server).get(
        `/api/users?gender=male&agestart=25&ageend=54&sortby=updatedat`
      );
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });
    
    describe("GET /users:id/", () => {
      it("should return user when a valid is provided", async () => {
        const userId = "e30442f9-ac00-4f99-ad8f-cc495a71b16b";
        const res = await request(server).get(`/api/users/${userId}`);

        expect(res.status).toBe(200);
        expect(res.body[0]).toHaveProperty("id");
        expect(res.body[0]).toHaveProperty("gender");
        expect(res.body[0]).toHaveProperty("age");
        expect(res.body[0]).toHaveProperty("createdat");
        expect(res.body[0]).toHaveProperty("updatedat");
      });

      it("should return 404 when user with id is not found", async () => {
        const userId = "e30442f9-ac00-4f99-ad8f-cc495a71b16";
        const res = await request(server).get(`/api/users/${userId}`);

        expect(res.status).toBe(404);
      });
    });
    
});
