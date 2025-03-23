import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

export type ToastStatus = "success" | "error" | "warning";

export const showToast = (
    type: ToastStatus = "warning",
    message: string,
    description?: string
) => {
    const icons = {
        success: <CheckCircle className="w-4 text-success" />,
        error: <XCircle className="w-4 text-destructive" />,
        warning: <AlertTriangle className="w-4 text-warning" />,
    };

    toast[type](message, {
        description: description,
        icon: icons[type],
        position: "top-right",
    });
};
