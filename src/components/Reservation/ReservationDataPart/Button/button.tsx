import OrganizerButtonPart from "./OrganizerButton";
import VendorButtonPart from "./VendorButton";

export interface ButtonProps {
    role: string;
    status: string;
    form: any;
}

export default function ButtonPart({
  Button
}: {
  Button: ButtonProps;
}){

    const { role, status, form } = Button;

    return (
        <>
            {role === "vendor" ? (
                <VendorButtonPart Button={{role, status, form}} />
            ) : (
                <OrganizerButtonPart Button={{role, status, form}} />
            )}
        </>
    );
}