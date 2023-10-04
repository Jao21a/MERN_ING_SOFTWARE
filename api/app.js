import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./routes/auth.js";
import usersRouter from "./routes/users.js";
import hotelsRouter from "./routes/hotels.js";
import roomsRouter from "./routes/rooms.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

const connect = async() =>{
    try {
        await mongoose.connect(process.env.MONGO);
        console.log('Conectado a mongo');
    } catch (error) {
        throw error;
    }
}

mongoose.connection.on('connected', () =>{
    console.log("Mongodb conectado");
})

mongoose.connection.on('disconnect', () =>{
    console.log("Mongodb desconetado");
})


//middlewares
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth",authRouter);
app.use("/api/user",usersRouter);
app.use("/api/hotels",hotelsRouter);
app.use("/api/rooms", roomsRouter);

app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Servidor no disponible";
    return res.status(errorStatus).json({
        message : errorMessage,
        status: errorStatus,
        success: false,
        stack: err.stack
    });
});


app.listen(5000, () => {
    connect(); 
    console.log('Servidor conectado: http://localhost:5000');
});
