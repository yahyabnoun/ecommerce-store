import { useFormContext } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form.tsx";
import { Textarea } from "../ui/textarea";




type FormInputProps = {
    name: string;
    label: string;
    placeholder?: string;
    className?: string;
    containerClassName?: string,
    height?: string;
};

const TextAreaFormField = ({
    name,
    label,
    placeholder,
    className = "",
    containerClassName,
    height
}: FormInputProps) => {
    const { control } = useFormContext();

    return (
        <FormField
            name={name}
            control={control}
            render={({ field }) => (
                <FormItem className={containerClassName}>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Textarea
                            style={{ height }}
                            {...field}
                            placeholder={placeholder}
                            className={`${className}`}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default TextAreaFormField;
