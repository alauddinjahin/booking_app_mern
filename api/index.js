import express from "express";
import dotenv from "dotenv";
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";
import cors from "cors";

// load routes
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";

// init app 
const app = express();

//load config 
dotenv.config();

const PORT = process.env.PORT || 5000;

// connect to mongo DB
mongoose.connect(process.env.MONGO_URI)
.then(res => {
    // run & listen 
    app.listen(PORT,()=> console.log(`Backend App listening on port: ${PORT}`))
})
.catch(err => console.log(err))

// check connected event but it's optional
mongoose.connection.on("connected", ()=> console.log("MongoDB connected"));

// check disconnected event but it's optional
mongoose.connection.on("disconnected", ()=> console.log("MongoDB disconnected"));

// middleware 
app.use(cors())
app.use(cookieParser())
app.use(express.json());

// init route & controller 
app.get("/", (_, res) => res.send("App Initialize properly"));

app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/hotels", hotelsRoute)
app.use("/api/rooms", roomsRoute)


// Error handling middleware 
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

