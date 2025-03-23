import { useFormContext } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form.tsx";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { SketchPicker } from "react-color";



type FormInputProps = {
    name: string;
    label: string;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    containerClassName?: string;
};

const NativeColorPickerFormField = ({
    name,
    label,
    placeholder,
    className = "",
    disabled,
    containerClassName,
}: FormInputProps) => {
    const { control, setValue } = useFormContext();

    return (
        <FormField
            name={name}
            control={control}
            disabled={disabled}
            render={({ field }) => (
                <FormItem className={containerClassName}>
                    <Popover>
                        <FormLabel>{label}</FormLabel>
                        <PopoverTrigger className="w-full">
                            <Input
                                name={name}
                                value={field.value}
                                readOnly
                                placeholder={placeholder}
                                disabled={disabled}
                            />
                        </PopoverTrigger>
                        <PopoverContent>
                            <SketchPicker
                                color={field.value}
                                onChange={(selectedColor) =>
                                    setValue(name, selectedColor.hex, {
                                        shouldValidate: true,
                                    })
                                }
                            />
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default NativeColorPickerFormField;
