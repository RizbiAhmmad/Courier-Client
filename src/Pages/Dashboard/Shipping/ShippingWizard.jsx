import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import StepWhere from "./StepWhere";
import StepHow from "./StepHow";

const steps = ["Address", "Package", "Overview", "Confirm"];

const ShippingWizard = () => {
  const location = useLocation();
  const bannerData = location.state;

  const [currentStep, setCurrentStep] = useState(
    bannerData?.categoryId && bannerData?.countryId ? 1 : 1
  );

  const initialData = useRef({
    categoryId: bannerData?.categoryId || "",
    countryId: bannerData?.countryId || "",
    courierTypeId: "",
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    packages: [
      {
        weight: "",
        length: "",
        width: "",
        height: "",
        items: [{ itemName: "", quantity: 1 }],
      },
    ],
  });

  const [formData, setFormData] = useState(initialData.current);

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto bg-gradient-to-br from-yellow-50 via-white to-purple-50 pt-20">
      
     {/* TOP STEPPER */}
{/* TOP STEPPER */}
<div className="w-full max-w-5xl mx-auto px-4 pt-6 pb-10">
  <div className="overflow-x-auto">
    <div className="flex items-center justify-center min-w-max mx-auto">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = currentStep === stepNumber;
        const isCompleted = currentStep > stepNumber;

        return (
          <div key={step} className="flex items-center">
            
            {/* Step */}
            <div className="flex flex-col items-center px-3">
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border-2 transition-all duration-300
                ${
                  isCompleted
                    ? "bg-green-500 border-green-500 text-white"
                    : isActive
                    ? "bg-blue-500 border-blue-500 text-white"
                    : "bg-white border-gray-300 text-gray-400"
                }`}
              >
                {stepNumber}
              </div>

              <span
                className={`mt-2 text-xs sm:text-sm font-medium whitespace-nowrap
                ${
                  isActive
                    ? "text-blue-600"
                    : isCompleted
                    ? "text-green-600"
                    : "text-gray-400"
                }`}
              >
                {step}
              </span>
            </div>

            {/* Line */}
            {index !== steps.length - 1 && (
              <div
                className={`w-2 sm:w-16 h-[2px]
                ${isCompleted ? "bg-green-500" : "bg-gray-300"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  </div>
</div>

      {/* CONTENT */}
      <div className="p-6 md:p-12">
        <div className="w-full max-w-2xl mx-auto">
          {currentStep === 1 && (
            <StepWhere
              formData={formData}
              setFormData={setFormData}
              nextStep={nextStep}
            />
          )}

          {currentStep === 2 && (
            <StepHow
              formData={formData}
              setFormData={setFormData}
            />
          )}

          {/* NAVIGATION */}
          <div className="flex justify-between mt-10">
            {currentStep > 1 && (
              <button
                onClick={prevStep}
                className="px-6 py-2 bg-gray-300 rounded-lg"
              >
                Back
              </button>
            )}

            {currentStep < steps.length && (
              <button
                onClick={nextStep}
                className="px-6 py-2 bg-yellow-500 text-white rounded-lg"
              >
                Continue
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingWizard;