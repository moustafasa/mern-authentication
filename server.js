require("dotenv").config();
const express = require("express");
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");
const logoutRouter = require("./routes/logout");
const employeesRouter = require("./routes/employees");
const refreshRouter = require("./routes/refresh");
const verifyToken = require("./middlewares/verifyToken");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const path = require("path");
const server = express();
const PORT = process.env.PORT;

server.use(express.json());
server.use(cookieParser());
server.use(cors(corsOptions));
server.use("/views", express.static(path.join(__dirname, "views")));

server.use("/refresh", refreshRouter);
server.use("/login", loginRouter);
server.use("/register", registerRouter);
server.use("/logout", logoutRouter);

server.use(verifyToken);
server.use("/employees", employeesRouter);

server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
