const express = require('express');
const app = express();
const cors = require('cors');

const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}))
//require all the routes here
const authRouter = require('./routes/auth.route');
const interviewRouter = require('./routes/interview.routes')

// Global request logger - logs every incoming request
app.use((req, res, next) => {
    console.log(`[REQUEST] ${req.method} ${req.url}`);
    next();
});

// using all the routes here
app.use("/api/auth",authRouter)
app.use("/api/interview", interviewRouter)


module.exports = app;