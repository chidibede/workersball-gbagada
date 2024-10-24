import axios from "axios";

export const sendEmail = async (name, email, message, type) => {
  const templateMap = {
    active: "template_fhqz6uh",
    inactive: "template_v8ew45b",
  };
  const serviceId = "service_k275wtz";
  const templateId = templateMap[type];
  const publicKey = "wq6TJ8mi5yr_1PS-9";

  const data = {
    service_id: serviceId,
    template_id: templateId,
    user_id: publicKey,
    template_params: {
      from_name: name,
      from_email: email,
      to_name: name,
      message: message,
    },
  };

  try {
    const res = await axios.post(
      "https://api.emailjs.com/api/v1.0/email/send",
      data
    );
    console.log(res.data);
  } catch (error) {
    console.error(error);
  }
};
