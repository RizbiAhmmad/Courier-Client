import { MdOutlineCall, MdOutlineEmail } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { CgFacebook } from "react-icons/cg";
import { BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import { GradientText } from "@/components/ui/GradientText";

const ContactForm = () => {
  return (
    <section className="w-full py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 p-7.5 rounded-xl shadow-xl bg-white dark:bg-slate-800">
        {/* informations */}
        <aside className="w-full bg-gray-800 dark:bg-slate-900 flex flex-col justify-between p-7.5 rounded-lg shadow-lg">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold leading-tight">
              <GradientText
                className="block"
                colors={["#f59e0b", "#ef4444", "#8b5cf6"]}
                animationSpeed={5}
              >
                Get in Touch
              </GradientText>
            </h1>
            <p className="text-[0.9rem] mt-1 mb-8 text-gray-300">
              Let's align our constellations! Reach out and let the magic of
              collaboration illuminate our skies.
            </p>
          </div>

          <div className="flex flex-col gap-5 text-gray-300 text-[15px]">
            <p className="flex items-center gap-2">
              <MdOutlineCall />
              +8801234567899
            </p>

            <p className="flex items-center break-all gap-2">
              <MdOutlineEmail />
              sns@gmail.com
            </p>

            <p className="flex items-center gap-2">
              <IoLocationOutline />
              Nikunja 2, Khilkhet, Dhaka-1229
            </p>
          </div>

          <div className="flex gap-4 flex-wrap text-black mt-8">
            <a className="text-[1.3rem] p-2 cursor-pointer rounded-full bg-orange-500 text-white hover:bg-white hover:text-orange-500 transition-all duration-300 shadow-md">
              <CgFacebook />
            </a>

            <a className="text-[1.2rem] p-2 cursor-pointer rounded-full bg-orange-500 text-white hover:bg-white hover:text-orange-500 transition-all duration-300 shadow-md">
              <BsTwitter />
            </a>

            <a className="text-[1.2rem] p-2 cursor-pointer rounded-full bg-orange-500 text-white hover:bg-white hover:text-orange-500 transition-all duration-300 shadow-md">
              <BsInstagram />
            </a>

            <a className="text-[1.2rem] p-2 cursor-pointer rounded-full bg-orange-500 text-white hover:bg-white hover:text-orange-500 transition-all duration-300 shadow-md">
              <BsLinkedin />
            </a>
          </div>
        </aside>

        {/* map */}
        <div className="h-full min-h-100 rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d228.10175200975934!2d90.41648058811013!3d23.831822637319622!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c75b3993dde7%3A0x5350cad0e49d20bf!2sSNS%20International!5e0!3m2!1sen!2sbd!4v1772731715573!5m2!1sen!2sbd"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
