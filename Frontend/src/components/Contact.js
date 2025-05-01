import { useState } from "react";
import emailjs from "emailjs-com";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState(""); // success or error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_j5x338k",
        "template_pn7zazd",
        formData,
        "EEtmVsWWZBazzv7RU"
      )
      .then(
        () => {
          setStatus("success");
          setFormData({ name: "", email: "", message: "" });
        },
        () => {
          setStatus("error");
        }
      );
  };

  return (
    <div className="flex flex-col min-h-screen font-roboto bg-gray-50">
      <div className="flex-grow p-6 md:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-orange-600 mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Have questions, feedback, or just want to say hi? We'd love to hear
            from you!
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-6 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <button
              type="submit"
              className="bg-orange-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-orange-700 transition"
            >
              Send Message
            </button>
          </form>

          {/* 📦 Box Below Form */}
          {status === "success" && (
            <div className="mt-8 bg-green-50 border-l-4 border-green-400 text-green-800 p-4 rounded">
              <p>
                <strong>Thank you!</strong> We've received your message and will
                get back to you shortly.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
