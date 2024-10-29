import React from "react";
import { sendEmail } from "../services/emailjs";
import { toast } from "react-toastify";

function ManuallySendEmail() {
  const [email, setEmail] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [isActive, setIsActive] = React.useState("active");
  const [code, setCode] = React.useState("active");
  const [loading, setLoading] = React.useState(false);

  const handleSendEmail = async () => {
    setLoading(true);
    try {
      await sendEmail(firstName, email, code, isActive);
      setLoading(false);
      toast.success("Email sent successfully!");
    } catch (error) {
      setLoading(false);
      toast.error("Failed to send email");
    }
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
          placeholder="active or inactive or updated"
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
      {!loading ? (
        <button
          className="bg-blue-500 text-white p-4 w-30 rounded-md hover:bg-blue-400 ml-24"
          onClick={handleSendEmail}
        >
          Send Email
        </button>
      ) : (
        <button className="bg-blue-500 text-white p-4 w-30 rounded-md hover:bg-blue-400 ml-24">
          Sending Email...
        </button>
      )}
    </div>
  );
}

export default ManuallySendEmail;
