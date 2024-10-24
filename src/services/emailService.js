import sgMail from "@sendgrid/mail";

// Set SendGrid API Key from environment variable
sgMail.setApiKey(process.env.REACT_APP_SENDGRID_API_KEY);

// Send Confirmation Email
export const sendConfirmationEmail = async (
  recipientEmail,
  firstName,
  uniqueID
) => {
  const msg = {
    to: recipientEmail, // Recipient's email address
    from: "no-reply@harvestersgbagada.com", // Your verified SendGrid sender email
    subject: "Confirmation - 2024 Workers Ball Registration",
    html: `
      <h1>Dear ${firstName},</h1>
      <p>Thank you for registering for the upcoming Harvester’s Gbagada 2024 Workers Ball.</p>
      <p>Your unique ID is <strong>${uniqueID}</strong>. Please keep it safe as you will be required to present it on the event day.</p>
      <br />
      <p>We look forward to seeing you.</p>
      <p>Best regards,<br/>Harvesters Gbagada</p>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log("Confirmation email sent");
  } catch (error) {
    console.error("Error sending email", error);
    throw new Error("Email could not be sent");
  }
};

// Send Pending Email for Inactive Workers
export const sendPendingEmail = async (recipientEmail, firstName) => {
  const msg = {
    to: recipientEmail,
    from: "no-reply@harvestersgbagada.com",
    subject: "Pending Registration - 2024 Workers Ball",
    html: `
      <h1>Dear ${firstName},</h1>
      <p>Thank you for registering for the upcoming Harvester’s Gbagada 2024 Workers Ball.</p>
      <p>Your registration is complete, and we will get back to you with your unique ID and auditorium assignment soon.</p>
      <br />
      <p>Best regards,<br/>Harvesters Gbagada</p>
    `,
  };

  try {
    console.log({ msg });
    await sgMail.send(msg);
    console.log("Pending email sent");
  } catch (error) {
    console.error("Error sending email", error);
    throw new Error("Email could not be sent");
  }
};
