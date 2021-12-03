import request from "supertest";
import express from "express";
import userRoutes from "../routes/user.route";
import {
  create,
  deleteUser,
  getUser,
  updateUser,
  currentUser,
  register,
} from "../controllers/user.controller";

import frisby from "frisby";

const ccookies = "";

describe("GET /user", function () {
  it("should test get current user 401 status Unauthorized because of middlewares", function () {
    return frisby
      .get("http://localhost:8000/api/currentuser")
      .expect("status", 401);
  });
  it("should test update user user 401 status Unauthorized because of middlewares", function () {
    return frisby
      .post(
        "http://localhost:8000/api/user",
        { email: "francesco@gmail.com", password: "12345" },
        { json: true }
      )
      .expect("status", 401);
  });
  it("should test update user recived status code 404 if password and confirm_password are not the sames", function () {
    return frisby
      .post("http://localhost:8000/api/register", {
        email: "francesco@gmail.com",
        password: "12345",
        confirm_password: "1234",
      })
      .expect("status", 400);
  });
  it("should test delete user user 401 status Unauthorized because of middlewares", function () {
    return frisby
      .delete("http://localhost:8000/api/user/1234")
      .expect("status", 401);
  });
});
