import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { FiCheck, FiClock, FiPackage, FiMonitor, FiXCircle } from "react-icons/fi";

const TrackResult = () => {
  const { trackingId } = useParams();
  const axiosPublic = useAxiosPublic();

  const { data, isLoading } = useQuery({
    queryKey: ["tracking", trackingId],
    queryFn: async () => {
      const res = await axiosPublic.get(`/track/${trackingId}`);
      return res.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;

  if (!data)
    return (
      <div className="text-center py-20 text-gray-500">
        No tracking data found
      </div>
    );

  const isCancelled = data.status === "cancelled";

  const getStatusStep = () => {
    if (data.status === "pending") return 1;
    if (data.status === "processing") return 2;
    if (data.status === "shipped") return 3;
    if (data.status === "delivered") return 4;
    if (data.status === "cancelled") return 2;
    return 1;
  };

  const step = getStatusStep();

  const stepsData = isCancelled
    ? [
      { label: "Shipment Placed", icon: FiCheck },
      { label: "Cancelled", icon: FiXCircle },
    ]
    : [
      { label: "Shipment Placed", icon: FiCheck },
      { label: "Confirmed", icon: FiClock },
      { label: "On the Way", icon: FiPackage },
      { label: "Delivered", icon: FiMonitor },
    ];

  return (
    <div className="min-h-screen bg-linear-to-br from-yellow-50 via-white to-purple-50 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800">
            Shipment Tracking
          </h2>

          <p className="text-gray-500 mt-2">
            Tracking ID:{" "}
            <span className="font-semibold">{data.trackingId}</span>
          </p>
        </div>

        {/* STATUS TIMELINE */}
        <div className="max-w-md mx-auto bg-white rounded-3xl shadow-lg p-8 py-10">
          <div className="relative">
            {/* The vertical line */}
            <div className="absolute top-4 bottom-8 left-[19px] w-0.5 bg-gray-200"></div>

            {stepsData.map((s, index) => {
              const isActive = step >= index + 1;
              const isCurrent = step === index + 1;
              const Icon = s.icon;
              const isLast = index === stepsData.length - 1;

              return (
                <div
                  key={s.label}
                  className={`relative flex items-start gap-6 ${isLast ? "" : "mb-10"
                    }`}
                >
                  <div
                    className={`z-10 flex items-center justify-center w-10 h-10 rounded-full shrink-0 text-white ${isActive
                        ? s.label === "Cancelled"
                          ? "bg-red-500"
                          : "bg-green-500"
                        : "bg-gray-300"
                      }`}
                  >
                    <Icon size={20} />
                  </div>
                  <div className="pt-2">
                    <h3
                      className={`font-semibold text-lg ${isActive ? "text-gray-900" : "text-gray-500"
                        }`}
                    >
                      {s.label}
                    </h3>
                    {isActive && (
                      <p className="text-gray-500 text-sm mt-1">
                        {index === 0 && data.createdAt
                          ? new Date(data.createdAt).toLocaleString("en-US", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })
                          : (isCurrent || index < step) &&
                            data.updatedAt &&
                            index === step - 1
                            ? new Date(data.updatedAt).toLocaleString("en-US", {
                              dateStyle: "medium",
                              timeStyle: "short",
                            })
                            : ""}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackResult;