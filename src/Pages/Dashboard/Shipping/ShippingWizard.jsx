// ShippingWizard.jsx
import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import StepWhere from "./StepWhere";
import StepHow from "./StepHow";
import StepOverview from "./StepOverview";

const pushGTM = (data) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(data);
};

const steps = ["Address", "Package", "Overview", "Success"];

const ShippingWizard = () => {
  const location = useLocation();
  const bannerData = location.state;

  const [errors, setErrors] = useState({});
  const [trackingId, setTrackingId] = useState("");
  const [shipmentData, setShipmentData] = useState(null);
  const invoiceRef = useRef();

  const [currentStep, setCurrentStep] = useState(
    bannerData?.categoryId && bannerData?.countryId ? 1 : 1,
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

  const validateStep = () => {
    let newErrors = {};
    if (currentStep === 1) {
      if (!formData.name.trim()) newErrors.name = "Full name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email))
        newErrors.email = "Invalid email format";
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
      else if (!/^(\+8801|01)[3-9]\d{8}$/.test(formData.phone))
        newErrors.phone = "Invalid BD phone number";
      if (!formData.address.trim()) newErrors.address = "Address is required";
      if (!formData.categoryId)
        newErrors.categoryId = "Please select shipment type";
      if (!formData.countryId)
        newErrors.countryId = "Please select destination country";
    }

    if (currentStep === 2) {
      if (!formData.courierTypeId)
        newErrors.courierTypeId = "Select courier service";
      formData.packages.forEach((box, boxIndex) => {
        if (!box.weight) newErrors[`weight-${boxIndex}`] = "Weight required";
        if (!box.length) newErrors[`length-${boxIndex}`] = "Length required";
        if (!box.width) newErrors[`width-${boxIndex}`] = "Width required";
        if (!box.height) newErrors[`height-${boxIndex}`] = "Height required";
        box.items.forEach((item, itemIndex) => {
          if (!item.itemName.trim())
            newErrors[`itemName-${boxIndex}-${itemIndex}`] =
              "Item name required";
          if (!item.quantity)
            newErrors[`quantity-${boxIndex}-${itemIndex}`] =
              "Quantity required";
        });
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (!validateStep()) return;

  const totalShipping =
    formData.packages?.reduce(
      (total, box) => total + (Number(box.shippingCost) || 0),
      0
    ) || 0;

    if (currentStep === 2) {
      pushGTM({
        event: "add_shipping_info",
        ecommerce: {
          currency: "BDT",
          value: totalShipping,
          items: formData.packages.map((box, i) => ({
            item_id: `box_${i + 1}`,
            item_name: "Shipment Box",
            weight: box.weight,
            price: box.shippingCost,
            quantity: 1,
          })),
        },
      });
    }

    if (currentStep < steps.length) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const printInvoice = () => {
    const invoiceEl = invoiceRef.current;
    if (!invoiceEl) return;

    const clone = invoiceEl.cloneNode(true);
    const printWindow = window.open("", "_blank", "width=900,height=700");

    printWindow.document.write("<html><head><title>Shipment Invoice</title>");
    printWindow.document.write(`
    <style>
      body { font-family: Arial, sans-serif; margin:0; padding:20px; background:#f5f5f5; }
      .invoice-container { background:#fff; border:1px solid #ccc; border-radius:16px; padding:20px; }
      h2,h3 { margin:0 0 8px 0; }
      p { margin:4px 0; }
    </style>
  `);
    printWindow.document.write("</head><body>");
    printWindow.document.body.appendChild(clone);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  const downloadPDF = async () => {
    if (!invoiceRef.current) return;

    try {
      // Temporarily override unsupported background
      const originalBg = invoiceRef.current.style.background;
      invoiceRef.current.style.background = "#ffffff";

      const canvas = await html2canvas(invoiceRef.current, {
        scale: 2,
        backgroundColor: "#fff",
        useCORS: true,
      });

      // Restore original background
      invoiceRef.current.style.background = originalBg;

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = 190;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 10, 10, pdfWidth, pdfHeight);
      pdf.save(`shipment-invoice-${trackingId}.pdf`);
    } catch (error) {
      console.error("PDF download failed:", error);
      alert("Failed to generate PDF. Please try printing instead.");
    }
  };
  return (
    <div className="min-h-screen bg-linear-to-br from-yellow-50 via-white to-purple-50 pt-20">
      {/* STEPPER */}
      <div className="w-full max-w-5xl mx-auto px-4 pt-6 pb-10">
        <div className="overflow-x-auto">
          <div className="flex items-center justify-center min-w-max mx-auto">
            {steps.map((step, index) => {
              const stepNumber = index + 1;
              const isActive = currentStep === stepNumber;
              const isCompleted = currentStep > stepNumber;
              return (
                <div key={step} className="flex items-center">
                  <div className="flex flex-col items-center px-3">
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border-2 transition-all duration-300
                        ${isCompleted ? "bg-green-500 border-green-500 text-white" : isActive ? "bg-blue-500 border-blue-500 text-white" : "bg-white border-gray-300 text-gray-400"}`}
                    >
                      {stepNumber}
                    </div>
                    <span
                      className={`mt-2 text-xs sm:text-sm font-medium whitespace-nowrap
                        ${isActive ? "text-blue-600" : isCompleted ? "text-green-600" : "text-gray-400"}`}
                    >
                      {step}
                    </span>
                  </div>
                  {index !== steps.length - 1 && (
                    <div
                      className={`w-2 sm:w-16 h-0.5 ${isCompleted ? "bg-green-500" : "bg-gray-300"}`}
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
              errors={errors}
            />
          )}

          {currentStep === 2 && (
            <StepHow
              formData={formData}
              setFormData={setFormData}
              errors={errors}
            />
          )}

          {currentStep === 3 && (
            <StepOverview
              formData={formData}
              setFormData={setFormData}
              onSuccess={(data) => {
                pushGTM({
                  event: "purchase",
                  ecommerce: {
                    transaction_id: data.trackingId,
                    currency: "BDT",
                    value: data.totalShipping,
                    items: formData.packages.map((box, i) => ({
                      item_id: `box_${i + 1}`,
                      item_name: "Shipment Box",
                      weight: box.weight,
                      price: box.shippingCost,
                      quantity: 1,
                    })),
                  },
                });

                setTrackingId(data.trackingId);
                setShipmentData(data);
                setCurrentStep(4);
              }}
            />
          )}

          {currentStep === 4 && shipmentData && (
            <div className="max-w-4xl mx-auto">
              <div
                ref={invoiceRef}
                className="bg-white shadow-2xl rounded-3xl p-10 border"
              >
                {/* Header */}
                <div className=" text-center items-center border-b pb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-green-600">
                      Shipment Invoice
                    </h2>
                    <p className="text-gray-500">Tracking ID: {trackingId}</p>
                    <p className="text-gray-500">
                      {new Date().toLocaleDateString()}
                    </p>
                  </div>
                  {/* <div className="text-right text-sm text-gray-500">{new Date().toLocaleDateString()}</div> */}
                </div>

                {/* Sender + Receiver */}
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-gray-50 p-6 rounded-2xl">
                    <h3 className="font-semibold mb-2">Personal Information</h3>
                    <p>{shipmentData.name}</p>
                    <p>{shipmentData.email}</p>
                    <p>{shipmentData.phone}</p>
                    <p>{shipmentData.address}</p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-2xl">
                    <h3 className="font-semibold mb-2">Courier Information</h3>
                    <p>Country: {shipmentData.countryName}</p>
                    <p>Courier: {shipmentData.courierTypeName}</p>
                    <p>Status: {shipmentData.status}</p>
                  </div>
                </div>

                {/* Package Summary */}
                <div className="mt-10">
                  <h3 className="text-xl font-semibold mb-4">
                    Package Summary
                  </h3>
                  {shipmentData.packages?.map((box, index) => (
                    <div key={index} className="border p-4 rounded-xl mb-4">
                      <p className="font-semibold">Box {index + 1}</p>
                      <p>Weight: {box.weight} kg</p>
                      <p>
                        Size: {box.length} × {box.width} × {box.height}
                      </p>
                      <p className="font-semibold text-green-600">
                        Shipping: ৳ {box.shippingCost}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-right text-2xl font-bold text-purple-600">
                  Total: ৳ {shipmentData.totalShipping}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-center gap-6 mt-8">
                <button
                  onClick={printInvoice}
                  className="px-6 py-2 bg-blue-600 text-white rounded-xl"
                >
                  Print Invoice
                </button>

                {/* <button
                  onClick={downloadPDF}
                  className="px-6 py-2 bg-green-600 text-white rounded-xl"
                >
                  Download PDF
                </button> */}
              </div>
            </div>
          )}

          {/* NAVIGATION BUTTONS (Step 3 এ hide) */}
          {currentStep < 3 && (
            <div className="flex justify-between mt-10">
              {currentStep > 1 && (
                <button
                  onClick={prevStep}
                  className="px-6 py-2 bg-green-500 rounded-lg"
                >
                  Back
                </button>
              )}
              <button
                onClick={nextStep}
                className="px-6 py-2 bg-yellow-500 text-white rounded-lg"
              >
                Continue
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShippingWizard;
