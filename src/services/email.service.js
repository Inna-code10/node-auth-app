import { Resend } from 'resend';

const requiredEmailEnvVariables = [
  'RESEND_API_KEY',
  'RESEND_FROM_EMAIL',
  'CLIENT_HOST',
];

function validateEmailEnvironment() {
  const missingVariables = requiredEmailEnvVariables.filter(
    (variableName) => !process.env[variableName],
  );

  if (missingVariables.length > 0) {
    throw new Error(
      `Missing email environment variables: ${missingVariables.join(', ')}`,
    );
  }
}

validateEmailEnvironment();

const resend = new Resend(process.env.RESEND_API_KEY);

async function send({ email, subject, html }) {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: email,
      subject,
      html,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch {
    throw new Error('Email could not be sent');
  }
}

function createClientUrl(pathname) {
  return new URL(pathname, process.env.CLIENT_HOST).toString();
}

function createApiUrl(pathname) {
  const apiHost = process.env.API_HOST || 'http://localhost:3005';

  return new URL(pathname, apiHost).toString();
}

function sendActivationEmail(email, token) {
  const href = createClientUrl(`/activate/${token}`);

  const html = `
    <h1>Activate your account</h1>
    <p>Click the link below to activate your account:</p>
    <a href="${href}">${href}</a>
  `;

  return send({
    email,
    subject: 'Activate your account',
    html,
  });
}

function sendEmailChangeConfirmation(newEmail, token) {
  const href = createApiUrl(`/users/profile/email/confirm/${token}`);

  const html = `
    <h1>Confirm your new email</h1>
    <p>Click the link below to confirm this email address:</p>
    <a href="${href}">${href}</a>
    <p>This link is valid for one hour.</p>
  `;

  return send({
    email: newEmail,
    subject: 'Confirm your new email',
    html,
  });
}

function sendOldEmailNotification(oldEmail, newEmail) {
  const html = `
    <h1>Your email address was changed</h1>
    <p>
      The email address for your account was changed
      from <strong>${oldEmail}</strong>
      to <strong>${newEmail}</strong>.
    </p>
    <p>
      If you did not make this change, contact support immediately.
    </p>
  `;

  return send({
    email: oldEmail,
    subject: 'Your email address was changed',
    html,
  });
}

function sendResetPasswordEmail(email, token) {
  const href = createClientUrl(`/reset-password/${token}`);

  const html = `
    <h1>Reset your password</h1>
    <p>Click the link below to create a new password:</p>
    <a href="${href}">${href}</a>
    <p>This link is valid for one hour.</p>
  `;

  return send({
    email,
    subject: 'Reset your password',
    html,
  });
}

export const emailService = {
  send,
  sendActivationEmail,
  sendEmailChangeConfirmation,
  sendOldEmailNotification,
  sendResetPasswordEmail,
};
