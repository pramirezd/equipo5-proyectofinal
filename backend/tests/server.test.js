import { loginUser, logoutUser } from "./helpers/authHelpers"; // Importa las funciones encapsuladas
import request from "supertest";
import app from "../index.js";
import dotenv from "dotenv";
dotenv.config();

let token;
let user_id;

beforeAll(async () => {
  const loginResponse = await loginUser();
  token = loginResponse.token;
  user_id = loginResponse.user.id;
});

describe("/easycommerce/cart", () => {
  describe("GET /easycommerce/cart", () => {
    it("should return 200 OK", (done) => {
      request(app)
        .get(`/easycommerce/cart/user/${user_id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200, done);
    });
  });

  describe("POST /easycommerce/cart", () => {
    it("should return 200 OK", (done) => {
      request(app)
        .post(`/easycommerce/cart/user/${user_id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          product_id: 1,
          quantity: 1,
        })
        .expect(200, done);
    });
  });

  describe("DELETE /easycommerce/cart", () => {
    it("should return 200 OK", (done) => {
      request(app)
        .delete(`/easycommerce/cart/user/${user_id}/product/1`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200, done);
    });
  });
});

describe("/easycommerce/categories", () => {
  let testCategoryId;

  describe("GET /easycommerce/categories", () => {
    it("should return 200 OK", (done) => {
      request(app).get("/easycommerce/categories/").expect(200, done);
    });
  });

  describe("GET /easycommerce/categories/:id", () => {
    it("should return 200 OK", (done) => {
      request(app).get("/easycommerce/categories/1").expect(200, done);
    });
  });

  describe("POST /easycommerce/categories", () => {
    it("should return 200 OK", (done) => {
      request(app)
        .post("/easycommerce/categories/")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "test",
        })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).toBe(200);
          testCategoryId = res.body.create.id;
          done();
        });
    });
  });

  // Eliminar la categoría creada
  describe("DELETE /easycommerce/categories/:id", () => {
    it("should delete the created category and return 200 OK", (done) => {
      request(app)
        .delete(`/easycommerce/categories/${testCategoryId}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200, done);
    });
  });
});

describe("/easycommerce/favorites", () => {
  describe("GET /easycommerce/favorites/", () => {
    it("should return 200 OK", (done) => {
      request(app)
        .get("/easycommerce/categories/")
        .set("Authorization", `Bearer ${token}`)
        .expect(200, done);
    });
  });

  describe("POST /easycommerce/favorites/user/:user_id", () => {
    it("should return 200 OK", (done) => {
      request(app)
        .post(`/easycommerce/favorites/user/${user_id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          product_id: 1,
        })
        .expect(200, done);
    });
  });

  // Eliminar la categoría creada
  describe("DELETE /easycommerce/favorites/user/:user_id/product/:product_id", () => {
    it("should return 200 OK", (done) => {
      request(app)
        .delete(`/easycommerce/favorites/user/${user_id}/product/1`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200, done);
    });
  });
});

describe("/easycommerce/orders", () => {
  let orderId;

  describe("GET /easycommerce/orders", () => {
    it("should return 200 OK", (done) => {
      request(app)
        .get("/easycommerce/orders/allOrders")
        .set("Authorization", `Bearer ${token}`)
        .expect(200, done);
    });
  });

  describe("GET /easycommerce/orders", () => {
    it("should return 200 OK", (done) => {
      request(app)
        .get(`/easycommerce/orders/user/${user_id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200, done);
    });
  });

  describe("POST /easycommerce/orders/user/:user_id", () => {
    it("should return 200 OK", (done) => {
      request(app)
        .post(`/easycommerce/orders/user/${user_id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          total: 100,
          order_state: "En proceso Test",
          products: [
            { product_id: 1, quantity: 2 },
            { product_id: 2, quantity: 1 },
          ],
        })
        .end((err, res) => {
          if (err) return done(err);
          orderId = res.body.order_id;
          done();
        });
    });
  });

  describe("PUT /easycommerce/orders/:order_id", () => {
    it("should return 200 OK", (done) => {
      request(app)
        .put(`/easycommerce/orders/${orderId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          order_state: "Completada Test2",
        })
        .expect(200, done);
    });
  });

  describe("DELETE /easycommerce/orders/:order_id", () => {
    it("should return 200 OK", (done) => {
      request(app).delete(`/easycommerce/orders/${orderId}`).expect(200, done);
    });
  });
});

afterAll(async () => {
  await logoutUser(token);
});
