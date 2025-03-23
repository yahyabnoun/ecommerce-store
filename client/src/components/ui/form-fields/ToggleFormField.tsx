import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Label } from "../ui/label";
import { FormField, FormMessage } from "../ui/form";
import { Control } from "react-hook-form";

interface Option {
    label: string;
    value: any;
}
type ETF = Record<string, any>;

interface ToggleFormFieldProps<T extends ETF> {
    label: string;
    name: keyof T;
    options: Option[];
    control: Control<T, any>;
    disabled?: boolean;
    containerClassName?: string;
}

export const ToggleFormField = <T extends ETF>(props: ToggleFormFieldProps<T>) => {
    const { label, name, options, control, disabled = false, containerClassName } = props;

    return (
        <FormField
            control={control}
            name={name as any}
            render={({ field }) => {
                const currentValue = field.value;

                return (
                    <div className={containerClassName}>
                        <Label>{label}</Label>
                        <ToggleGroup
                            disabled={disabled}
                            type="single"
                            value={currentValue?.toString() ?? ""}
                            onValueChange={(option) => {
                                field.onChange(option);
                            }}
                            className="w-fit mt-2 bg-gray-100 rounded-lg p-2 gap-1"
                        >
                            {options.map((option) => (
                                <ToggleGroupItem
                                    value={option.value.toString()}
                                    key={option.value}
                                    className="
                                        data-[state=on]:bg-orange-500 
                                        data-[state=on]:text-white 
                                        hover:bg-gray-300 
                                        hover:text-black 
                                       "
                                >
                                    {option.label}
                                </ToggleGroupItem>
                            ))}
                        </ToggleGroup>
                        <FormMessage />
                    </div>
                );
            }}
        />
    );
};
