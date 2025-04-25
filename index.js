import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./Routes/userAuth.route.js";
import cors from "cors";

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cookieParser());
app.use(cors({
    // origin: "https://localhost:5173"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    console.log('server response checked');
        res.status(200).json({
        success: "true",
        message: "test checked"
    })
})

app.use('/api/v1/users/', userRoutes);

app.listen(port, () => {
    console.log("Backend is listening at port", port);

})