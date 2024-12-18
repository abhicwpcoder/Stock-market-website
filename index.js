import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname =  dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.set("view engine", "ejs");

// My API key
const apiKey = 'cadbd62787b63a15437ed1bcb5f681c7f3faf28d6f0fd6dcd23e32c6245d0cf3';

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//Home route
app.get("/", (req,res) => {
    const d = new Date();
    const date = d.getFullYear();
    console.log(date);
    res.render("index", {date});
});

// Get input from user
app.post('/submit', async (req, res) => {
    const stockName = req.body["companyName"];
    const url = `https://serpapi.com/search?engine=google_finance&q=${stockName}&api_key=${apiKey}`;
    
    try {
        const response = await axios.get(url);
        const d = new Date();
        const date = d.getFullYear();
        console.log(date);
        res.render("main", {data: response.data.futures_chain, date: date});
        console.log(response.data.futures_chain);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.get("/contact", (req,res) => {
    res.sendFile(__dirname + "/public/contact.html");
});

app.get("/about", (req,res) => {
    res.sendFile(__dirname + "/public/about.html");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
