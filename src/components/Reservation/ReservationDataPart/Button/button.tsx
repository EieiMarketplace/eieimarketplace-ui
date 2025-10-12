import { ReservationDetail } from "@/shared/interface";
import OrganizerButtonPart from "./OrganizerButton";
import VendorButtonPart from "./VendorButton";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";

export interface ButtonProps {
    role: string;
    status: string;
    form: any;
    reservationData: ReservationDetail;
}

export default function ButtonPart({
  Button
}: {
  Button: ButtonProps;
}){
    const { role, status, form, reservationData } = Button;

    return (
        <>
            {role === "vendor" ? (
                <VendorButtonPart Button={{role, status, form, reservationData}} />
            ) : (
                <OrganizerButtonPart Button={{role, status, form, reservationData}} />
            )}
        </>
    );
}