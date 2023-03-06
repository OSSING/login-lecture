"use strict";

// 모듈
const express = require("express");
const app = express();

const home = require(".");

// 앱 세팅
app.set("views", "./views");
app.set("view engine", "ejs");

app.use("/", home); // use -> 미들웨어 등록 메소드

module.exports = app;