import { Radio, RadioGroup } from "@headlessui/react";
import { Control } from "react-hook-form";
import { FormField, FormMessage } from "../ui/form";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

interface Option {
    label: string;
    value: any;
}

type ETF = Record<string, any>;

interface SmallCardsRadioGroupProps<T extends ETF> {
    label: string;
    name: keyof T;
    options: Option[];
    control: Control<T, any>;
    disabled?: boolean;
    containerClassName?: string;
}

export const SmallCardsRadioGroup = <T extends ETF>(
    props: SmallCardsRadioGroupProps<T>
) => {
    const { label, name, options, control, disabled = false, containerClassName } = props;

    return (
        <fieldset className={containerClassName}>
            <div className="flex items-center justify-between">
                <div className="text-sm font-medium leading-6 text-gray-900 mb-2">
                    {label}
                </div>
            </div>
            <FormField
                control={control}
                name={name as any}
                render={({ field }) => {
                    const currentValue = field.value;
                    return (
                        <>
                            <RadioGroup
                                disabled={disabled}
                                value={currentValue}
                                onChange={(option) => {
                                    field.onChange(option);
                                }}
                                className="flex gap-3"
                            >
                                {options.map((option) => (
                                    <Radio
                                        key={option.value}
                                        value={option.value}
                                        className={({
                                            focus,
                                            checked,
                                            disabled,
                                            hover,
                                        }) =>
                                            classNames(
                                                hover ? "cursor-pointer" : "",
                                                focus
                                                    ? "ring-2 ring-indigo-600 ring-offset-2"
                                                    : "",
                                                checked
                                                    ? "bg-orange-500 text-white hover:bg-orange-600"
                                                    : "ring-1 ring-inset ring-gray-300 bg-white text-gray-900 hover:bg-gray-50",
                                                disabled
                                                    ? "opacity-35 cursor-not-allowed"
                                                    : "",
                                                "flex items-center justify-center rounded-md py-3 px-5 lg:px-8 text-sm font-semibold uppercase"
                                            )
                                        }
                                    >
                                        {option.label}
                                    </Radio>
                                ))}
                            </RadioGroup>
                            <FormMessage />
                        </>
                    );
                }}
            />
        </fieldset>
    );
};
