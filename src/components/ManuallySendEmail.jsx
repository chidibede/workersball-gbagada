import React from "react";
import { sendEmail } from "../services/emailjs";

function ManuallySendEmail() {
  const [email, setEmail] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [isActive, setIsActive] = React.useState("active");
  const [code, setCode] = React.useState("active");

  const handleSendEmail = async () => {
    await sendEmail(firstName, email, code, isActive);
  };

  return (
    <div className="w-[50%] justify-center items-center p-24">
      <input
        type="text"
        placeholder="First Name"
        className="border p-3 w-full rounded-md"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Email"
        className="border p-3 w-full rounded-md"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="active or inactive"
        className="border p-3 w-full rounded-md"
        onChange={(e) => setIsActive(e.target.value)}
      />
      <input
        type="text"
        placeholder="code"
        className="border p-3 w-full rounded-md"
        onChange={(e) => setIsActive(e.target.value)}
      />
    </div>
  );
}

export default ManuallySendEmail;
