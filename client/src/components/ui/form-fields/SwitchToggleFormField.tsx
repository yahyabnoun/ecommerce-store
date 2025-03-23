import { useFormContext } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form.tsx";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";

type FormInputProps = {
    name: string;
    label: string;
    placeholder?: string;
    className?: string;
    containerClassName?: string;
    labelClassName?: string;
};

const SwitchToggleFormField = ({
    name,
    label,
    placeholder,
    className = "",
    containerClassName,
    labelClassName,
}: FormInputProps) => {
    const { control } = useFormContext();

    return (
        <FormField
            name={name}
            control={control}
            render={({ field }) => (
                <FormField
                    control={control}
                    name={name}
                    render={({ field }) => (
                        <FormItem className={className}>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <FormLabel className={labelClassName}>{label}</FormLabel>
                        </FormItem>
                    )}
                />
            )}
        />
    );
};

export default SwitchToggleFormField;
