import { ReservationDetail } from "@/shared/interface";
import OrganizerButtonPart from "./OrganizerButton";
import VendorButtonPart from "./VendorButton";
import { FormDataLog } from "../ui";

export interface ButtonProps {
  role: string;
  status: string;
  form: FormDataLog;
  reservationData: ReservationDetail;
  newSlip?: File | undefined | null;
}

export default function ButtonPart({ Button }: { Button: ButtonProps }) {
  const { role, status, form, reservationData, newSlip } = Button;

  return (
    <>
      {role === "vendor" ? (
        <VendorButtonPart
          Button={{ role, status, form, reservationData, newSlip }}
        />
      ) : (
        <OrganizerButtonPart Button={{ role, status, form, reservationData }} />
      )}
    </>
  );
}
