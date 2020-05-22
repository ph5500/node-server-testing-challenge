const request = require("supertest");

const server = require("../api/server.js");

const random = Date.now();

describe("users router", function() {
  it("should run the tests", function() {
    expect(true).toBe(true);
  });

  describe("GET /", function() {
    it("should return 200 OK", function() {
      return request(server)
        .get("/api/users")
        .then(res => {
          expect(res.status).toBe(200);
        });
    });

    it("should return JSON formatted body", function() {
      return request(server)
        .get("/api/users")
        .then(res => {
          expect(res.type).toMatch("json");
        });
    });
  });

  describe("GET /:id", function() {
    it("should return 200 OK", function() {
      return request(server)
        .get("/api/users/9")
        .then(res => {
          expect(res.status).toBe(200);
        });
    });

    it("should return 9 as the id value", function() {
      return request(server)
        .get("/api/users/9")
        .then(res => {
          expect(res.body.id).toBe(9);
        });
    });
  });

  describe("POST /", function() {
    it("should return 201 Created", function() {
      return request(server)
        .post("/api/users")
        .send({ username: `test username ${random}` })
        .then(res => {
          expect(res.status).toBe(201);
        });
    });

    it("should return a JSON formatted body", function() {
      return request(server)
        .post("/api/users")
        .send({ username: `test username ${random + 1}` })
        .then(res => {
          expect(res.type).toMatch("json");
        });
    });
  });

  describe("DELETE /:id", function() {
    // it("should return 200 OK", function() {
    //   return request(server)
    //     .delete("/api/users/8")
    //     .then(res => {
    //       expect(res.status).toBe(200);
    //     });
    // });

    it("should return JSON formatted body", function() {
      return request(server)
        .delete("/api/users/5")
        .then(res => {
          expect(res.type).toMatch("json");
        });
    });

    it("should return errorMessage as the errorMessage value", function() {
      return request(server)
        .delete("/api/users/5")
        .then(res => {
          expect(res.body.errorMessage).toBe(
            "The user with the specified id does not exist."
          );
        });
    });
  });
});