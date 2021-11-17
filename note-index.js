const express = require("express");
const app = express();
const cors = require('cors')


const dbConfig = require("./db-config/database-config");
const mongoose = require ("mongoose");

const routes = require ("./routes/note-route");
const bodyParser = require('body-parser');
app.use(bodyParser.json())

// CORS (Just Ignore this One)
const corsOptions = {
    origin: "*",
    allowedHeaders: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  };
  app.use(cors(corsOptions));
  
// Setting Mongoose Connection
mongoose.connect(dbConfig.url, { useNewUrlParser: true})
.then(()=>{
    console.log("Successfully Connected to Database !")
})
.catch(err=>{
    console.log("Error in Connecting to Database !")
    process.exit();
})

// Setting Home Route
app.get('/', (req, res)=>{
    res.json({"message":"Welcome to my NOTE application."})
})

// Server Listining Here
app.listen(3001, ()=>{
    console.log("Note Server Up & Running !")
})

app.use( routes )