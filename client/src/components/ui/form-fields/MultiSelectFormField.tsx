import { useState } from "react";
import { useFormContext } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form.tsx";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";


const animatedComponents = makeAnimated();

export interface OptionType {
    label: string;
    value: string;
}

type FormInputProps = {
    name: string;
    label: string;
    placeholder?: string;
    type?:
        | "multiselect"
        | "creatable_multiselect"
    options?: OptionType[];
    className?: string;
};

const MultiSelectFormField = ({
    name,
    label,
    placeholder,
    type,
    options,
}:  FormInputProps) => {
    const { control } = useFormContext();
    const [customOptions, setCustomOptions] = useState(options || []);

    return (
        <FormField
            name={name}
            control={control}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        {type === "multiselect" ? (
                            <Select
                                isMulti
                                components={animatedComponents}
                                options={options}
                                placeholder={placeholder}
                                value={
                                    Array.isArray(field.value)
                                        ? field.value.map((value) => ({
                                              label: value,
                                              value,
                                          }))
                                        : []
                                }
                                onChange={(selected) =>
                                    field.onChange(
                                        selected
                                            ? selected.map((option) => option.value)
                                            : []
                                    )
                                }
                                className="basic-multi0select"
                                classNamePrefix="select"
                                classNames={{
                                    control: (state) =>
                                        "form-input border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " +
                                        (state.isFocused
                                            ? "ring-blue-500 border-blue-500 dark:ring-blue-500 dark:border-blue-500"
                                            : ""),
                                    input: () => "text-gray-600 dark:text-white",
                                    placeholder: () => "text-gray-400 dark:text-gray-400",
                                    menu: () =>
                                        "bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 mt-1 rounded-lg",
                                    option: (state) =>
                                        `px-4 py-2 ${
                                            state.isFocused
                                                ? "bg-orange-500 text-white"
                                                : "bg-white dark:bg-gray-700"
                                        }`,
                                }}
                                styles={{
                                    multiValue: (provided) => ({
                                        ...provided,
                                        borderRaduis: "4px",
                                        backgroundColor: "#e9e9e9",
                                        marginLeft: "5px",
                                        padding: "5px",
                                    }),
                                    multiValueLabel: (provided) => ({
                                        ...provided,
                                        color: "#fb6a15",
                                    }),
                                    multiValueRemove: (provided) => ({
                                        ...provided,
                                        color: "#e74c3c",
                                        "&:hover": {
                                            backgroundColor: "#e74c3c",
                                            color: "white",
                                        },
                                    }),
                                }}
                                unstyled
                            />
                        ) : type === "creatable_multiselect" ? (
                            <CreatableSelect
                                isMulti
                                options={customOptions}
                                placeholder={placeholder}
                                value={
                                    Array.isArray(field.value)
                                        ? field.value.map((value) => ({
                                              label: value,
                                              value,
                                          }))
                                        : []
                                }
                                onChange={(selected) =>
                                    field.onChange(
                                        selected
                                            ? selected.map((option) => option.value)
                                            : []
                                    )
                                }
                                onCreateOption={(inputValue) => {
                                    const newOption = {
                                        value: inputValue,
                                        label: inputValue,
                                    };
                                    setCustomOptions((prevOptions) => [
                                        ...prevOptions,
                                        newOption,
                                    ]);
                                    field.onChange([
                                        ...(Array.isArray(field.value)
                                            ? field.value
                                            : []),
                                        newOption.value,
                                    ]);
                                }}
                                className="basic-multi0select"
                                classNamePrefix="select"
                                classNames={{
                                    control: (state) =>
                                        "form-input h-12 border border-gray-300 text-gray-900 text-sm rounded-lg block w-100 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " +
                                        (state.isFocused
                                            ? "ring-blue-500 border-blue-500 dark:ring-blue-500 dark:border-blue-500"
                                            : ""),
                                    input: () => "text-gray-600 dark:text-white",
                                    placeholder: () => "text-gray-400 dark:text-gray-400",
                                    menu: () =>
                                        "bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 mt-1 rounded-lg",
                                    option: (state) =>
                                        `px-4 py-2 ${
                                            state.isFocused
                                                ? "bg-orange-500 text-white"
                                                : "bg-white dark:bg-gray-700"
                                        }`,
                                }}
                                styles={{
                                    multiValue: (provided) => ({
                                        ...provided,
                                        borderRaduis: "4px",
                                        backgroundColor: "#e9e9e9",
                                        marginLeft: "5px",
                                        padding: "5px",
                                    }),
                                    multiValueLabel: (provided) => ({
                                        ...provided,
                                        color: "#fb6a15",
                                    }),
                                    multiValueRemove: (provided) => ({
                                        ...provided,
                                        color: "#e74c3c",
                                        "&:hover": {
                                            backgroundColor: "#e74c3c",
                                            color: "white",
                                        },
                                    }),
                                }}
                                unstyled
                                noOptionsMessage={({ inputValue }) =>
                                    inputValue ? "No Options" : null
                                }
                            />
                        ) : null}    
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default MultiSelectFormField;
