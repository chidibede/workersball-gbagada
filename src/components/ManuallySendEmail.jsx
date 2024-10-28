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
    <div className="space-y-4">
      <div className="w-[50%] justify-center items-center px-24 py-12">
        <input
          type="text"
          placeholder="First Name"
          className="border p-3 w-full rounded-md mb-4"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          className="border p-3 w-full rounded-md mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="active or inactive"
          className="border p-3 w-full rounded-md mb-4"
          onChange={(e) => setIsActive(e.target.value)}
        />
        <input
          type="text"
          placeholder="code"
          className="border p-3 w-full rounded-md"
          onChange={(e) => setCode(e.target.value)}
        />
      </div>
      <button
        className="bg-blue-500 text-white p-4 w-30 rounded-md hover:bg-blue-400 ml-24"
        onClick={handleSendEmail}
      >
        Send Email
      </button>
    </div>
  );
}

export default ManuallySendEmail;
