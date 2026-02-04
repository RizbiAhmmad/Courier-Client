import { CheckCircle, ArrowUpRight } from "lucide-react";
import shippingcard from "../../assets/credit_card.png"

export default function ShippingHero() {
  return (
    <div className="min-h-screen bg-linear-to-br from-yellow-100 via-white to-blue-50 flex items-center px-6">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-[#1B1F5C]">
            XCARGO <span className="text-yellow-400">helps</span>{" "}
            <span className="text-orange-400">you</span> like there are no borders!
          </h1>

          <p className="mt-6 text-gray-700 max-w-xl">
            Shipping provides you with a full package of shipping perks along
            with freight forwarding to almost every country of the world!
          </p>

          <p className="mt-6 font-medium text-gray-800">
            Sign up for XCARGO and unleash the world of shipping perks such as:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {["Free fast processing", "Package insurance", "Package consolidation", "Address correction"].map(
              (item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle className="text-orange-400" />
                  <span className="text-gray-800">{item}</span>
                </div>
              )
            )}
          </div>

          <button className="mt-8 inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline">
            Learn more <ArrowUpRight size={18} />
          </button>
        </div>

        {/* Right Image */}
        <div className="flex justify-center md:justify-end">
          <img
            src={shippingcard}
            alt="Shipping illustration"
            className="max-w-full w-105 md:w-130 drop-shadow-xl"
          />
        </div>
      </div>
    </div>
  );
}
