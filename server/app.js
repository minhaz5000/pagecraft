import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import express from "express";
import fileupload from "express-fileupload";
import cors from "cors"; // Import cors module
dotenv.config();

import { uploadBook } from "./middleware/Admin.js";
import { login, logout, register, verifyToken } from "./middleware/Auth.js";
import { query, search } from "./middleware/BookQuery.js";
import { getContents, wishlist } from "./middleware/BookRead.js";
import { bypassCORS } from "./middleware/Setup.js";

const app = express();

// Enable CORS for all routes
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileupload());

// book query
app.get("/books/:qType", bypassCORS, verifyToken, query);
app.get("/search", bypassCORS, verifyToken, search);

// read book
app.get("/read", bypassCORS, verifyToken, getContents);

// wishlist
app.post("/wishlist", bypassCORS, verifyToken, wishlist);

// user authentication
app.post('/register', bypassCORS, register);

app.post('/login', bypassCORS, verifyToken, login);

app.post('/logout', bypassCORS, verifyToken, logout);

// book upload
app.post('/upload', bypassCORS, uploadBook);

app.listen(process.env.PORT, process.env.HOST, () => {
    console.log("Server is running");
});
