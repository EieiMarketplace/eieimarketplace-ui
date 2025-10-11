import { ButtonProps } from "./button";

export default function VendorButtonPart({
  Button
}: {
  Button: ButtonProps;
}){
    const { role, status, form } = Button;
    
    const onRetire = () => {
      console.log("To Retire");
    };

    const onRequest = () => {
      console.log("To Request");
    };

    return (
      <>
        {status === "WAITFORPAY" && (
          <div className="flex justify-between mt-4 w-full">
            <button
              type="button"
              className="px-5 py-2 rounded-md bg-red-600 text-white text-sm hover:bg-red-500 transition"
              onClick={onRetire}
              style={{ cursor: "pointer" }}
            >
              Retire
            </button>
            <button
              type="button"
              className="px-5 py-2 rounded-md bg-gray-800 text-white text-sm hover:bg-gray-700 transition"
              onClick={onRequest}
              style={{ cursor: "pointer" }}
            >
              Request
            </button>
          </div>
        )
        }
      </>       

    );
}