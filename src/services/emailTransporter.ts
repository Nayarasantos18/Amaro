import nodemailer from "nodemailer";
import dotenv from "dotenv"

dotenv.config()

export const emailTransporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.NODEMAILER_USER,
    password: process.env.NODEMAILER_PASS
  },
  tsl: {ciphers: "SSLv3"}
})
