import 'dotenv/config';
import { createTransport } from 'nodemailer';

const transporter = createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export function send({ email, subject, html }) {
  return transporter.sendMail({
    to: email,
    subject,
    html,
  });
}

function sendActivationEmail(email, token) {
  const href = `${process.env.CLIENT_HOST}/#/activate/${token}`;
  const html = `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Account Activation</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      h1 {
        color: #333;
        margin-bottom: 20px;
      }
      a {
        color: #007bff;
        text-decoration: none;
      }
      img {
        max-width: 100%;
        height: auto;
        display: block;
        margin: 20px auto;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Activate Account</h1>
      <p>
        Welcome to our platform! To activate your account, please click the
        following link:
      </p>
      <a href="${href}">${href}</a>
      <img
        src="https://www.strunkmedia.com/wp-content/uploads/2018/05/bigstock-221516158.jpg"
        alt="Company Logo"
      />
    </div>
  </body>
</html>
  `;

  return send({
    email,
    html,
    subject: 'Activate',
  });
}

export const emailService = {
  sendActivationEmail,
  send,
};
