require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/connect");

const PORT = process.env.PORT || 5000;

const products_routes = require("./routes/products");

app.get("/post",  (req, res) => {
    res.send("Hi im live");
});

app.use("/api/products", products_routes);

const start = async () => {
    try{
        await connectDB(process.env.MONGODB_DB);
        app.listen(PORT, () =>{
            console.log(`${PORT} Yes Im Connected`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();