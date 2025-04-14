import nodemailer from 'nodemailer';

/**
 * Send email using nodemailer
 * @param {Object} options - Email options
 * @param {String} options.email - Recipient email
 * @param {String} options.subject - Email subject
 * @param {String} options.message - Email message body
 * @returns {Promise} - Resolved when email is sent
 */
export const sendEmail = async (options) => {
  // Check if SMTP credentials are configured
  if (!process.env.SMTP_HOST || !process.env.SMTP_PORT || 
      !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    console.error('Email sending error: Error: SMTP credentials are not properly configured');
    throw new Error('SMTP credentials are not properly configured');
  }

  // Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  });

  // Define email options
  const mailOptions = {
    from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM}>`,
    to: options.email,
    subject: options.subject,
    text: options.message
  };

  try {
    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error(`Failed to send email: ${error.message}`);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};