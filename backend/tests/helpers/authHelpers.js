import request from "supertest";
import app from "../../index";
import dotenv from "dotenv";
dotenv.config();

export const loginUser = async () => {
  return new Promise((resolve, reject) => {
    request(app)
      .post("/easycommerce/users/login")
      .send({
        email: process.env.APP_TEST_EMAIL,
        password: process.env.APP_TEST_PASSWORD,
      })
      .end((err, res) => {
        if (err) return reject(err);
        const token = res.body.token;
        const user = res.body.user;
        resolve({ token, user });
      });
  });
};

export const logoutUser = async (token) => {
  return new Promise((resolve, reject) => {
    request(app)
      .post("/easycommerce/users/logout")
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        if (err) return reject(err);
        resolve(res);
      });
  });
};
