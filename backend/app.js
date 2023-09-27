var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");

var indexRouter = require("./routes/index");
var accountsRouter = require("./routes/accounts");
var expensesRouter = require("./routes/expenses");
var incomeRouter = require("./routes/income");
var generalRouter = require("./routes/general");

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, Accept, Authorization"
  );
  next();
});

app.use("/", indexRouter);
app.use("/accounts", accountsRouter);
app.use("/expenses", expensesRouter);
app.use("/income", incomeRouter);
app.use("/general", generalRouter);

module.exports = app;
