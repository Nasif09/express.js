const emailWithNodemailer = require('../../helpers/email');
const OTP = require('./otp.model');

const sendOTP = async (name, sentTo, purpose) => {
    const otp = Math.floor(1000 + Math.random() * 9000);
    const subject = purpose === 'email-verification' ? 'Email verification code' : 'Forgot password code';
    // sending email if receiverType is email
    const emailData = {
        email: sentTo,
        subject: subject,
        html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #4A90E2;">Hello, ${name}</h2>
            <p>Thank you for choosing <strong>Vappless</strong>! Please use the following code to verify your account:</p>
            <p style="font-size: 1.5em; font-weight: bold; color: #4A90E2;">${otp}</p>
            <p>This code is valid for <strong>${process.env.OTP_EXPIRY_TIME} minutes</strong>.</p>
            <p style="color: #999; font-size: 0.9em;">If you didn't request this code, please ignore this email.</p>
        </div>`
      }
      await emailWithNodemailer(emailData);
  
    const otpExpiryTime = parseInt(process.env.OTP_EXPIRY_TIME) || 3;
    const expiredAt = new Date();
    expiredAt.setMinutes(expiredAt.getMinutes() + otpExpiryTime);
  
    const newOTP = new OTP({
      sentTo,
      purpose,
      otp,
      expiredAt,
    });
    const savedOtp = await newOTP.save();
  
    // Schedule deletion of OTP after 3 minutes
    setTimeout(async () => {
      try {
        await OTP.findByIdAndDelete(savedOtp._id);
        console.log('OTP deleted successfully after expiry.');
      } catch (error) {
        console.error('Error deleting OTP after expiry:', error);
      }
    }, 180000);
  
    return true;
  }

  module.exports = {
    sendOTP
  }