import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FAQAccordion() {
  const navigate = useNavigate();
  
  const faqData = [
    {
      question: "What services does SNS International provide?",
      answer: "SNS International provides international courier, air freight, sea freight, customs support, import/export logistics, and shipment coordination services."
    },
    {
      question: "Do you handle both import and export shipments?",
      answer: "Yes, we provide support for both import and export shipments depending on the shipment type, destination, and logistics requirements."
    },
    {
      question: "Do you provide international courier service?",
      answer: "Yes, we provide global courier services through trusted courier networks such as DHL, FedEx, UPS, TNT, and Aramex."
    },
    {
      question: "Can you help with customs clearance and documentation?",
      answer: "Yes, we provide support with customs-related processes, shipment documentation, and clearance coordination."
    },
    {
      question: "Do you offer air freight services?",
      answer: "Yes, we provide international air freight solutions for urgent, commercial, and regular cargo shipments."
    },
    {
      question: "Do you offer sea freight services?",
      answer: "Yes, we provide sea freight import and export services, including FCL and LCL shipping support."
    },
    {
      question: "Which countries do you serve?",
      answer: "We support shipments across many destinations worldwide, including key regions such as Europe, the Middle East, the USA, China, Malaysia, Indonesia, Hong Kong, Thailand, and more."
    },
    {
      question: "Can small businesses or online sellers work with SNS International?",
      answer: "Absolutely. We support small businesses, entrepreneurs, online sellers, and e-commerce businesses looking for reliable international shipping solutions."
    },
    {
      question: "How can I request a shipping quote?",
      answer: "You can contact us directly through our website contact form, WhatsApp, email, or phone to request a quotation."
    },
    {
      question: "Why should I choose SNS International?",
      answer: "Because we combine experience, global reach, practical logistics support, responsive customer service, and business-focused solutions to help clients ship with confidence."
    }
  ];

  return (
    <section className="py-12 bg-white dark:bg-zinc-950 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Left Side: Info & Image-like box */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/3 sticky top-24 space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-zinc-900 text-indigo-900 dark:text-yellow-500 rounded-full text-xs font-bold uppercase tracking-widest border border-indigo-100 dark:border-zinc-800">
              <HelpCircle size={16} />
              Support Center
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-indigo-950 dark:text-white leading-tight">
              Common <span className="text-yellow-500 italic">Questions</span> To Help You Ship Smarter.
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-zinc-400 leading-relaxed font-medium">
              Find quick answers to your logistics queries. If you don't find what you're looking for, our team is just a message away.
            </p>

            <div className="p-8 bg-linear-to-br from-yellow-400 to-orange-500 rounded-[2.5rem] text-white shadow-xl shadow-orange-500/20">
              <MessageCircle size={40} className="mb-4 opacity-50" />
              <h4 className="text-xl font-bold mb-2 transition-transform">Still have questions?</h4>
              <p className="text-white/90 mb-6 text-sm">Our logistics experts are ready to provide technical support and practical guidance.</p>
              <button  onClick={() => navigate(`/contact`)} className="w-full py-3 bg-white text-orange-500 font-bold rounded-2xl hover:bg-zinc-50 transition-all active:scale-95 shadow-lg">
                Contact Support
              </button>
            </div>
          </motion.div>

          {/* Right Side: Accordion */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-2/3 w-full space-y-4 mt-6"
          >
            {faqData.map((item, index) => (
              <AccordionItem 
                key={index} 
                index={index}
                question={item.question} 
                answer={item.answer} 
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function AccordionItem({ question, answer, index }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className={`group border rounded-3xl transition-all duration-300 ${
        isOpen 
          ? "border-indigo-100 bg-indigo-50/30 dark:border-zinc-800 dark:bg-zinc-900/50" 
          : "border-zinc-100 bg-white dark:border-zinc-800 dark:bg-zinc-900/10 hover:border-yellow-200 dark:hover:border-zinc-700"
      }`}
    >
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex justify-between items-center text-left p-6 md:p-8 focus:outline-none"
      >
        <span className={`text-lg md:text-xl font-bold transition-colors duration-300 ${
          isOpen ? "text-indigo-950 dark:text-yellow-500" : "text-gray-800 dark:text-zinc-300 group-hover:text-indigo-900 dark:group-hover:text-white"
        }`}>
          {question}
        </span>
        <div className={`p-2 rounded-xl transition-all duration-300 ${
          isOpen ? "bg-indigo-900 text-white rotate-180" : "bg-zinc-100 dark:bg-zinc-800 text-gray-500"
        }`}>
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 md:px-8 md:pb-8">
              <div className="w-full h-px bg-indigo-100 dark:bg-zinc-800 mb-6"></div>
              <p className="text-gray-600 dark:text-zinc-400 leading-relaxed text-lg font-medium">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}