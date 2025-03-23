import { useFormContext } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form.tsx";
import { Input } from "../ui/input";

type FormInputProps = {
    name: string;
    label: string;
    placeholder?: string;
    className?: string;
};

const PhoneNumberFormField = ({ name, label, placeholder, className = "" }: FormInputProps) => {
    const { control } = useFormContext();

    return (
        <FormField
            name={name}
            control={control}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <div className="flex">
                            <div className="flex items-center justify-center px-3 border border-r-0 rounded-l-md bg-muted text-muted-foreground text-sm">
                                +212
                            </div>
                            <Input
                                {...field}
                                placeholder={"600112233"}
                                className={`rounded-l-none ${className}`}
                            />
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default PhoneNumberFormField;
