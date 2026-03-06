import React from "react";
import { motion } from "framer-motion";
import { FiTarget, FiEye, FiUsers, FiAward } from "react-icons/fi";

const AboutPage = () => {
  return (
    <div className="w-full">

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
          <h1 className="text-5xl font-bold mb-4">About Our Company</h1>

          <p className="max-w-2xl mx-auto text-lg opacity-90">
            We are passionate about building modern digital solutions that help
            businesses grow and succeed in the online world.
          </p>
        </div>
      </section>

      {/* ABOUT COMPANY */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <img
            src="https://png.pngtree.com/thumb_back/fh260/background/20260107/pngtree-cargo-ships-dock-at-the-pier-people-enjoy-the-view-image_21008308.webp"
            className="rounded-xl shadow-lg"
          />

          <div>
            <h2 className="text-4xl font-bold mb-6">Who We Are</h2>

            <p className="text-gray-600 mb-4">
              Our company specializes in web development, digital marketing, and
              modern technology solutions. We help startups and businesses
              transform their ideas into powerful digital experiences.
            </p>

            <p className="text-gray-600">
              With a passionate team of developers and designers, we deliver
              high-quality solutions that are scalable, secure, and visually
              stunning.
            </p>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="bg-gray-100 py-20 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
          <div className="bg-white p-8 rounded-xl shadow-md">
            <FiTarget className="text-4xl text-indigo-600 mb-4" />
            <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
            <p className="text-gray-600">
              Our mission is to empower businesses with cutting-edge digital
              solutions that improve efficiency, customer engagement, and
              growth.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md">
            <FiEye className="text-4xl text-purple-600 mb-4" />
            <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
            <p className="text-gray-600">
              Our vision is to become a global technology partner for startups
              and enterprises by delivering innovation-driven solutions.
            </p>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          <div>
            <h2 className="text-4xl font-bold text-indigo-600">200+</h2>
            <p className="text-gray-600 mt-2">Projects Completed</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-indigo-600">150+</h2>
            <p className="text-gray-600 mt-2">Happy Clients</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-indigo-600">20+</h2>
            <p className="text-gray-600 mt-2">Expert Team</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-indigo-600">5+</h2>
            <p className="text-gray-600 mt-2">Years Experience</p>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-gray-100 py-20 px-4">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold">Why Choose Us</h2>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
          <div className="bg-white p-8 rounded-xl shadow-md">
            <FiUsers className="text-3xl text-indigo-600 mb-4" />
            <h4 className="text-xl font-semibold mb-3">Expert Team</h4>
            <p className="text-gray-600">
              Our experienced professionals deliver high quality work.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md">
            <FiAward className="text-3xl text-indigo-600 mb-4" />
            <h4 className="text-xl font-semibold mb-3">Quality Service</h4>
            <p className="text-gray-600">
              We always focus on quality and client satisfaction.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md">
            <FiTarget className="text-3xl text-indigo-600 mb-4" />
            <h4 className="text-xl font-semibold mb-3">Result Driven</h4>
            <p className="text-gray-600">
              Our solutions are designed to deliver measurable results.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-600 text-white py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Ready To Work With Us?</h2>

          <p className="mb-8 opacity-90">
            Let's build something amazing together. Contact us today to get
            started.
          </p>

          <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
