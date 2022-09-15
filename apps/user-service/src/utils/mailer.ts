import nodemailer from 'nodemailer';
import 'dotenv/config';
import logger from '@blogger/util-logger';
import Mail from 'nodemailer/lib/mailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASSWORD,
  },
});

const sendPasswordResetMail = async (
  userEmail: string,
  token: string,
  username: string
): Promise<void> => {
  username = username[0].toUpperCase() + username.substring(1);
  const mailOptions: Mail.Options = {
    from: process.env.MAILER_USER,
    to: userEmail,
    subject: 'Password reset link',
    html:
      `Dear ${username},\n\n` +
      '<p>Click <a href="http://localhost:3000/users/recover?token=' +
      token +
      '">here</a> to reset your password.</p>' +
      `\n\nBlogger Team`,
  };

  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      logger.error(error);
    } else {
      logger.info('Email sent: ' + info.response);
    }
  });
};

const sendConfirmationMail = async (
  userEmail: string,
  token: string,
  username: string
): Promise<void> => {
  username = username[0].toUpperCase() + username.substring(1);
  const mailOptions: Mail.Options = {
    from: process.env.MAILER_USER,
    to: userEmail,
    subject: 'Activate your account',
    html:
      `Dear ${username},\n\n` +
      '<p>Click <a href="http://localhost:3000/users?confirmation=' +
      token +
      '">here</a> to complete your registration.</p>' +
      `\n\nBlogger Team`,
  };

  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      logger.error(error);
    } else {
      logger.info('Email sent: ' + info.response);
    }
  });
};

const confirmPasswordChange = async (userEmail: string, username: string): Promise<void> => {
  username = username[0].toUpperCase() + username.substring(1);

  const mailOptions: Mail.Options = {
    from: process.env.MAILER_USER,
    to: userEmail,
    subject: 'Your account has been updated',
    html:
      `Dear ${username},\n\n` +
      '<p>The password on your account has been changed. If you did not do this change. Change your <a href="http://localhost:3000">password</a></p>' +
      `\n\nBlogger Team`,
  };

  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      logger.error(error);
    } else {
      logger.info('Email sent: ' + info.response);
    }
  });
};

export default {
  sendPasswordResetMail,
  sendConfirmationMail,
  confirmPasswordChange,
};
