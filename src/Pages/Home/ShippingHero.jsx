import { CheckCircle, ArrowUpRight } from "lucide-react";
// import shippingcard from "../../assets/credit_card.png";
import { GradientText } from "@/components/ui/GradientText";
import { useNavigate } from "react-router-dom";

export default function ShippingHero() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-linear-to-br from-yellow-50 via-white to-indigo-50 flex items-center px-6 py-20 overflow-hidden">
      <div className="max-w-8xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-900 rounded-full text-sm font-bold tracking-wide border border-indigo-100">
            <CheckCircle size={16} className="text-yellow-500" />
            Serving Businesses Since 2017
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-indigo-950">
            Global Logistics <GradientText colors={["#f59e0b", "#ef4444", "#8b5cf6"]}>Redefined</GradientText>
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
            SNS International is a Bangladesh-based freight forwarding, international courier, and logistics solutions company helping businesses and individuals move goods safely and efficiently across the world.
          </p>

          <p className="text-gray-600 leading-relaxed max-w-2xl italic border-l-4 border-yellow-400 pl-4 bg-yellow-50/30 py-2">
            We provide Import, Export, Air Freight, Sea Freight, International Courier, and Customs Support with dependable service, practical expertise, and customer-focused logistics solutions.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mt-10">
            {[
              "International Courier",
              "Air Freight",
              "Sea Freight",
              "Customs Support",
              "Import & Export Solutions",
              "Door-to-Door Delivery",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center text-yellow-600 group-hover:bg-yellow-500 group-hover:text-white transition-all">
                  <CheckCircle size={18} />
                </div>
                <span className="text-gray-800 font-medium group-hover:text-indigo-900 transition-colors">{item}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 mt-12">
            <button  onClick={() => navigate(`/contact`)} className="px-10 py-4 bg-linear-to-r from-yellow-400 to-orange-500 text-white rounded-full font-bold shadow-xl shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-1 transition-all flex items-center gap-2 active:scale-95">
              Contact Us <ArrowUpRight size={20} />
            </button>
            {/* <button className="px-10 py-4 border-2 border-indigo-900 text-indigo-900 rounded-full font-bold hover:bg-indigo-900 hover:text-white transition-all active:scale-95">
              Contact Us
            </button> */}
          </div>
        </div>

        {/* Right Image */}
        <div className="relative flex justify-center md:justify-end">
          <div className="absolute -inset-10 bg-indigo-500/5 blur-3xl rounded-full animate-pulse"></div>
          <img
            src="/shipping-hero.png"
            alt="SNS International Logistics"
            className="relative max-w-full w-full lg:w-[120%] h-auto rounded-[3rem] shadow-2xl z-10 transform scale-105 border-8 border-white dark:border-zinc-800"
          />
          <div className="absolute -bottom-6 -left-6 z-20 bg-white dark:bg-zinc-900 p-6 rounded-3xl shadow-2xl flex items-center gap-4 border border-indigo-50">
             <div className="w-12 h-12 bg-indigo-900 rounded-xl flex items-center justify-center text-white font-bold text-xl">
               8+
             </div>
             <div>
               <p className="font-bold text-indigo-950">Years Experience</p>
               <p className="text-xs text-gray-500">Trusted Logistics Partner</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
