import express from 'express'
import connectDB from './config/db.js'
import dotenv from 'dotenv';
import cors from 'cors';
import translationRoutes from './routes/translationRoute.js'
import authRoutes from './routes/authRoute.js'


dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/translations" , translationRoutes);

app.get("/",(req,res)=>{
    res.send("Server is running..");
})

app.listen(port, ()=>{
    console.log(`Server running on port : ${port}` )
})