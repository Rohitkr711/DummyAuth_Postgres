import express from "express";
import { registerUserController,verifyUserController } from "../controllers/auth.controller.js";

const userRoutes = express.Router();
userRoutes.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "userRoutes working"
    })
})
userRoutes.post('/register', registerUserController);
userRoutes.get('/verifyUser/:userVerificationToken',verifyUserController)

export default userRoutes;