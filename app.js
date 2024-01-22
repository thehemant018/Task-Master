require('dotenv').config();
const express=require('express');
const connectToMongo=require('./db.js');
var cors=require('cors');
connectToMongo();
const app=express();
const path=require('path');
app.use(cors())
app.use(express.json())

let port=process.env.PORT || 5694;

app.use('/api/auth',require('./routes/auth.js'));
app.use('/api/task',require('./routes/task.js'));
app.use(express.static(path.resolve(__dirname, "frontend", "build")));
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});

app.listen(port,()=>{
    console.log(`listening on http://localhost:${port}`);
})