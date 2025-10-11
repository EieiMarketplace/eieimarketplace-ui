import { ButtonProps } from "./button";

export default function OrganizerButtonPart({
  Button
}: {
  Button: ButtonProps;
}){
    const { role, status, form } = Button;

    const onSubmit = (data: any) => {
      const logName = data.log;
      if(!logName) return;

      console.log("Selected Log:", logName);
    };

    const onRejectAPP = () => {
      console.log("To onRejectAPP");
    };

    const onRejectWAIT = () => {
      console.log("To onRejectWAIT");
    };

    const onApprove = () => {
      console.log("To onApprove");
    };

    const onNewInvoice = () => {
      console.log("To onNewInvoice");
    };
    
    return (
        <>
        {status === "APPLICATION" && (
            <div className="flex justify-between mt-4 w-full">
            <button
              type="button"
              className="px-5 py-2 rounded-md bg-red-600 text-white text-sm hover:bg-red-500 transition"
              onClick={onRejectAPP}
              style={{ cursor: "pointer" }}
            >
              Reject
            </button>
            <button
              type="button"
              className="px-5 py-2 rounded-md bg-gray-800 text-white text-sm hover:bg-gray-700 transition"
              onClick={() => onSubmit(form.getValues())}
              style={{ cursor: "pointer" }}
            >
              Submit
            </button>
            </div>
        )}

        {status === "WAITFORPAY" && (
          <button
              type="button"
              className="px-5 py-2 rounded-md bg-red-600 text-white text-sm hover:bg-red-500 transition"
              onClick={onRejectWAIT}
              style={{ cursor: "pointer" }}
            >
              Reject
            </button>
        )
        }

        {status === "VALIDATESLIP" && (
          <button
              type="button"
              className="px-5 py-2 rounded-md bg-green-600 text-white text-sm hover:bg-green-500 transition"
              onClick={onApprove}
              style={{ cursor: "pointer" }}
            >
              Approve
            </button>
        )
        }

        {status === "MERCHANT" && (
          <button
              type="button"
              className="px-5 py-2 rounded-md bg-gray-800 text-white text-sm hover:bg-gray-700 transition"
              onClick={onNewInvoice}
              style={{ cursor: "pointer" }}
            >
              Send New Invoice
            </button>
        )
        }


        </>
    );
}