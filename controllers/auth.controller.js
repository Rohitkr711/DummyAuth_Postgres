import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import bcrypt from "bcryptjs";


dotenv.config();
const prisma = new PrismaClient();

export const registerUserController = async (req, res) => {
    const { name, email, password, phoneno } = req.body;
    if (!name || !email || !password || !phoneno) {
        console.log('Data is missing');
        res.status(400).json({
            success: false,
            message: "All fields are required",
        })
    }

    try {
        const userExist = await prisma.user.findUnique({
            where: { email }
        })
        console.log('user existance checked', userExist);

        if (userExist) {
            console.log('user already exist');
            res.status(400).json({
                success: false,
                message: "user already exist"
            })
        }

        // password hashing before storing
        console.log("started registering new user");

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("hashed password generated", hashedPassword);
        const registrationVerificationToken = crypto.randomBytes(14).toString('hex');
        console.log("registration token generated", registrationVerificationToken);

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                phoneno,
                password: hashedPassword,
                verificationToken: registrationVerificationToken,
            }
        })

        if (newUser) {
            console.log('new user created');
            console.log(newUser);

        }

        // <---Mail Service Operation Starts--->

        const transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: process.env.MAILTRAP_PORT,
            secure: false, // true for port 465, false for other ports
            auth: {
                user: process.env.MAILTRAP_USERNAME,
                pass: process.env.MAILTRAP_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.MAILTRAP_SENDEREMAIL, // sender address
            to: newUser.email, // list of receivers
            subject: "Verify your email", // Subject line
            text: `please click on the below link:${process.env.BASE_URL}/api/v1/users/verifyUser/${registrationVerificationToken}`, // plain text body
            html: "<b>Check the verification URL</b>", // html body
        }
        const info = await transporter.sendMail(mailOptions);

        if (!info.messageId) {
            return res.status(400).json({
                success: true,
                message: "Failed to send mail",
            })
        }

        res.status(201).json({
            message: "Mail sent successfully, New user got registered",
            success: true,
            MailSentFrom: info.envelope.from,
            MailSentTo: `${info.envelope.to[0]}`,

        });
    }


    catch (error) {
        console.log(error);

        res.status(401).json({
            success: false,
            message: "registration unsuccessful",
            Error: error,
        })
    }
}

export const verifyUserController = async (req, res) => {
    const { userVerificationToken } = req.params;

    if (!userVerificationToken) {
        console.log('verification token is missing');
        res.status(400).json({
            success: false,
            message: "verification token is required"
        })
    }
    try {

        const userfound = await prisma.user.findFirst({
            where: { verificationToken: userVerificationToken }
        })

        if (!userfound) {
            res.status(401).json({
                success: false,
                message: "Invalid verification token"
            })
        }
        
        console.log(userfound);

        // userfound.verificationToken = undefined
        const updateRsponse=await prisma.user.update({
            where:{email:userfound.email},
            data:{
                isVerified : true,
                verificationToken:'',
            }
        })

        if(updateRsponse)console.log('Record got updated');   

        console.log(userfound);
      
        res.status(201).json({
            success: true,
            message: "user successfully verified"
        })
    }
    catch (error) {
        console.log("error during verification",error);
        res.status(500).json({
            success: false,
            message: "Unexpected error occured",
            Error: error
        })
    }
}