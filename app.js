require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const compression = require('compression');
const multer = require('multer')
const crypto = require('crypto')
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT;
//process.env.NODE_ENV = 'production'

//Compress all routes
app.use(compression());
//User Helmet
app.use(helmet());

// Configure Mongoose to Connect to MongoDB
mongoose
    .connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((response) => {
        console.log("MongoDB Connected Successfully.");
    })
    .catch((err) => {
        console.log("Database connection failed.");
    });

// Configure Express
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use("/images", express.static(path.join("images")));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); //* will allow from all cross domain
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.use(cors());

//Multer module for handling multi part file upload.
var storage = multer.diskStorage({
    destination: './images',
    filename: function (req, file, cb) {
      crypto.pseudoRandomBytes(16, function (err, raw) {
        if (err) return cb(err)
  
        cb(null, raw.toString('hex') + path.extname(file.originalname))
      })
    }
  })
  
app.use(multer({ storage: storage }).single('image'));

const auth = require('./auth')
app.use(auth)

/* Routes */
const api = require("./routes/api");

app.use("/api", api);

/* Start The Server */
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});