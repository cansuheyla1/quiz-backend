
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const questionsRoutes = require("./routes/questions");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req,res) => {
    res.send("backend is running");
})

app.use("/api", questionsRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("lintening for requests on port ", PORT);
})