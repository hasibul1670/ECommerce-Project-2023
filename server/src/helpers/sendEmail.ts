import nodemailer from 'nodemailer';
import config from '../config';
import { ApiError } from '../handlingError/ApiError';
type IEmailType = {
  subject: string;
  email: string;
  html: string;
};
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: config.smtp_username,
    pass: config.smtp_password,
  },
});
export const sendEmailWithNodemailer = async (emailData: IEmailType) => {
  try {
    const mailOptions = {
      from: config.smtp_username,
      to: emailData.email,
      subject: emailData.subject,
      html: emailData.html,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new ApiError(500, 'Error Occurs while sending Activation Email');
  }
};
