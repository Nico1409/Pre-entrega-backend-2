import express from "express";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import handlebars from "express-handlebars";
import { __dirname } from "../utils.js";
import router from '../routes/index.js';
import passport from 'passport';
import initializePassport from '../passport/jwt.passport.js';
import { connectionDB } from "../mongo/connection.js";

export const AppInit = (app) => {
  dotenv.config();
  connectionDB();
  app.use(cookieParser(process.env.SECRET))
  initializePassport();
  app.use(passport.initialize());
  app.engine("handlebars", handlebars.engine());
  app.set("views", __dirname + "/views");
  app.set("view engine", "handlebars");

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(__dirname + "/public"));

  app.use('/', router);
};
