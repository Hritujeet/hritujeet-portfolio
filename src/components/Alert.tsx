import { Alert as ShadcnAlert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle } from "lucide-react";

const Alert = ({
    variant,
    children,
}: {
    variant: "success" | "error";
    children: React.ReactNode;
}) => {
    return (
        <ShadcnAlert variant={variant === "error" ? "destructive" : "default"} className="my-2">
            {variant === "success" ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
            <AlertTitle>{variant === "success" ? "Success" : "Error"}</AlertTitle>
            <AlertDescription>{children}</AlertDescription>
        </ShadcnAlert>
    );
};

export default Alert;
