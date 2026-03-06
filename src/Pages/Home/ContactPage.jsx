import React from "react";
import { MdOutlineCall, MdOutlineEmail } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { FiSend } from "react-icons/fi";

const ContactPage = () => {
  return (
    <div className="w-full">
      {/* HERO */}
      <section
        className="relative flex items-center justify-center min-h-150 py-28 text-white text-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://as1.ftcdn.net/jpg/05/79/30/50/1000_F_579305039_Un4Qd5louk34wUFA9YGRD7xJQTee1T9M.jpg')",
        }}
      >
        {/* overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>

          <p className="max-w-2xl mx-auto text-lg opacity-90">
            Have questions or want to work with us? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* CONTACT INFO CARDS */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="bg-white shadow-lg rounded-xl p-8 text-center hover:shadow-xl transition">
            <MdOutlineCall className="text-4xl text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Phone</h3>
            <p className="text-gray-600">+8801234567899</p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-8 text-center hover:shadow-xl transition">
            <MdOutlineEmail className="text-4xl text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p className="text-gray-600">sns@gmail.com</p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-8 text-center hover:shadow-xl transition">
            <IoLocationOutline className="text-4xl text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Location</h3>
            <p className="text-gray-600">Nikunja 2, Dhaka</p>
          </div>
        </div>
      </section>

      {/* FORM + MAP */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 bg-white shadow-xl rounded-xl p-10">
          {/* FORM */}
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="First Name"
                className="border rounded-lg p-3 outline-none focus:border-indigo-500"
              />

              <input
                type="text"
                placeholder="Last Name"
                className="border rounded-lg p-3 outline-none focus:border-indigo-500"
              />
            </div>

            <input
              type="email"
              placeholder="Email Address"
              className="border rounded-lg p-3 w-full outline-none focus:border-indigo-500"
            />

            <input
              type="text"
              placeholder="Phone Number"
              className="border rounded-lg p-3 w-full outline-none focus:border-indigo-500"
            />

            <textarea
              placeholder="Write your message..."
              rows="5"
              className="border rounded-lg p-3 w-full outline-none focus:border-indigo-500"
            ></textarea>

            <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition">
              <FiSend />
              Send Message
            </button>
          </form>

          {/* MAP */}
          <div className="h-105 rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d228.10175200975934!2d90.41648058811013!3d23.831822637319622!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c75b3993dde7%3A0x5350cad0e49d20bf!2sSNS%20International!5e0!3m2!1sen!2sbd!4v1772731715573!5m2!1sen!2sbd"
              className="w-full h-full border-0"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-100 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="font-semibold mb-2">
                How long does a project take?
              </h4>
              <p className="text-gray-600">
                Project timelines depend on complexity, but most projects take
                between 2–6 weeks.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="font-semibold mb-2">
                Do you offer support after delivery?
              </h4>
              <p className="text-gray-600">
                Yes! We provide maintenance and technical support for all our
                projects.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="font-semibold mb-2">How can I start a project?</h4>
              <p className="text-gray-600">
                Simply contact us through the form above and our team will get
                back to you shortly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-orange-50 text-black py-20 text-center px-4">
        <h2 className="text-4xl font-bold mb-4">
          Ready to Start Your Project?
        </h2>

        <p className="mb-8 opacity-90">
          Let's build something amazing together.
        </p>

        <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
          Get Started
        </button>
      </section>
    </div>
  );
};

export default ContactPage;
