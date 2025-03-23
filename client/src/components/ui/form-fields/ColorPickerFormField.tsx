import { Radio, RadioGroup } from "@headlessui/react";
import { Control } from "react-hook-form";
import { FormField, FormItem, FormMessage, FormControl } from "../ui/form";
import { colors } from "node_modules/react-select/dist/declarations/src/theme";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export interface RadioColorOption {
    label: string;
    value: any;
    colorCode: string;
}

type ETF = Record<string, any>;

interface ColorPickerRadioGroupProps<T extends ETF> {
    label: string;
    name: keyof T;
    options: RadioColorOption[];
    control: Control<T, any>;
    disabled?: boolean;
    containerClassName?: string;
}

export const ColorPickerRadioGroup = <T extends ETF>(
    props: ColorPickerRadioGroupProps<T>
) => {
    const { label, name, options, control, disabled = false, containerClassName } = props;

    return (
        <fieldset className={containerClassName}>
            <legend className="block text-sm font-semibold leading-6 text-gray-900">
                {label}
            </legend>
            <FormField
                control={control}
                name={name as any}
                render={({ field }) => {
                    const currentValue = field.value;
                    return (
                        <>
                            <FormItem>
                                <FormControl>
                                    <RadioGroup
                                        disabled={disabled}
                                        value={currentValue}
                                        onChange={(option) => {
                                            field.onChange(option);
                                        }}
                                        className="mt-6 flex items-center space-x-3"
                                    >
                                        {options.map((option) => (
                                            <>
                                                <Radio
                                                    key={option.value}
                                                    value={option.value}
                                                    style={{
                                                        color: option.colorCode,
                                                    }}
                                                    className={({
                                                        focus,
                                                        checked,
                                                        disabled,
                                                        hover,
                                                    }) =>
                                                        classNames(
                                                            hover ? "cursor-pointer" : "",
                                                            focus
                                                                ? "ring ring-offset-1"
                                                                : "",
                                                            checked ? "ring-2" : "",
                                                            disabled
                                                                ? "cursor-not-allowed opacity-30"
                                                                : "",
                                                            "relative -m-0.5 flex items-center justify-center rounded-full p-0.5 focus:outline-none ring-current"
                                                        )
                                                    }
                                                >
                                                    <span
                                                        aria-hidden="true"
                                                        className="h-8 w-8 rounded-full border border-black border-opacity-10 bg-current"
                                                    />
                                                </Radio>
                                            </>
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </>
                    );
                }}
            />
        </fieldset>
    );
};
