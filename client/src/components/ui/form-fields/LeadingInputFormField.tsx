import { useFormContext } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form.tsx";
import { Input } from "../ui/input";
import { ArrowUpIcon } from "lucide-react";

type FormInputProps = {
    name: string;
    label: string;
    placeholder?: string;
    className?: string;
};

const IconInputFormField = ({
    name,
    label,
    placeholder,
    className = "",
}: FormInputProps) => {
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
                            <div className="flex min-w-fit  items-center justify-center px-3 border border-r-0 rounded-l-md bg-muted text-muted-foreground text-sm">
                                3 kg asddsa
                            </div>
                            <Input
                                {...field}
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

export default IconInputFormField;
