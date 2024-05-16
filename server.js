const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")

const app = express();
const port = 3000;

app.use(bodyParser.json());

const MONGO_URI = 'mongodb+srv://rameshbellani95:Ramesh1234@cluster0.raipn7s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
//connecting mongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected!!!'))
.catch((err) => console.log(err))

const moviesRouter = require('./routes/movies');
app.use('/api/movies', moviesRouter)

app.listen(port, () => {
    console.log(`Server Running on http://localhost:${port}`);
})