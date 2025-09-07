"use client";
import { Progress } from "@/components/ui/progress";
import { LoadingContext } from "@/shared/context/Loading";
import React from "react";

// const DotLoading = () => (
//   <div className="w-[190px] h-[190px] flex flex-col items-center justify-center bg-black opacity-60 rounded-lg">
//     <div className="dot-loader my-5">
//       <span className="dot" />
//       <span className="dot" />
//       <span className="dot" />
//       <span className="dot" />
//       <style>
//         {`
//         .dot-loader {
//           display: flex;
//           gap: 8px;
//           justify-content: center;
//           align-items: center;
//         }

//         .dot {
//           width: 8px;
//           height: 8px;
//           border-radius: 50%;
//           background-color: white;
//           opacity: 0.3;
//           animation: blink 1.4s infinite;
//         }

//         .dot:nth-child(1) {
//           animation-delay: 0s;
//         }
//         .dot:nth-child(2) {
//           animation-delay: 0.2s;
//         }
//         .dot:nth-child(3) {
//           animation-delay: 0.4s;
//         }

//         @keyframes blink {
//           0%, 80%, 100% {
//             opacity: 0.3;
//           }
//           40% {
//             opacity: 1;
//           }
//         }
//       `}
//       </style>
//     </div>
//     <span className="text-white text-[22px] font-semibold">Loading</span>
//   </div>
// );

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = React.useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
      {loading && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/50 z-[9999]">
          <h1 className="text-white text-[22px] font-semibold mb-4 text-center">
            Loading...
          </h1>
          <Progress className="w-[80%] bg-blue-100" value={66} />
        </div>
      )}
    </LoadingContext.Provider>
  );
};
