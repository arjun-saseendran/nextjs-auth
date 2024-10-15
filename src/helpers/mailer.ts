import nodemailer from 'nodemailer';
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'


export const sendEmail = async({email, emailType, userId}: any) => {
    try {

        //create a hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if(emailType === 'VERIFY'){
            await User.findByIdAndUpdate(userId, {
              verifyToken: hashedToken,
              verifyTokenExpiry: Date.now() + 3600000,
            });
        }else if(emailType === 'RESET'){
            await User.findByIdAndUpdate(userId, {
              forgotPasswordToken: hashedToken,
              forgotPasswordTokenExpiry: Date.now() + 3600000,
            });

        }

        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "maddison53@ethereal.email",
    pass: "jn7jnAPss4f63QBp6D",

        }
    })
        
    } catch (error: any) {
        throw new Error(error.message)
        
    }

}
