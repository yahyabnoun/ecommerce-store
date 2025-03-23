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
    disabled?: boolean;
    containerClassName?: string;
};

const TextFormField = ({
    name,
    label,
    placeholder,
    className = "",
    disabled,
    containerClassName,
}: FormInputProps) => {
    const { control } = useFormContext();

    return (
        <FormField
            name={name}
            control={control}
            disabled={disabled}
            render={({ field }) => (
                <FormItem className={containerClassName}>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input
                            {...field}
                            placeholder={placeholder}
                            className={className}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default TextFormField;
