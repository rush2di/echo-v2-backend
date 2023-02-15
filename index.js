const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");

dotenv.config();

require("./config/database.config");

const app = express();

const apiRoutes = require("./routes/api.routes");
const usersRoutes = require("./routes/users.routes");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", apiRoutes);
app.use("/users", usersRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log("server started at port 8080")
});
