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

export interface GroupedOptionType {
    label: string;
    options: OptionType[];
}

type SelectInputProps = {
    name: string;
    label: string;
    placeholder?: string;
    options: GroupedOptionType[];
    className?: string;
    defaultValue?: OptionType;
    disabled?: boolean;
    onChange?: (selected: OptionType | null) => void;
};

const GroupedSelectFormField = ({
    name,
    label,
    placeholder,
    options,
    defaultValue,
    disabled,
    className,
    onChange,
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
                            onChange={(selected) => {
                                field.onChange(selected ? selected.value : null);
                                if (onChange) {
                                    onChange(selected);
                                }
                            }}
                            value={
                                options
                                    ?.flatMap((group) => group.options)
                                    .find((option) => option.value === field.value) ||
                                defaultValue ||
                                null
                            }
                            isDisabled={disabled}
                            className="basic-single"
                            classNamePrefix="select"
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
                                groupHeading: (base) => ({
                                    ...base,
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                    color: "#4A5568",
                                    padding: "5px 10px",
                                    backgroundColor: "#F7FAFC",
                                }),
                                group: (base) => ({
                                    ...base,
                                    padding: "0",
                                }),
                            }}
                            noOptionsMessage={() => "Aucune option"}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default GroupedSelectFormField;
