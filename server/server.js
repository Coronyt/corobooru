const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

require("dotenv").config();

// Importing Express route handlers
const auth_routes = require("./routes/auth-routes");
const mult_routes = require("./routes/mult-routes");

// Creating Express app
const app = express();

// Connecting to MongoDB
mongoose.connect(process.env.CLUSTER)
    .then(() => {
        // Listening at .env port
        app.listen(process.env.PORT, () => {
            console.log("Listening at port " + process.env.PORT);
        });
    })
    .catch((err) => {
        console.log(err);
    });

// Initializing middleware
// app.use(morgan("dev"));
app.use(express.json());

// Unprotected endpoints
app.use("/api", auth_routes);

// Protected endpoints
// TODO - Need to implement auth-validate middleware and use() here for API protection

app.use("/api", mult_routes);