import Select from "react-select";
import { useFormContext } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form.tsx";

export interface OptionType {
    label: string;
    value: string;
}

type SelectInputProps = {
    name: string;
    label: string;
    placeholder?: string;
    options: OptionType[];
    className?: string;
    defaultValue?: OptionType;
    disabled?: boolean;
};

const SelectFormField = ({
    name,
    label,
    placeholder,
    options,
    defaultValue,
    disabled,
    className,
}: SelectInputProps) => {
    const { control } = useFormContext();

    return (
        <FormField
            name={name}
            control={control}
            render={({ field }) => (
                <FormItem className={className}>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Select
                            menuPlacement="auto"
                            options={options}
                            placeholder={placeholder}
                            onChange={(selected) =>
                                field.onChange(selected ? selected.value : null)
                            }
                            value={
                                options?.find((option) => option.value === field.value) ||
                                defaultValue ||
                                null
                            }
                            isDisabled={disabled}
                            className="basic-single"
                            classNamePrefix="select"
                            noOptionsMessage={() => "Aucune option"}
                            styles={{
                                control: (base, state) => ({
                                    ...base,
                                    borderColor: state.isFocused ? 'orange' : 'none',
                                    boxShadow: state.isFocused ? '0 0 0 1px #f97316' : 'none',
                                    '&:hover': { borderColor: '#f97316' },   
                                }),
                                option: (base, state) => ({
                                    ...base,
                                    backgroundColor: state.isFocused ? '#f97316' : 'none',
                                    color: state.isFocused ? 'white' : 'none',
                                    ":active": {
                                        ...base[':active'],
                                        backgroundColor: '#ea580c',
                                    }
                                }),
                            }}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default SelectFormField;
